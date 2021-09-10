const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 40,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    }
  },
  { timestamps: true }
);
UserSchema.statics.isThisEmailUse = async function (email) {
  if (!email) throw new Error('Invalid Email')
  try {
    const user = await this.findOne({ email })
    if (user) return false

    return true
  } catch (error) {
    console.log('Error inside isThisEmailUse', error.message)
    return false
  }
}
module.exports = mongoose.model("User", UserSchema);
