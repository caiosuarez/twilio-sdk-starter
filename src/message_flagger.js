const Twilio = require("twilio");

// const config = require("./config");

function messageFlagger(req, res) {
  const body = req.body;
  const messageText = body["Body"];
  const author = body["Author"];
  const attributes = body["Attributes"] || {};
  console.log("body", body);

  if (author === "2") {
    res.status(200).send({});
    return;
  }

  if (messageText.includes("nervous")) {
    attributes["flagged"] = true;
  }
  //   res.status(200).send({ attributes: attributes });
  res.status(200).send(JSON.stringify({ attributes: attributes }));
  return;
}

module.exports = messageFlagger;
