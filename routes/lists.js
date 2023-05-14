const router = require("express").Router();

// model
const List = require("../models/List");

/*
GET LIST: /api/todo
GET ITEM: /api/todo/:id
POST (CREATE TODO): /api/todo
PUT (update todo): /api/todo/62c0ffa49d9b0c1167337548
DELETE (delete todo): /api/todo/62c0ffa49d9b0c1167337548
*/

// GET LIST
router.get("/", async (req, res) => {
  console.log("GET LIST", req.query);

  try {
    const lists = await List.find();
    res.status(200).json({
      data: lists,
      msg: "Get list success",
      isSuccess: true,
    });
  } catch (err) {
    // return failure
    res.status(500).json({
      msg: "Server Error",
      isSuccess: false,
    });
  }
});

// GET A ITEM
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const list = await List.findById(id);

    // return success
    res.status(200).json({
      data: list,
      msg: "Get item success",
      isSuccess: true,
    });
  } catch (err) {
    // return failure
    res.status(500).json({
      msg: "Server Error",
      isSuccess: false,
    });
  }
});

// CREATE NEW ITEM
router.post("/", async (req, res) => {
  // req = request body -> client send
  // res = response body -> server return
  const todoItem = new List({
    title: req.body.title,
    cards: req.body.cards,
  });

  try {
    const list = await todoItem.save();

    // return success
    res.status(200).json({
      data: list,
      msg: "Create todo success",
      isSuccess: true,
    });
  } catch (err) {
    // return failure
    res.status(500).json({
      msg: "Server Error",
      isSuccess: false,
    });
  }
});

// UPDATE ITEM
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  const field = {};
  if (req.body.title) field.title = req.body.title;
  if (req.body.cards) field.cards = req.body.cards;

  try {
    const item = await List.findOneAndUpdate(
      { _id: id },
      { $set: field },
      { new: true }
    );
    if (!item) {
      res.status(404).json({
        msg: "Item not found",
        isSuccess: false,
      });
      return;
    }
    res.status(200).json({
      msg: "Update Sccess",
      isSuccess: true,
    });
  } catch (err) {
    // return failure
    res.status(500).json({
      msg: "Server Error",
      isSuccess: false,
    });
  }
});

// DELETE ITEM
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const item = await List.findOneAndRemove({ _id: id });
    if (!item) {
      res.status(404).json({
        msg: "Item not found",
        isSuccess: false,
      });
      return;
    }
    res.status(200).json({
      msg: "Delete Sccess",
      isSuccess: true,
    });
  } catch (err) {
    // return failure
    res.status(500).json({
      msg: "Server Error",
      isSuccess: false,
    });
  }
});
module.exports = router;
