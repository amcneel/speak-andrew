
// andrewspeak.surge.sh

const state = 0
const form = document.getElementById('mainform')
const button = document.getElementById('voiceBtn')

let accessToken = 'oauth_1Eo7EvmASGu7kIH6CpWFQRRRmd4'

const triggerVoice = async (e) => {
  e.preventDefault()

  const text = document.getElementById('voiceText').value
  const data = {
    text: text
  }
  
  button.disabled = true

  await fetch("https://avatar.lyrebird.ai/api/v0/generate", {
    method: "POST",
    headers: {
      Authorization: "Bearer oauth_1EoWEk0Wr2VFp1c03DzX3mnTC9h",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    },
    body: '{"text":"hello world"}'

  })
  .then(() => { play() })
}

const play = async () => {
  const response = await fetch('https://avatar.lyrebird.ai/api/v0/generated', {
    method: "GET",
    headers: {
      Authorization: "Bearer oauth_1EoWEk0Wr2VFp1c03DzX3mnTC9h",
      "Content-Type": "application/json"
    },
  })

  const data = await response.json()
  const audio = data.results[0]
  let a = new Audio(audio.url)
  a.play()
  button.disabled = false
}

form.addEventListener('submit', triggerVoice, false)

