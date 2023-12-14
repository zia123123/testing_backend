exports.successResponseNewdata = function (res, msg, desc, data) {
  var data = {
    statusCode: 201,
    statusMessage: msg,
    statusDescription: desc,
    result: data,
  };
  return res.status(200).json(data);
};

exports.successResponse = function (res, msg, desc, data) {
  var data = {
    statusCode: 200,
    statusMessage: msg,
    statusDescription: desc,
    result: {
      errorCode: "00",
      errorMessage: "Success",
      data: data,
    },
  };
  return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
  var resData = {
    status: 200,
    message: msg,
    data: data,
  };
  return res.status(200).json(resData);
};

exports.ErrorResponse = function (res, msg) {
  var data = {
    status: 500,
    message: msg,
  };
  return res.status(500).json(data);
};

exports.notFoundResponse = function (res, msg) {
  var data = {
    status: 404,
    message: msg,
  };
  return res.status(404).json(data);
};


exports.notFoundResponseNew = function (
	res,
	msg,
	desc,
	code_error,
	message_error
  ) {
	var resData = {
	  statusCode: 404,
	  statusMessage: msg,
	  statusDescription: desc,
	  result: {
		errorCode: code_error,
		errorMessage: message_error,
	  },
	};
	return res.status(404).json(resData);
  };


exports.alreadyExist = function (res, msg) {
  var data = {
    statusCode: 409,
    statusMessage: msg,
  };
  return res.status(409).json(data);
};

exports.validationErrorWithData = function (
  res,
  msg,
  desc,
  code_error,
  message_error
) {
  var resData = {
    statusCode: 400,
    statusMessage: msg,
    statusDescription: desc,
    result: {
      errorCode: code_error,
      errorMessage: message_error,
    },
  };
  return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
  var data = {
    status: 401,
    message: msg,
  };
  return res.status(401).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
  var resData = {
    status: 200,
    message: msg,
    data: data,
  };
  return res.status(200).json(resData);
};

exports.ErrorResponse = function (res, msg) {
  var data = {
    status: 500,
    message: msg,
  };
  return res.status(500).json(data);
};

exports.notFoundResponse = function (res, msg) {
  var data = {
    status: 404,
    message: msg,
  };
  return res.status(404).json(data);
};



exports.unauthorizedResponse = function (res, msg) {
  var data = {
    status: 401,
    message: msg,
  };
  return res.status(401).json(data);
};
