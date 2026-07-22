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
      color: 'chocolate',
    },
    {
      name: 'Go',
      iconName: 'go-original-wordmark',
      color: 'cornflowerblue',
    },
    {
      name: 'Bash',
      iconName: 'bash-plain',
      color: 'gainsboro',
    },
    {
      name: 'Python',
      iconName: 'python-plain',
      color: 'dodgerblue',
    },
    {
      name: 'C++',
      iconName: 'cplusplus-plain',
      color: 'royalblue',
    },
    {
      name: 'C',
      iconName: 'c-original',
      color: 'cornflowerblue',
    },
    {
      name: 'Javascript',
      iconName: 'javascript-plain',
      color: 'yellow',
    },
    {
      name: 'TypeScript',
      iconName: 'typescript-plain',
      color: 'dodgerblue',
    },
    {
      name: 'Lua',
      iconName: 'lua-plain',
      color: 'deepskyblue',
    },
  ]

  const track = document.getElementById('track')
  const track2 = document.getElementById('track2')
  const items = [...langs, ...langs]

  for (const lang of items) {
    const s = document.createElement('span')
    s.className = 'devicon-' + lang.iconName
    s.style.color = lang.color
    if (lang.iconName.startsWith('go')) {
      s.style.fontSize = '4rem'
      s.style.position = 'relative'
      s.style.top = '-0.8rem'
    }
    // s.textContent = lang
    track2.appendChild(s)

    const t = document.createElement('span')
    // t.style.color = lang.color
    t.textContent = lang.name
    track.appendChild(t)
  }
}

typewriter('typewriter', [
  'Coder',
  'Developer',
  'Engineer',
  'Tea drinker',
  'SysAdmin',
])

scroller()
