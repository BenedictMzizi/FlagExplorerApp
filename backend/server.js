const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

app.get("/countries", async (req, res) => {
  try {
    const response = await axios.get(
  "https://restcountries.francocarballar.com/api/v3.1/all?fields=name,flags,capital,region,population"
);

    console.log("Type:", typeof response.data);
    console.log("Is Array:", Array.isArray(response.data));
    console.log("Response:", response.data);

    // Return the raw API response for debugging
    return res.json(response.data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
