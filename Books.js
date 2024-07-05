const express = require("express");
const app = express();

require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const { root, schema } = require("./config.js/root.js");
const morgan = require("morgan");
const port = process.env.PORT || 3200;

require("./mongo/mongoConnection.js");

app.use(morgan("dev"));

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    rootValue: root,
    schema: schema,
  })
);

app.listen(3813, () => {
  console.log("Server running at http://localhost:/graphql " + port);
});
