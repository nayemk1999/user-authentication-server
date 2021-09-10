const router = require("express").Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    // Create new user
    const newUser = await new User(req.body);

    //   save and return response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// all User
router.get("/all-users", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
    // res.send(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
