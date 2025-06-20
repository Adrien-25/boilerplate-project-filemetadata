var express = require("express");
var cors = require("cors");
const multer = require("multer");

require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// =========================================================
// NEW: Multer setup for file uploads
// =========================================================
const upload = multer({ dest: "uploads/" });

// =========================================================
// NEW: API endpoint for file analysis
// POST /api/fileanalyse
// =========================================================
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  // 'req.file' contains information about the uploaded file
  if (!req.file) {
    return res.json({ error: "No file uploaded" });
  }

  // Respond with the file's name, type, and size
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
