import fetch from 'node-fetch'
import { extract, emojisCustom } from 'words-n-numbers'

const regexCurrentVersion = '(?<=: )\\d+.\\d'
const regexUnicode = '[\\d\\w\\s]+(?=\\b\\s+;)'
const regexVersion = 'E\\d+.\\d '
const regexQualification = '(?<=; )([\\w-])+'
const regexEmojiDescription = '(?<=E\\d+.\\d ).+'

const checkIfEmojiLine = function(line) {
  if (line.startsWith('#') || (line.trim().length === 0)) {
    return false
  } else {
    return true
  }
}

// Fetch unicode emojis
const response = await fetch('https://unicode.org/Public/emoji/15.0/emoji-test.txt')
const body = await response.text()
// console.log(body)

// split text to array
const emojiText = body.split('\n')
// console.dir(emojiText)

// find version of Unicode Emoji set
const currentVersion = extract(emojiText[7], { regex: regexCurrentVersion })
console.log(currentVersion)

// go through a line with emoji, extract and return array of objects
const createEmojisArray = function (emojiText) {
  // console.log(emojiText)
  const emojisArray = []
  emojiText.forEach(emojiLine => {
    if (checkIfEmojiLine(emojiLine)) {
      // regex content of each emohi line
      let unicode = extract(emojiLine, { regex: regexUnicode })
      unicode = unicode[0].split(' ')
      const version = extract(emojiLine, { regex: regexVersion })
      const emoji = extract(emojiLine, { regex: emojisCustom, flags: 'g' })
      const qualified = extract(emojiLine, { regex: regexQualification })
      // skip iteration if emoji isn't extracted, or...
      // skip if other than fully-qualified (component, minimally-qualified or unqualified)
      if (emoji === null || qualified[0] !== 'fully-qualified' ) {
        return
      }
      const emojiDescription = extract(emojiLine, { regex: regexEmojiDescription , flags: 'g' })
      // create object
      const emojiObj = {
        unicode: unicode,
        version: version,
        emoji: emoji,
        emojiDescription: emojiDescription,
        qualified: qualified
      }
      emojisArray.push(emojiObj)
    }
  })
  return emojisArray
}

const emojisArray = createEmojisArray(emojiText)
console.log(emojisArray)
console.log('Number of emojis: ' + emojisArray.length)
