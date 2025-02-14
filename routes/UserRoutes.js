import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";
const userRoute = express.Router();

userRoute.get("/", async (req, res) => {
  const collection = db.collection("users");
  const result = await collection.find({}).limit(10).toArray();
  res.status(200).json(result);
});

userRoute.post("/create", async (req, res) => {
  try {
    const user = req.body;
    const collection = db.collection("users");

    const result = await collection.insertOne(user);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

userRoute.get("/:id", async (req, res) => {
  try {
    const userid = new ObjectId(req.params.id);
    const collection = db.collection("users");
    const result = await collection.findOne(userid);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRoute.patch("/update/:id", async (req, res) => {
  try {
    const userid = new ObjectId(req.params.id);
    const collection = db.collection("users");
    const userData = req.body;

    const result = await collection.updateOne(
      { _id: userid },
      { $set: userData }
    );

    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "No user found to update" });
    }

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default userRoute;
