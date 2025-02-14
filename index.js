import express from "express";
import userRoute from "./routes/UserRoutes.js";

const app = express();
const port = 419;
app.use(express.json());
app.use("/api/v1/users", userRoute);

app.get("/", (req, res) => {
  res.send("hello welcome to my personal api server");
});

app.listen(port, () => {
  console.log(`server is listening on port http://localhost:${port}`);
});
