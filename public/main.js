
// andrewspeak.surge.sh

const state = 0
const form = document.getElementById('mainform')
const button = document.getElementById('voiceBtn')

const triggerVoice = async (e) => {
  e.preventDefault()

  const t = document.getElementById('voiceText').value
  const data = {
    text: t
  }
  
  button.disabled = true

  await fetch("/create", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(resp => {
    let a = new Audio(resp.audio.url)
    a.play()
    button.disabled = false
  })
  .catch(err => console.log("error: ", err))
  // console.log('create: ', create)
}

const play = async () => {
  const response = await fetch('https://avatar.lyrebird.ai/api/v0/generated', {
    method: "GET",
    headers: {
      Authorization: "Bearer oauth_1EobpX99c1u912Deoudkl2j9gS8",
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

