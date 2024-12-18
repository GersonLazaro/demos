const channel = new BroadcastChannel('theme-switcher')
const toggleButton = document.querySelector('.demo__button')

channel.onmessage = (event) => {
  setTheme(event.data)
}

const toggleTheme = () => {
  const isDarkTheme = document.body.classList.contains('dark')
  const newTheme = isDarkTheme ? 'light' : 'dark'
  setTheme(newTheme)
  channel.postMessage(newTheme)
}

const setTheme = (theme) => {
  document.body.className = theme
}

toggleButton.addEventListener('click', toggleTheme)