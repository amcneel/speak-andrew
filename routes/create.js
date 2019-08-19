var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')

var auth_token = process.env.auth_token

/* GET home page. */
router.post('/', function(req, res) {
  var data = {"text": req.body.text};
  fetch("https://avatar.lyrebird.ai/api/v0/generate", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + auth_token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)

  })
  .then(() => play())
  .then(resp => resp.json())
  .then(resp => {
    res.send({'audio': resp.results[0]})
  })
});

var play = async () => {
  return await fetch('https://avatar.lyrebird.ai/api/v0/generated', {
    method: "GET",
    headers: {
      Authorization: "Bearer " + auth_token,
      "Content-Type": "application/json"
    }
  })
}

module.exports = router;
