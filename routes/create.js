var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')

var auth_token = process.env.auth_token

var Cache = require('../middleware/cache')
var cache = new Cache()

/* Main post reception home page. */
router.post('/', function(req, res) {
  var data = {"text": req.body.text};

  var checkCache = cache.getFromCache(data.text)
  if (checkCache != null) {
    console.log('hit object:', checkCache)
    // update created_at property
    var recache = {
      'created_at': new Date(),
      'url': checkCache.url,
      'text': data.text
    }
    cache.addToCache(recache, true)
    res.send({'audio': recache })

  } else {
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
      cache.addToCache(resp.results[0], false)
    })
  }
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
