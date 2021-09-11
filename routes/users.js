const router = require("express").Router();
const User = require("../models/User");
// const bcrypt = require("bcrypt");

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndRemove( req.params.id);
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// update user
router.patch("/:id", async (req, res) => {
  if (req.body.id === req.params.id) {
    //update password
    // if (req.body.password) {
    //   try {
    //     const salt = await bcrypt.genSalt(10);
    //     req.body.password = await bcrypt.hash(req.body.password, salt);
    //   } catch (err) {
    //     return res.status(500).json(err);
    //   }
    // }
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        { new: true }
      );
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("Permission Denied");
  }
});

module.exports = router;
