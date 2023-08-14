import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const registerUser = async (req, res) => {
  const { username, email, sex, phoneNumber, location } = req.body;
  console.log("Hello from the frontend");
  //validating the inputs
  if (!username || !email || !sex || !phoneNumber) {
    return res.status(400).json("All fields are required");
  } else if (!validator.isStrongPassword(req.body.password)) {
    return res
      .status(400)
      .json("Password must be at least 8 char, Capital leter and symbol");
  } else if (!validator.isEmail(email)) {
    return res.status(400).json("Invalid Email Include @ and . sign");
    // Validate if Email Used
  } else {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json("Email Already Exists");
    }
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRound);

    const newUser = new User({
      username: username,
      email: email,
      sex: sex,
      phoneNumber: phoneNumber,
      location: location,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const access_token = jwt.sign(
      { id: savedUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );
    const dataSaved = { ...savedUser._doc, access_token };
    const { password, ...otherData } = dataSaved;
    res.status(200).json(otherData);
    console.log("User Registered Successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("All fields are required");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("Email doesn't exist");
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json("Invalid Password");
      } else {
        const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password, ...data } = user._doc;
        res.status(200).json({ ...data, access_token });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("error in login");
  }
};

const updateUser = async (req, res) => {
  if (req.user.id === req.params.id) {
    if (req.body.password) {
      req.body.password = bcrypt.hash(req.body.password, saltRound);
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.status(403).json("You can update only your account");
  }
};

export { registerUser, loginUser, updateUser };
