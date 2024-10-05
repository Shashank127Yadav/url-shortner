const { getUser } = require("../service/auth");

function chechForAuthentication(req, res, next) {
  // const authorizationHeaderValue = req.headers["authorization"];
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
}

function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (roles.includes(req.user.roles)) return res.end("Unauthorized");

    return next();
  };
}

module.exports = {
  chechForAuthentication,
  restrictTo,
};
