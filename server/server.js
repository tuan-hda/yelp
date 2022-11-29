require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db");

const app = express();

app.use(express.json());

// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("select * from restaurants");

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const results = await db.query("select $2 from restaurants where id = $1", [id, "name"]);
    res.status(200).json({
      status: "success",
      results: results.rowCount,
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {}
});

app.post("/api/v1/restaurants", async (req, res) => {
  console.log(req.body);
  const { name, location, price_range } = req.body;

  try {
    const results = await db.query(
      "insert into restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [name, location, price_range]
    );

    console.log(results);

    res.status(201).json({
      status: "success",
      data: results.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});

// Update restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const { name, location, price_range } = req.body;

  try {
    const results = await db.query(
      "update restaurants set name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [name, location, price_range, id]
    );

    res.status(201).json({
      status: "success",
      data: results.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete Restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    await db.query("delete from restaurants where id = $1", [req.params.id]);

    res.status(204).json({
      status: "success",
      data: {
        message: "deleted successfully",
      },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
