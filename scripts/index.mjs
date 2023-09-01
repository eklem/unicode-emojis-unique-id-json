import fetch from 'node-fetch'
import { extract, emojisCustom } from 'words-n-numbers'

// #########################################################################################
// A: Regular expressions to extract emojis + extra info on each emoji line
const regexCurrentVersion = '(?<=: )\\d+.\\d'
const regexUnicode = '[\\d\\w\\s]+(?=\\b\\s+;)'
const regexVersion = 'E\\d+[.]\\d'
const regexQualification = '(?<=; )([\\w-])+'
const regexEmojiDescription = '(?<=E\\d+[.]\\d ).+'

// #########################################################################################
// B: Function: Check if a line is a comment and split into lines
// ##
const getEmojiFile = async function(URL) {
  const response = await fetch(URL)
  const body = await response.text()
  return body.split('\n')
}

// #########################################################################################
// C: Function: Check if a line is a comment
const checkIfEmojiLine = function(line) {
  if (line.startsWith('#') || (line.trim().length === 0)) {
    return false
  } else {
    return true
  }
}

// #########################################################################################
// D: Function: Find Unicode Emoji version
const getUnicodeEmojiVersion = function(line7) {
  // find version of Unicode Emoji set
  const currentVersion = extract(line7, { regex: regexCurrentVersion })
  return currentVersion
}

// #########################################################################################
// E: Function: Go through a line with emoji,
//    extract with regex and return array of objects
const createEmojiArray = function (emojiText) {
  const emojiArray = []
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
        emoji: emoji,
        emojiDescription: emojiDescription,
        unicode: unicode,
        version: version,
        qualified: qualified
      }
      emojiArray.push(emojiObj)
      console.log(emojiObj)
    }
  })
  return emojiArray
}

// #########################################################################################
// Z: Do stuff
const emojiText = await getEmojiFile('https://unicode.org/Public/emoji/15.0/emoji-test.txt')
const emojiArray = createEmojiArray(emojiText)
const unicodeEmojiVersion = getUnicodeEmojiVersion(emojiText[7])
// console.log(emojiText)
console.log('Number of emojis: ' + emojiArray.length)
console.log('Unicode emoji version: ' + unicodeEmojiVersion)
