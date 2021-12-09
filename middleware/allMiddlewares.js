const getNameAndId = (req, res, next) => {
  res.locals.user = req.session?.name;
  res.locals.userId = req.session?.userid;
  next();
};
module.exports = { getNameAndId };
