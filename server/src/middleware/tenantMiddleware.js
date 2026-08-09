export const requireSocietyAccess = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  // SUPER_ADMIN can access all societies.
  if (req.user.role === "SUPER_ADMIN") {
    return next();
  }

  // Every other authenticated user must belong to a society.
  if (!req.user.societyId) {
    return res.status(403).json({
      success: false,
      message: "User is not associated with a society",
    });
  }

  next();
};