const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect("mongodb+srv://Manikanta:HPzxabIvsq5N6oLT@manikanta.6qkifax.mongodb.net/GraphQl?retryWrites=true&w=majority&appName=Manikanta")
  .then(() => console.log("Mongoose successfully connected[ INITIAL ]"))
  .catch((err) => console.log(err+"[ INITIAL ]"));


mongoose.connection.on("error", (err) =>
  console.log("Failed to connect to Mongoose[ RUNTIME ]"+err)
);
