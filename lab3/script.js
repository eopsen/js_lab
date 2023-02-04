
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

const recordButtons = document.querySelectorAll('.record-button')
const playButtons = document.querySelectorAll('.play-button')
const playSelectedButton = document.querySelector('.play-all')
const channelNames = document.querySelectorAll('.channel-txt')
const metronomeBtn = document.getElementById('metronome-btn')
const channels = {}
let selectedChannel
let tempo = 160
let interval = 60000 / tempo;
let isMetronomeActive = false;
let metronomeIntervalId

document.addEventListener('keypress', onKeyPress)
playSelectedButton.addEventListener('click', playSelected)
metronomeBtn.addEventListener('click', toggleMetronome)

recordButtons.forEach(recordButton => {
  recordButton.addEventListener('click', toggleRecording)
})

playButtons.forEach(playButton => {
  playButton.addEventListener('click', togglePlaying)
})

channelNames.forEach(channelName => {
  channelName.addEventListener('click', toggleSelecting)
})

function toggleMetronome(event) {
  console.log('toggleMetronome')
  isMetronomeActive = !isMetronomeActive;

  metronomeBtn.innerHTML = isMetronomeActive ? "Stop" : "Start"

  if (isMetronomeActive) {
    if (typeof metronomeIntervalId !== 'undefined') clearInterval(metronomeIntervalId);
    tempo = document.getElementById("tempo").value
    interval = 60000 / tempo;
    metronomeIntervalId = setInterval(beat, interval);
  } else {
    clearInterval(metronomeIntervalId);
  }
}

function beat() {
  let sound = document.querySelector('#s7')

  if (sound) {
    sound.currentTime = 0
    sound.play()
  }
}

function playSelected() {
  for (let channel in channels) {
    if (channels[channel].selected) {
      playSong(channel)
    }
  }
}
function togglePlaying(event) {
  if (isAnyOtherChannelActive(event.target.id)) {
    return
  }

  playSong(event.target.id)
}

function toggleRecording(event) {
  if (isAnyOtherChannelActive(event.target.id)) {
    return
  }

  event.target.classList.toggle('active')

  if (isRecording()) {
    startRecording(event.target.id)
  } else {
    stopRecording(event.target.id)
  }
}

function toggleSelecting(event) {
  let channel = event.target.id
  event.target.classList.toggle('active')

  if (!channels[channel]) {
    channels[channel] = {
      selected: false
    }
  }

  channels[channel].selected = !channels[channel].selected
}

function isAnyOtherChannelActive(channel) {
  let result = false
  recordButtons.forEach(recordButton => {
    if (recordButton.classList.contains('active') && recordButton.id !== channel) {
      result = true
    }
  })

  return result
}

function startRecording(channel) {
  if (!channels[channel]) {
    channels[channel] = {
      selected: false
    }
  }

  channels[channel].start = Date.now()
  channels[channel].notes = []
  selectedChannel = channel;
}

function stopRecording(channel) {
  selectedChannel = '';
}

function playSong(channel) {
  let notes = channels[channel].notes
  if (!notes || notes.length === 0) return
  notes.forEach(note => {
    setTimeout(() => {
      playSound(note.key)
    }, note.startTime)
  });
}

function isRecording() {
  let isRecording = false
  if (recordButtons == null) {
    return false
  }

  recordButtons.forEach(recordButton => {
    if (recordButton.classList.contains('active')) {
      isRecording = true
    }
  })

  return isRecording
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
  if (!selectedChannel) {
    return
  }

  let channel = channels[selectedChannel]
  channel.notes.push({
    key: pressedKey,
    startTime: Date.now() - channel.start
  })
}