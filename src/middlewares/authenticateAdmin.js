const authenticateAdmin = (req, res, next) => {
  if (req.session && req.session.admin) {
    next();
  } else {
    res.status(401).render("401");
  }
};

export default authenticateAdmin;