const handleCustomErrors = (err, req, res, next) => {
  console.log("handleCustomErrors >>>>", err);
  if (err.status !== undefined) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};
const handle500Errors = (err, req, res, next) => {
  console.log("handle500Errors >>>>", err);
  res.status(500).send({ msg: "Internal Error. Sorry!" });
};

module.exports = {
  handleCustomErrors,
  handle500Errors,
};
