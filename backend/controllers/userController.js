import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  if (!username || !email || !password) {
    throw new Error("Please fill all the fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
   return res.status(400).send("User already exists");
  }

  const newUser = new User({
    username,
    email,
    password,
  });

  try {
    await newUser.save();
    res
      .status(201)
      .json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { createUser };
