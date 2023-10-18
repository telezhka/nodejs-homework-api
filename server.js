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
const Contact = require("./service/schemas/contactSchema");
// const Contact = mongoose.model("Contact", contactSchema);
app.use("/api/contacts", contactsRouter(Contact));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
