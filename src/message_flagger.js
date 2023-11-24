const Twilio = require("twilio");
const config = require("./config");
const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

// const config = require("./config");

function messageFlagger(req, res) {
  const body = req.body;
  const messageText = body["Body"];
  const author = body["Author"];
  //   const attributes = body["Attributes"] || {};
  const attributes = JSON.parse(body["Attributes"]) || {};
  const chatServiceSid = body["ChatServiceSid"];
  const conversationSid = body["ConversationSid"];
  const messageSid = body["MessageSid"];
  console.log("messageText: ", messageText);

  if (author === "2") {
    // res.status(200).send({});
    return;
  }

  if (!messageText || !messageText.trim().includes("nervous")) {
    return;
  }

  console.log("flagging");
  console.log("attributes", attributes);

  attributes["flagged"] = true;
  client.conversations.v1
    .services(chatServiceSid)
    .conversations(conversationSid)
    .messages(messageSid)
    .update({ attributes: attributes })
    .then((message) => console.log(message));

  //   res.status(200).send({ attributes: attributes });
  //   res.status(200).send(JSON.stringify({ attributes: attributes }));
  return;
}

module.exports = messageFlagger;
