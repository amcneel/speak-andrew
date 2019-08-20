
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
  .catch(err => console.error("error: ", err))
}

form.addEventListener('submit', triggerVoice, false)

