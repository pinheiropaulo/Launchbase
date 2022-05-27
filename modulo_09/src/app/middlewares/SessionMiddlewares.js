export function onlyUsers(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/users/login');
  }

  next();
}

export function isLoggedRedirectToUsers(req, res, next) {
  if (req.session.userId) {
    return res.redirect('/users');
  }

  next();
}
