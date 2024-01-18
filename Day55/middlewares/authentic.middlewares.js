module.exports = (req, res, next) => {
  if (req.session.user) {
    next();
  } else next("/users/login");
};
