const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

const quotesRouter = express.Router();

app.use("/api/quotes", quotesRouter);

quotesRouter.get("/random", (req, res, next) => {
  const quote = getRandomElement(quotes);
  res.send({ quote: quote });
});

quotesRouter.get("/", (req, res, next) => {
  if (!req.query.hasOwnProperty("person")) {
    res.send({ quotes: quotes });
  } else {
    const filterQuote = quotes.filter(
      (element) => element.person === req.query.person
    );
    res.send({ quotes: filterQuote });
  }
});

quotesRouter.post("/", (req, res, next) => {
  if (req.query.quote && req.query.person) {
    const newQuote = { quote: req.query.quote, person: req.query.person };
    quotes.push(newQuote);
    res.send({ quote: newQuote });
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
