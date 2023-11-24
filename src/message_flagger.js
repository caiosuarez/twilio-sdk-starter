const Twilio = require("twilio");

// const config = require("./config");

function messageFlagger(req, res) {
  console.log("req", req);
  console.log("res", res);

  // if (config.TWILIO_SYNC_SERVICE_SID) {
  //   // Point to a particular Sync service, or use the account default to
  //   // interact directly with Functions.
  //   const syncGrant = new SyncGrant({
  //     serviceSid: config.TWILIO_SYNC_SERVICE_SID || "default",
  //   });
  //   token.addGrant(syncGrant);
  // }

  // Serialize the token to a JWT string and include it in a JSON response
  //   return {
  //     identity: token.identity,
  //     token: token.toJwt(),
  //   };
  return null;
}

module.exports = messageFlagger;
