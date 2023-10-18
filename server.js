// // const app = require('./app')

// // app.listen(3000, () => {
// //   console.log("Server running. Use our API on port: 3000")
// // })
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// require("dotenv").config();

// const app = express();

// // parse application/json
// app.use(express.json());
// // cors
// app.use(cors());

// const routerApi = require("./routes/api/contacts");
// app.use("/api", routerApi);

// app.use((_, res, __) => {
//   res.status(404).json({
//     status: "error",
//     code: 404,
//     message: "Use api on routes: /api/tasks",
//     data: "Not found",
//   });
// });

// app.use((err, _, res, __) => {
//   console.log(err.stack);
//   res.status(500).json({
//     status: "fail",
//     code: 500,
//     message: err.message,
//     data: "Internal Server Error",
//   });
// });

// const PORT = process.env.PORT || 3000;
// const uriDb = process.env.DB_HOST;

// const connection = mongoose.connect(
//   "mongodb+srv://telezhka:1PzEfDmrz6@cluster0.yobrik7.mongodb.net/db-contacts?retryWrites=true&w=majority",
//   {
//     // promiseLibrary: global.Promise,
//     useNewUrlParser: true,
//     // useCreateIndex: true,
//     useUnifiedTopology: true,
//     // useFindAndModify: false,
//   }
// );

// connection
//   .then(() => {
//     app.listen(PORT, function () {
//       console.log(`Server running. Use our API on port: ${PORT}`);
//     });
//   })
//   .catch((err) =>
//     console.log(`Server not running. Error message: ${err.message}`)
//   );
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const contactsRouter = require("./routes/api/contacts");

const app = express();
const port = process.env.PORT || 3000; // Порт за замовчуванням 3000, але ви можете використовувати інший.

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Підключення до MongoDB
mongoose
  .connect(
    "mongodb+srv://telezhka:1PzEfDmrz6@cluster0.yobrik7.mongodb.net/db-contacts?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

// Схема моделі для колекції контактів
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

app.use("/api/contacts", contactsRouter(Contact));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
