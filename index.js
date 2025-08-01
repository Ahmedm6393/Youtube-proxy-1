const express = require("express");
const request = require("request");
const app = express();

app.get("/", (req, res) => {
  res.send(`
    <form method="GET" action="/proxy">
      <input name="url" placeholder="https://example.com" style="width:300px;" />
      <button type="submit">Go</button>
    </form>
  `);
});

app.get("/proxy", (req, res) => {
  const url = req.query.url;
  if (!url) return res.send("No URL provided.");

  request(
    {
      url: url,
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    },
    (error, response, body) => {
      if (error) {
        return res.send("Error: " + error.message);
      }
      res.send(body);
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
