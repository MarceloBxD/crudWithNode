const express = require("express");
const getUsers = require("../controllers/users.js");
const addUser = require("../controllers/users.js");
const updateUser = require("../controllers/users.js");
const deleteUser = require("../controllers/users.js");

const router = express.Router();

router.get("/", getUsers);

router.post("/", addUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
