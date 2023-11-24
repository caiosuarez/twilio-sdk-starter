const Twilio = require("twilio");

// const config = require("./config");

function messageFlagger(req, res) {
  console.log("req", req);
  console.log("res", res);
  const body = req.body;
  const messageText = body["Body"];
  const author = body["Author"];
  const attributes = body["Attributes"] || {};

  if (author === 2) {
    res.status(200).send({});
    return;
  }

  if (messageText.includes("nervous")) {
    attributes["flagged"] = true;
  }
  res.status(200).send({ attributes: attributes });
  return;
}

module.exports = messageFlagger;
