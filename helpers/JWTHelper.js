import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
  path: "./config/config.env",
});

class JWTHelper {
  static generateToken = (userId) => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
  };
  static verifyToken = (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  };
}

export default JWTHelper;
