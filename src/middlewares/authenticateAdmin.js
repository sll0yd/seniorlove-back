const authenticateAdmin = (req, res, next) => {
  if (req.session && req.session.admin) {
    next();
  } else {
    res.status(401).json({ error: "Access denied. Please log in." });
  }
};

export default authenticateAdmin;