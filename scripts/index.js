import fetch from 'node-fetch'
import { extract, emojisCustom } from 'words-n-numbers'
import { existsSync, readFileSync, writeFileSync } from 'fs'
const file = '../dist/unicode-emojis-unique-id.json'
const emojiURL = 'https://unicode.org/Public/emoji/14.0/emoji-test.txt'

// #########################################################################################
// A: Regular expressions to extract emojis + extra info on each emoji line
const regexCurrentVersion = '(?<=: )\\d+.\\d'
const regexUnicode = '[\\d\\w\\s]+(?=\\b\\s+;)'
const regexVersion = 'E\\d+[.]\\d'
const regexQualification = '(?<=; )([\\w-])+'
const regexDescription = '(?<=E\\d+[.]\\d ).+'

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
      const emoji = extract(emojiLine, { regex: emojisCustom, flags: 'gi' })
      const qualified = extract(emojiLine, { regex: regexQualification })
      // skip iteration if emoji isn't extracted, or...
      //   if other than fully-qualified (component, minimally-qualified or unqualified)
      if (emoji === null || qualified[0] !== 'fully-qualified' ) {
        return
      }
      const description = extract(emojiLine, { regex: regexDescription , flags: 'g' })
      // create object
      const emojiObj = {
        id: '',
        emoji: emoji.join(''),
        description: description[0],
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
const readFile = function (file) {
  if (existsSync(file, 'utf8')) {
    console.log('file exists')
    const emojisUniqueId = readFileSync(file, 'utf8').toString().trim()
    const fileJSON = JSON.parse(emojisUniqueId)
    return fileJSON
  } else {
    console.log('File doesn\'t exist\nYou need to create one with at least one emoji object in an array')
    // File starter:
    // {
    //   "unicode-emojis-version": "15.0",
    //   "emojis": [
    //     {
    //       "id": "00001",
    //       "emoji": "😃",
    //       "description": "grinning face with big eyes",
    //       "unicode": ["U+1F603"],
    //       "versionIntroduced": "0.6"
    //     }
    //   ]
    // }
  }
}

// #########################################################################################
// F: Read local JSON, fetch Unicode.org JSON and build new JSON to write
//    1: Get highest ID from read array of emojis
//    2: Loop through fetched array
//    3: Check if emoji object is present by comparing obj.unicode
//    4: If not, add ID set to read array.length + 1 (counting starts at 1) and pad it to be 5 digits long
//    5: Add object to array

const addNewObjects = function (readJSON, fetchedJSON, unicodeVersion) {
  if (readJSON.version === unicodeVersion) {
    console.log('local file up to date with Unicode Emojis version: ' + unicodeVersion)
  } else {
    console.log('local file needs to be updated with lates Unicode Emojis')
    console.log('existing array length: ' + readJSON.emojis.length)

    // Loop through new array and add ID
    for (const obj of fetchedJSON) {
      if (readJSON.emojis.some((existingObj) => existingObj.description === obj.description )) {
        console.log(obj.emoji + '  ' + obj.description + ' already existing, skipping')
      } else {
        // console.log('new emoji, do the work')
        const idNum = readJSON.emojis.length + 1
        obj.id = JSON.stringify(idNum).padStart(6, '0')
        readJSON.emojis.push(obj)
      }
    }
    return readJSON
  }
}

// #########################################################################################
// Y: Do stuff
let fileJSON = readFile(file)
const emojiText = await getEmojiFile(emojiURL)
const unicodeVersion = getUnicodeEmojiVersion(emojiText[7])
const unicodeJSON = createEmojiArray(emojiText)
let newFile = addNewObjects(fileJSON, unicodeJSON, unicodeVersion)
console.log(newFile)
writeFileSync(file, JSON.stringify(newFile, null, '  '), 'utf8')
