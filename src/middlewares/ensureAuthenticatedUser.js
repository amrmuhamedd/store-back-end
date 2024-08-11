import { verifyAndDecodeToken } from "../utils/auth.js";

const ensureAuthenticatedUser = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader || authHeader === "") {
    res.status(401).json({
      error: {
        type: "INVALID_TOKEN",
        message: "token was not submitted",
        statusCode: 401,
      },
    });
    return;
  }

  const authHeaderParts = authHeader.split(" ");
  const token = authHeaderParts[1];
  try {
    const tokenPayload = verifyAndDecodeToken(token);
    req.user = tokenPayload;
    next();
    return;
  } catch (e) {
    res.status(401).json({
      error: {
        message: "Invalid Token",
        statusCode: 401,
      },
    });
  }
};

export default ensureAuthenticatedUser;
