const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req, res) => {
  res.json({ message: "hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
