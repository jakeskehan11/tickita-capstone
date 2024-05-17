const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id, role, firstName, lastName) => {
  return jwt.sign({ _id, role, firstName, lastName }, process.env.SECRET, {
    expiresIn: "30d",
  });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(
      user._id,
      user.role,
      user.firstName,
      user.lastName
    );

    res
      .status(200)
      .json({
        email,
        token,
        role: user.role,
        firstname: user.firstName,
        lastname: user.lastName,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const user = await User.signup(firstName, lastName, email, password, role );

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
