const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: 'You are not allowed to access this resource',
    });
  }
  return next();
};

export default verifyAdmin;
