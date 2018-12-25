var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')

var auth_token = 'oauth_1EobpX99c1u912Deoudkl2j9gS8';

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
  console.log("at play");
  return await fetch('https://avatar.lyrebird.ai/api/v0/generated', {
    method: "GET",
    headers: {
      Authorization: "Bearer " + auth_token,
      "Content-Type": "application/json"
    },
  })
  // .then(response => {
  //   console.log("response")
  //   return response.json()
  // })
}

/*
await fetch("https://avatar.lyrebird.ai/api/v0/generate", {
    method: "POST",
    headers: {
      Authorization: "Bearer oauth_1EobpX99c1u912Deoudkl2j9gS8",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)

  })
  .then(() => { play() })

*/

module.exports = router;
