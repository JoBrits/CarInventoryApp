// IMPORTS
const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// CORS
const cors = require("cors");
// Enable CORS and allow specific headers
app.use(
  cors({
    origin: "http://localhost:3000", // React app's origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "*",
  })
);

app.use(bodyParser.json()); // Get data from request body
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
const Cars = require("./routes/Cars");

app.use("/api", Cars);
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Connection from Mongoose to MongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://jjohanbrits:cbLNpFWXWabsYEcB@hyperiondevcluster.v5ftg6x.mongodb.net/taskCRUD",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectToDB();

const port = 3003;
app.listen(port, () => {
  console.log("Server started successfully");
});
