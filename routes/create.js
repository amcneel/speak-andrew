var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index.html', { title: 'Express' });
  console.log("at create")
  res.send({'status': 'ok'})
});

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
