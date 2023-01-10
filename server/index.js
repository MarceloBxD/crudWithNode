const express = require("express");
const router = require("./routes/users.js");
const app = express();
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost",
  "http://localhost:3001",
  "http://localhost:3000",
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true, //access-control-allow-credentials:true
  // optionSuccessStatus: 200,
  methods: "GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE",
  preflightContinue: false,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization",
    "Access-Control-Allow-Origin",
  ],
};

const port = 3001;

app.use(cors(corsOptions));
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
