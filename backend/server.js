const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

app.get("/countries", async (req, res) => {
  try {
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region"
    );

    console.log("Type:", typeof response.data);
    console.log("Is Array:", Array.isArray(response.data));
    console.log(response.data);

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

    const countries = response.data.map((c) => ({
      name: c.name.common,
      flag: c.flags?.png,
      capital: c.capital?.[0] || "N/A",
      region: c.region,
      population: c.population,
    }));

    res.json(countries);
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      error: err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
