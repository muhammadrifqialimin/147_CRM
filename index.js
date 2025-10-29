const express = require("express");
const app = express();
const port = 3001;
const db = require("./models");
const komik = require("./models/komik");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server starsted on port 3001`);
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
    const komik = await db.komik.create(data);
    res.send(komik);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/komik", async (req, res) => {
  try {
    const komik = await db.komik.findAll();
    res.send(komik);
  } catch (error) {
    res.send({ message: error.message });
  }
});

app.put("/komik/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const komik = await db.komik.findByPk(id);
    if (!komik) {
      res.status(404).send({ message: "Komik not found" });
    }
    await komik.update(data);
    res.send({ message: "Komik berhasil di update" });
  } catch (error) {
    res.send({ message: error.message });
  }
});

app.delete("/komik/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const komik = await db.komik.findByPk(id);
    if (!komik) {
      res.status(404).send({ message: "Komik not found" });
    }
    await komik.destroy();
    res.send({ message: "Komik berhasil dihapus" });
  } catch (error) {
    res.status(500).send(err);
  }
});
