
const KeyToSound = {
  'a': document.querySelector('#s1'),
  's': document.querySelector('#s2'),
  'd': document.querySelector('#s3'),
  'f': document.querySelector('#s4'),
  'j': document.querySelector('#s5'),
  'k': document.querySelector('#s6'),
  'l': document.querySelector('#s7'),
  ';': document.querySelector('#s8'),
  'g': document.querySelector('#s9'),
  'h': document.querySelector('#s9')
}

const recordButton = document.querySelector('.record-button')
const playButton = document.querySelector('.play-button')
let recordingStartTime
let songNotes

document.addEventListener('keypress', onKeyPress)
recordButton.addEventListener('click', toggleRecording)
playButton.addEventListener('click', togglePlaying)

function togglePlaying() {
  playButton.classList.toggle('active')

  playSong()
}

function toggleRecording() {
  recordButton.classList.toggle('active')

  if (isRecording()) {
    startRecording()
  } else {
    stopRecording()
  }
}

function startRecording() {
  recordingStartTime = Date.now()
  songNotes = [];
}

function stopRecording() {
  playSong()
}

function playSong() {
  if (!songNotes || songNotes.length === 0) return
  songNotes.forEach(note => {
    setTimeout(() => {
      playSound(note.key)
    }, note.startTime)
  });
}

function isRecording() {
  return recordButton != null && recordButton.classList.contains('active')
}

function onKeyPress(event) {
  playSound(event.key)
}

function playSound(keyCode) {
  const sound = KeyToSound[keyCode]

  if (sound) {
    if (isRecording()) {
      recordNote(keyCode)
    }
    sound.currentTime = 0
    sound.play()
  }
}

function recordNote(pressedKey) {
  songNotes.push({
    key: pressedKey,
    startTime: Date.now() - recordingStartTime
  })
}