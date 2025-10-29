const express = require("express");
const app = express();
const port = 3001;
const db = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("Server starsted on port 3000");
});
db.sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server Started");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/komik", async (req, res) => {
  const data = req.body;
  try {
    const komik = await db.Komik.create(data);
    res.send(komik);
  } catch (error) {}
  res.send({ message: error.message });
});
