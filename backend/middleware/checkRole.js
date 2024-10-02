export const checkRole = (roles) => {
    return (req, res, next) => {
      const { role } = req.user; // Extract role from authenticated user
      if (!roles.includes(role)) {
        return res.status(403).json({ message: "Access forbidden: insufficient permissions" });
      }
      next();
    };
  };