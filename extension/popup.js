import { init, removeRepos } from './modules.js'

document.addEventListener('DOMContentLoaded', e => {
  chrome.storage.sync.get('username', obj => {
    const { username } = obj
    if (username) {
      document.querySelector('#input').setAttribute('value', username)
      init(e)
    } else {
      document.querySelector('#input').setAttribute('value', 'swpw')
      init(e)
    }
  })
})

document.querySelector('#form').addEventListener('submit', e => {
  chrome.storage.sync.get('username', obj => {
    e.preventDefault()
    removeRepos()
    init(e)
    chrome.storage.sync.set({ 'username': [document.querySelector('#input').value] })
  })
})
