const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

app.get("/countries", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.restcountries.com/countries/v5",
      {
        headers: {
          Authorization: `Bearer ${process.env.RESTCOUNTRIES_API_KEY}`,
        },
        params: {
          response_fields:
            "names,flag,capitals,region,population",
        },
      }
    );

    const countries = response.data.data.objects.map((country) => ({
      name: country.names?.common || "Unknown",
      flag: country.flag?.emoji || "",
      flagPng: country.flag?.url_png || "",
      capital: country.capitals?.[0]?.name || "N/A",
      region: country.region || "Unknown",
      population: country.population || 0,
    }));

    res.json(countries);
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      error: err.message,
      details: err.response?.data || null,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
