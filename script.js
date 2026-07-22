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

typewriter('typewriter', ['Coder', 'Developer', 'Engineer', 'Tea drinker'])
