/**
 * My portfolio 2026.
 *
 * This script provides functionality needed to:
 *
 *     - Switch between dark and light theme.
 *     - Change the language (options: English, Spanish).
 *     - Add animations.
 *     - Dynamically loaded content.
 */

/**
 * Pause for a number of milliseconds.
 * @param {number} ms - The duration of the pause in milliseconds.
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Write words as if they're being typed.
 *
 * @param {string} id - The id of the div you want to write to.
 * @param {string[]} words - The list of words to write. Must contain at least one word.
 * @param {Object} [options] - Timing options in ms.
 * @param {number} [options.typingDelay=100] - Delay between 'key strokes'.
 * @param {number} [options.erasingDelay=50] - Delay between 'backspaces'.
 * @param {number} [options.bigPause=2000] - Pause after typing a word.
 * @param {number} [options.smallPause=200] - Pause after deleting a word.
 * @returns {Promise<void>} A promise that runs forever while active.
 * @throws {Error} If no element with id 'id' can be found.
 */
async function typewriter(
  id,
  words,
  {
    typingDelay = 100,
    erasingDelay = 50,
    bigPause = 2000,
    smallPause = 200,
  } = {}
) {
  const tw = document.getElementById(id)

  if (!tw) {
    throw new Error(`No element found with id "${id}"`)
  }

  let index = 0

  while (true) {
    const word = words[index]

    // Delete previous stuff
    while (tw.textContent.length > 0) {
      tw.textContent = tw.textContent.slice(0, -1)
      await sleep(erasingDelay)
    }

    await sleep(smallPause)

    for (const char of word) {
      tw.textContent += char
      await sleep(typingDelay)
    }

    await sleep(bigPause)

    index = (index + 1) % words.length
  }
}

/** scroller creates two tracks with scrolling icons in opposite directions. */
function scroller() {
  const langs = [
    {
      name: 'Rust',
      iconName: 'rust-original',
      color: 'rs',
    },
    {
      name: 'Go',
      iconName: 'go-original-wordmark',
      color: 'go',
    },
    {
      name: 'Bash',
      iconName: 'bash-plain',
      color: 'sh',
    },
    {
      name: 'Python',
      iconName: 'python-plain',
      color: 'py',
    },
    {
      name: 'C++',
      iconName: 'cplusplus-plain',
      color: 'cc',
    },
    {
      name: 'C',
      iconName: 'c-original',
      color: 'c',
    },
    {
      name: 'Javascript',
      iconName: 'javascript-plain',
      color: 'js',
    },
    {
      name: 'TypeScript',
      iconName: 'typescript-plain',
      color: 'ts',
    },
    {
      name: 'React',
      iconName: 'react-original',
      color: 'react',
    },
    {
      name: 'Lua',
      iconName: 'lua-plain',
      color: 'lua',
    },
    {
      name: 'debian',
      iconName: 'debian-plain',
      color: 'deb',
    },
    {
      name: 'Ubuntu',
      iconName: 'ubuntu-plain',
      color: 'ubu',
    },
  ]

  const track = document.getElementById('track')
  const track2 = document.getElementById('track2')
  const items = [...langs, ...langs]

  for (const lang of items) {
    const s = document.createElement('span')
    s.className = 'devicon-' + lang.iconName
    s.style.color = `var(--logo-${lang.color})`
    if (lang.iconName.startsWith('go')) {
      s.style.fontSize = '4rem'
    }
    track2.appendChild(s)

    const t = document.createElement('span')
    // t.style.color = lang.color
    t.textContent = lang.name
    track.appendChild(t)
  }
}

/** Change the site's theme. */
function changeTheme() {
  const ti = document.getElementById('theme-icon')

  if (ti.innerText === 'dark_mode') {
    document.documentElement.setAttribute('data-theme', 'dark')
    ti.innerText = 'light_mode'
  } else {
    document.documentElement.setAttribute('data-theme', 'light')
    ti.innerText = 'dark_mode'
  }
}

// Initiate the typewriter effect.
typewriter('typewriter', [
  'Coder',
  'Developer',
  'Engineer',
  'FLOSS enthusiast',
  'SysAdmin',
  'Linux beard',
])

// Initiate the scroller.
scroller()

// Set the default page's theme to 'dark'.
document.documentElement.setAttribute('data-theme', 'dark')

// Add the theme switcher.
const ts = document.getElementById('theme-switch')
ts.addEventListener('click', changeTheme)

// Accordion.
// Select all the items.  Add the event listener to open, close and style the elements of
// the accordion.
const items = document.querySelectorAll('.item')

items.forEach((item) => {
  const header = item.querySelector('.header')
  const content = item.querySelector('.content')

  if (item.classList.contains('active')) {
    content.style.maxHeight = content.scrollHeight + 'px'
  }

  header.addEventListener('click', () => {
    const isOpen = item.classList.contains('active')

    items.forEach((i) => {
      i.classList.remove('active')
      i.querySelector('.content').style.maxHeight = null
      i.querySelector('.plus').innerText = '+'
    })

    if (!isOpen) {
      item.classList.add('active')
      content.style.maxHeight = content.scrollHeight + 'px'
      item.querySelector('.plus').innerText = '-'
    }
  })
})

// i18n
const translations = {
  en: {
    // about:
    aboutMe: 'About me',
    // experience:
    xp: 'Experience',
    // education:
    ed: 'Education',
    // showcase:
    showcase: 'Showcase',
    // contact:
    contact: 'Contact',
    // footer:
    madeWith: 'Made with',
    by: 'by',
    in: 'in',
  },
  es: {
    // about:
    aboutMe: 'Acerca de mi',
    // experience:
    xp: 'Experiencia',
    // education:
    ed: 'Educacion',
    // showcase:
    showcase: 'Galería',
    // contact:
    contact: 'Contacto',
    // footer:
    madeWith: 'Hecho con',
    by: 'por',
    in: 'en',
  },
}

/** Update the content of the page according to the preferred language. */
function applyLanguage() {
  const lang = localStorage.getItem('language') || 'en'

  document.querySelectorAll('[data-i18n]').forEach((elem) => {
    elem.innerText = translations[lang][elem.getAttribute('data-i18n')]
  })
}

applyLanguage()

// Set up a language selector.
const languagePopup = document.getElementById('lang-popup')

// Toggle the visibility of the language selector pop up.
function toggleLanguageSelector() {
  const isVisible = languagePopup.style.display == 'flex'
  if (isVisible) {
    languagePopup.style.display = 'none'
  } else {
    languagePopup.style.display = 'flex'
  }
}

// Provide the functionality to the language switcher icon.
const languageSwith = document.getElementById('lang-switch-icon')

languageSwith.addEventListener('click', toggleLanguageSelector)

// Set the page's current language.
function setLanguage(lang) {
  localStorage.setItem('language', lang)

  const indicatorEn = document.getElementById('lang-indicator-en')
  const indicatorEs = document.getElementById('lang-indicator-es')

  indicatorEn.innerText = ''
  indicatorEs.innerText = ''

  if (lang == 'en') {
    indicatorEn.innerText = '▪'
  } else if (lang == 'es') {
    indicatorEs.innerText = '▪'
  }
}

// Bind the language options (en).
const langEn = document.getElementById('lang-en')
langEn.addEventListener('click', () => {
  setLanguage('en')
  toggleLanguageSelector()
  applyLanguage()
})

// Bind the language options (es).
const langEs = document.getElementById('lang-es')
langEs.addEventListener('click', () => {
  setLanguage('es')
  toggleLanguageSelector()
  applyLanguage()
})
