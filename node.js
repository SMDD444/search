const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/search", async (req, res) => {
  const query = req.query.q;
  const apiKey = process.env.SERPAPI_KEY;

  try {
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        q: query,
        api_key: apiKey,
        engine: "google",
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Search failed", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
