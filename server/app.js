const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// allow cross-origin requests
app.use(cors());

mongoose
  .connect(process.env.CONNECT, {
    newUserUrlParser: true,
    useUnifiedTopology: true,
    dbName: "myFirstDatabase",
  })
  .then(() => console.log("connected to mongodb atlas"))
  .catch((err) => console.error(err.message));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
