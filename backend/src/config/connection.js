const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log(process.env.DB_URI);
  })
  .catch((err) => console.log(err));
