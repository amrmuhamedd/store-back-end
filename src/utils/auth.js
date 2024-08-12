import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function comparePasswords(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

export const verifyAndDecodeToken = (token) => {
  let decodedPayload;
  if (!process.env.SECRET_KEY) throw new Error("Unauthorized");
  try {
    decodedPayload = jwt.verify(token, process.env.SECRET_KEY);
  } catch (e) {
    const err = e;
    if (err.name === "JsonWebTokenError") {
      throw new Error("Invalid Token");
    }

    if (err.name === "TokenExpiredError") {
      throw new Error("expired token");
    }

    throw new Error("Unauthorized");
  }
  return decodedPayload;
};

export function generateAuthToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
}
