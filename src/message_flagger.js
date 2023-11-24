const Twilio = require("twilio");
const config = require("./config");
const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

// const config = require("./config");

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

  console.log("chatServiceSid", chatServiceSid);
  console.log("conversationSid", conversationSid);
  console.log("messageSid", messageSid);

  attributes["flagged"] = true;
  console.log("attributes", attributes);
  try {
    client.conversations.v1
      .services(chatServiceSid)
      .conversations(conversationSid)
      .messages(messageSid)
      .update({ attributes: attributes })
      .then((message) => console.log("message", message));
  } catch (err) {
    console.log("err", err);
  }

  try {
    client.conversations.v1
      .services(messagingServiceSid)
      .conversations(conversationSid)
      .messages(messageSid)
      .update({ attributes: attributes })
      .then((message) => console.log("message", message));
  } catch (err) {
    console.log("err 2", err);
  }

  //   res.status(200).send({ attributes: attributes });
  //   res.status(200).send(JSON.stringify({ attributes: attributes }));
  //   return;
}

module.exports = messageFlagger;
