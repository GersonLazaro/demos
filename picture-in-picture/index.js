const button = document.querySelector('#trigger-button')
const video = document.querySelector('#video')

const onLoadDocument = () => {
  if (document.pictureInPictureEnabled) {
    setButtonState()
    video.addEventListener('loadedmetadata', setButtonState)
    video.addEventListener('emptied', setButtonState)
  } else {
    button.disabled = true
  }
}

const onActivatePictureInPicture = async () => {
  try {
    if (video !== document.pictureInPictureElement) await video.requestPictureInPicture()
    else await document.exitPictureInPicture()
  } catch (error) {
    console.log(error)
  }
}

const setButtonState = () => {
  button.disabled = (video.readyState === 0)
}

const onResizePictureInPicture = (event) => {
  const { width, height } = event.currentTarget
  document.body.style.backgroundColor = `rgb(${width % 255}, ${height % 255}, 150)`
}

const onEnterPictureInPicture = (event) => {
  document.body.classList.add('picture-in-picture')
  event.pictureInPictureWindow.addEventListener('resize', onResizePictureInPicture)
}

const onLeavePictureInPicture = (event) => {
  document.body.classList.remove('picture-in-picture')
  document.body.style.backgroundColor = ''
  event.pictureInPictureWindow.removeEventListener('resize', onResizePictureInPicture)
}

document.addEventListener('DOMContentLoaded', onLoadDocument)
button.addEventListener('click', onActivatePictureInPicture)
video.addEventListener('enterpictureinpicture', onEnterPictureInPicture)
video.addEventListener('leavepictureinpicture', onLeavePictureInPicture)
