import fetch from 'node-fetch'
import { extract, emojisCustom } from 'words-n-numbers'

const regexCurrentVersion = '(?<=v)\\d+.\\d'
const regexUnicode = '.+(?= ;)'
const regexVersion = '(?<=; )\\d+.\\d'
const regexEmojiDescription = '(?<=#\\s.+\\s)[\\w-’ \\s:,]+'

const checkIfEmojiLine = function(line) {
  if (line.startsWith('#') || (line.trim().length < 5)) {
    return false
  } else {
    return true
  }
}

// Fetch unicode emojis
const response = await fetch('https://www.unicode.org/emoji/charts/emoji-ordering.txt')
const body = await response.text()
// console.log(body)

// split text to array
const emojiText = body.split('\n')
// console.dir(emojiText)

// find version of Unicode Emoji set
const currentVersion = extract(emojiText[0], { regex: regexCurrentVersion })[0]
console.log(currentVersion)

// go through a line with emoji, extract and return array of objects
const createEmojisArray = function (emojiText) {
  console.log(emojiText)
  const emojisArray = []
  emojiText.forEach(emojiLine => {
    // console.log('emojiLine: ' + emojiLine + '\nlength: ' + emojiLine.trim().length)
    if (checkIfEmojiLine(emojiLine)) {
      let unicode = extract(emojiLine, { regex: regexUnicode })
        // if (unicode === null) {
        //   return
        // }
      unicode = unicode[0].split(' ')
      const version = extract(emojiLine, { regex: regexVersion })
      const emoji = extract(emojiLine, { regex: emojisCustom, flags: 'g' })
      // skip iteration if emoji isn't extracted
      if (emoji === null) {
        return
      }
      const emojiDescription = extract(emojiLine, { regex: regexEmojiDescription , flags: 'g' })
      console.log(unicode)
      console.log(version)
      console.log(emoji)
      console.log(emojiDescription)
      // create object
      const emojiObj = {
        unicode: unicode,
        version: version,
        emoji: emoji,
        emojiDescription: emojiDescription
      }
      emojisArray.push(emojiObj)
    }
  })
  console.log(emojisArray.length)
  return emojisArray
}

createEmojisArray(emojiText)

// if (checkEmojiLine(unicodeText[5])) {
//   let unicode = extract(unicodeText[2051], { regex: regexUnicode })
//   unicode = unicode[0].split(' ')
//   const version = extract(unicodeText[2051], { regex: regexVersion })
//   const emoji = extract(unicodeText[2051], { regex: emojisCustom, flags: 'g' })
//   const emojiDescription = extract(unicodeText[2051], { regex: regexEmojiDescription , flags: 'g' })
//   console.log(unicode)
//   console.log(version)
//   console.log(emoji)
//   console.log(emojiDescription)
// }
