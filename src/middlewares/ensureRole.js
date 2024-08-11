export const validateUserRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: {
          type: "UNAUTHORIZED",
          message: "User not authenticated",
          statusCode: 401,
        },
      });
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        error: {
          type: "FORBIDDEN",
          message: "Access denied. you didn't have permissions.",
          statusCode: 403,
        },
      });
    }

    next();
  };
};
