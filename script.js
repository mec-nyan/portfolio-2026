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
      name: 'rust-original',
      color: 'chocolate',
    },
    {
      name: 'go-original-wordmark',
      color: 'cornflowerblue',
    },
    {
      name: 'bash-plain',
      color: 'white',
    },
    {
      name: 'python-plain',
      color: 'dodgerblue',
    },
    {
      name: 'cplusplus-plain',
      color: 'royalblue',
    },
    {
      name: 'c-original',
      color: 'cornflowerblue',
    },
    {
      name: 'javascript-plain',
      color: 'yellow',
    },
    {
      name: 'typescript-plain',
      color: 'dodgerblue',
    },
  ]

  const track = document.getElementById('track')
  const items = [...langs, ...langs]

  for (const lang of items) {
    const s = document.createElement('span')
    s.className = 'devicon-' + lang.name
    s.style.color = lang.color
    // s.textContent = lang
    track.appendChild(s)
  }
}

typewriter('typewriter', ['Coder', 'Developer', 'Engineer', 'Tea drinker'])

scroller()
