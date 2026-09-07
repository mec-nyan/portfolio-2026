const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

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

typewriter('typewriter', [
  'Coder',
  'Developer',
  'Engineer',
  'FLOSS enthusiast',
  'SysAdmin',
  'Linux beard',
])

scroller()

document.documentElement.setAttribute('data-theme', 'dark')

const ts = document.getElementById('theme-switch')
ts.addEventListener('click', changeTheme)

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
    madeWith: 'Made with',
    by: 'by',
    in: 'in',
  },
  es: {
    madeWith: 'Hecho con',
    by: 'por',
    in: 'en',
  },
}

function applyLanguage() {
  const lang = localStorage.getItem('language') || 'en'

  document.querySelectorAll('[data-i18n]').forEach((elem) => {
    elem.innerText = translations[lang][elem.getAttribute('data-i18n')]
  })
}

applyLanguage()

const languagePopup = document.getElementById('lang-popup')

function toggleLanguageSelector() {
  const isVisible = languagePopup.style.display == 'flex'
  if (isVisible) {
    languagePopup.style.display = 'none'
  } else {
    languagePopup.style.display = 'flex'
  }
}

const languageSwith = document.getElementById('lang-switch-icon')

languageSwith.addEventListener('click', toggleLanguageSelector)

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

const langEn = document.getElementById('lang-en')
langEn.addEventListener('click', () => {
  setLanguage('en')
  toggleLanguageSelector()
  applyLanguage()
})

const langEs = document.getElementById('lang-es')
langEs.addEventListener('click', () => {
  setLanguage('es')
  toggleLanguageSelector()
  applyLanguage()
})
