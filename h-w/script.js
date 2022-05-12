const express = require("express");
const app = express();
app.use(express.json());

const foods = [
  { type: "Vegetables", expirationDate: 30, id: 1 },
  { type: "Fruits", expirationDate: 40, id: 2 },
  { type: "Meals", expirationDate: 15, id: 3 },
  { type: "Dairies", expirationDate: 7, id: 4 },
  { type: "Meats products", expirationDate: 25, id: 5 },
];

app.get("/api/foods", (req, res) => {
  const food = foods.find((food) => req.query.type === food.type);
  if (food) {
    res.status(200).send(food);
  } else {
    res.status(400).send("Bu turdagi oziq-ovqat maxsuloti mavjud emas!");
  }
});

app.get("/api/foods/:expirationDate", (req, res) => {
  const expirationDate = +req.params.expirationDate;
  const food = foods.find((food) => food.expirationDate === expirationDate);
  if (food) {
    res.status(200).send(food);
  } else {
    res.status(400).send("Bunday muddatli oziq-ovqat maxsuloti mavjud emas...");
  }
});

app.post("/api/foods/add", (req, res) => {
  let food = foods;

  if (!req.body.type) {
    res.status(400).send("Type is required to compleate");
    return;
  }

  if (!req.body.expirationDate) {
    res.status(400).send("Expiration date is required to compleate");
    return;
  }

  let meals = {
    id: food.length + 1,
    type: req.body.type,
    expirationDate: req.body.expirationDate,
  };

  foods.push(food);

  res.status(201).send(food);
});

try {
  const port = process.env.port || 5000;

  app.listen(port, () => {
    console.log("Server working on port", port);
  });
} catch (error) {
  console.error(error);
}
