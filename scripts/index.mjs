import fetch from 'node-fetch'
import { extract, emojisCustom } from 'words-n-numbers'
import { existsSync, readFileSync, writeFileSync } from 'fs'

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
      //   if other than fully-qualified (component, minimally-qualified or unqualified)
      if (emoji === null || qualified[0] !== 'fully-qualified' ) {
        return
      }
      const emojiDescription = extract(emojiLine, { regex: regexEmojiDescription , flags: 'g' })
      // create object
      const emojiObj = {
        emoji: emoji[0],
        emojiDescription: emojiDescription[0],
        unicode: unicode,
        versionIntroduced: version[0]
        // qualified: qualified[0]
      }
      emojiArray.push(emojiObj)
      console.log(emojiObj)
    }
  })
  return emojiArray
}

// #########################################################################################
// E: Read existing JSON file, compare and update
const readFileAndUpdate = function () {
  if (existsSync('../dist/unicode-emojis-unique-id.json', 'utf8')) {
    console.log('file exists')
    const emojisUniqueId = readFileSync('../dist/unicode-emojis-unique-id.json', 'utf8').toString().trim()
    console.log(JSON.parse(emojisUniqueId))
  } else {
    console.log('File doesn\'t exist\nYou need to create one with at least one emoji object in an array')
  }
}

// #########################################################################################
// Y: Do stuff
const emojiText = await getEmojiFile('https://unicode.org/Public/emoji/15.0/emoji-test.txt')
const emojiArray = createEmojiArray(emojiText)
const unicodeEmojiVersion = getUnicodeEmojiVersion(emojiText[7])
// console.log(emojiText)
console.log('Number of emojis: ' + emojiArray.length)
console.log('Unicode emoji version: ' + unicodeEmojiVersion)
readFileAndUpdate()


// #########################################################################################
// Z: Stuff to be done:
//    * Compare fetched and read JSON to see if they are the same OR check Unicode emoji version
//    * 
