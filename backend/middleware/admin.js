// middleware/admin.js

module.exports = function (req, res, next) {
  if (!req.user.isAdmin)
    return res.status(403).json({ msg: "Access denied, admin only" });
  next();
};
