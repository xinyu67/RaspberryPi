const express = require("express");
const router = express.Router();
const fs = require("fs");
const StoredData = require("./storedDataSchema");

router.get("/realtimeData", async (req, res) => {
  try {
    const localData = await fs.promises.readFile("realtimeData.json");
    const realtimeData = JSON.parse(localData.toString());
    console.log("已傳送實時數據", realtimeData);
    res.send(realtimeData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/storedData/pre7day", async (req, res) => {
  try {
    const storedData = await StoredData.find().limit(7);
    console.log(storedData);
    res.json(storedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

// router.get("/storedData/:day", async (req, res) => {
//   try {
//     const storedData = await StoredData.find().limit(7);
//     console.log(storedData);
//     res.json(storedData);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// })

module.exports = router;
