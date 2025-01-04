import express from "express";
const app = express();

app.get("/api", (req, res) => {
  return res.json({ message: "This is from backend" });
});

app.listen(8081, () => {
  console.log("Listening");
});
