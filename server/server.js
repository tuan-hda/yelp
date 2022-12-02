require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db");
const cors = require("cors")

const app = express();

app.use(cors())
app.use(express.json());

// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants left join (select restaurant_id, avg(rating) avg, count(*) from reviews group by restaurant_id) reviews on id = restaurant_id");

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
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
    const results = await db.query("SELECT * FROM restaurants left join (select restaurant_id, avg(rating) avg, count(*) from reviews group by restaurant_id) reviews on id = restaurant_id where id = $1", [id]);

    const reviews = await db.query("select * from reviews where restaurant_id = $1", [id])

    res.status(200).json({
      status: "success",
      results: results.rowCount,
      data: {
        restaurants: results.rows[0],
        reviews: reviews.rows
      },
    });
  } catch (err) {
    res.status(400).json({ error: err });
    console.log(err)
  }
});

// Create new post
app.post("/api/v1/restaurants", async (req, res) => {
  console.log(req.body);
  const { name, location, price_range } = req.body;

  console.log(name, location, price_range)

  try {
    const results = await db.query(
      "insert into restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [name, location, price_range]
    );

    res.status(201).json({
      status: "success",
      data: results.rows[0],
    });
  } catch (err) {
    res.status(400).json({
      error: 'Lmao'
    })
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
    res.status(400).json({
      error: err
    })
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
    res.status(400).json({
      error: err
    })
    console.log(err);
  }
});

// Add review
app.post('/api/v1/restaurants/:id/add-review', async (req, res) => {
  try {
    const { name, review, rating } = req.body
    const results = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) returning *", [req.params.id, name, review, rating])

    res.status(201).json({
      status: "success",
      data: {
        review: results.rows[0]
      }
    })

  } catch (e) {
    res.status(400).json({
      error: error,
    })
    console.log(e)
  }
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
