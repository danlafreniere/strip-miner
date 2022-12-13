const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = 8000;

const url = "https://www.juniorminingnetwork.com/heat-map.html";

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const stockList = [];
    $(".stock-item").each(function () {
      const stockSymbol = $(this).find(".stock-symbol").text();
      const stockTitle = $(this).find(".stock-data .title").text();
      const stockPrice = $(this).find(".stock-data .price.cad").text();
      const stockChange5Day = $(this)
        .find(".stock-data .percent-change-5day")
        .text();
      if (stockPrice) {
        stockList.push({
          stockSymbol,
          stockTitle,
          stockPrice,
          stockChange5Day,
        });
      }
    });
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
