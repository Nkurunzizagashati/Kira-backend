import jwt from "jsonwebtoken";

const generateToken = (res, hospitalID) => {
  const token = jwt.sign({ hospitalID }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return token;
};

export default generateToken;
