module.exports = (cb, page) => {
  const perPage = page || 10;
  return (req, res, next) => {
    let currentPage = parseInt(req.query.page || "1") - 1;
    cb((err, total) => {
      if (err) return next(err);
      req.pagination = {
        currentPage,
        perPage,
        total,
        pageFrom: currentPage * perPage,
        pageTo: currentPage * perPage + perPage - 1,
        allPage: Math.ceil(total / perPage)
      };
      next();
    });
  };
};
