const config = require("./config");
const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

async function messageFlagger(req, res) {
  const body = req.body;
  const messageText = body["Body"];
  const author = body["Author"];
  const attributes = JSON.parse(body["Attributes"]) || {};
  const chatServiceSid = body["ChatServiceSid"];
  const messagingServiceSid = body["MessagingServiceSid"];
  const conversationSid = body["ConversationSid"];
  const messageSid = body["MessageSid"];
  console.log("body:", body);

  if (author === "2") {
    // res.status(200).send({});
    return;
  }

  if (!messageText || !messageText.trim().includes("nervous")) {
    return;
  }

  attributes["flagged"] = true;
  try {
    client.conversations.v1
      .services(chatServiceSid)
      .conversations(conversationSid)
      .messages(messageSid)
      .update({ attributes: JSON.stringify(attributes) })
      .then((message) => console.log("message updated", message));
  } catch (err) {
    console.log("err", err);
  }
}

module.exports = messageFlagger;
