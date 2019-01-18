const checkNull = (value) => value === null ? '' : value

const loader = () => {
  setTimeout(() => {
    document.querySelector('#loader').style.display = 'none'
    document.querySelector('#main-wrap').classList.toggle('is-not-visible')
  }, 500)
}

const createRepo = (array) => {
  const main = document.querySelector('.main')

  main.innerHTML = `<h4 class="main__resultsNum">${array.length} results.</h4>`

  array.forEach(e => {
    const { name, description, html_url, language, stargazers_count, forks_count } = e

    const template = `<a href="${html_url}" class="repo__name" target="blank">${name}</a>
              <p class="repo__description">${checkNull(description)}</p>
              <div class="repo__container">
                <span class="repo__span">${checkNull(language)}</span>
                <span class="repo__span">
                  <svg aria-label="stars" class="star" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img">
                    <path fill="#c9c9c9" fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z">
                    </path>
                  </svg>
                  ${stargazers_count}
                </span>
                <span class="repo__span">
                  <svg aria-label="forks" class="fork" viewBox="0 0 10 16" version="1.1" width="10" height="16" role="img">
                    <path fill="#c9c9c9" fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z">
                    </path>
                  </svg>
                  ${forks_count}
                </span>
              </div>`

    const el = document.createElement('section')

    el.classList = 'repo'
    el.innerHTML = template
    main.append(el)
  })
}

const createUser = (res) => {
  const { name, login, avatar_url, html_url } = res
  document.querySelector('.header__img').setAttribute('src', avatar_url)
  document.querySelector('.header__name').textContent = name
  document.querySelector('.header__nickname').textContent = login
  document.querySelector('.header__nickname').setAttribute('href', html_url)
}

const init = (e) => {
  const user = document.querySelector('#input').value

  const url_user = `https://api.github.com/users/${user}`

  const url_repo = `https://api.github.com/users/${user}/repos`

  fetch(url_repo)
    .then(res => res.json())
    .then(res => createRepo(res))

  fetch(url_user)
    .then(res => res.json())
    .then(res => createUser(res))

  document.querySelector('#input').setAttribute('value', user)

  loader()
}

const removeRepos = () => {
  document.querySelectorAll('.repo').forEach(e => e.remove())
}

export { init, removeRepos }
