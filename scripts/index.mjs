import fetch from 'node-fetch'
import { extract } from 'words-n-numbers'


const regexCurrentVersion = '(?<=v)\\d+.\\d'
const regexUnicode = '.+(?=;)'
const regexVersion = '(?<=; )\\d+.\\d'
const regexEmoji = '(?<=#\\s).'
const regexEmojiDescription = '(?<=#\\s.+\\s)[\\w-\’ \\s:,]+' // <-- This needs gui-flags as options since the regular expression is dependent on unicode flag not present

const checkEmojiLine = function(line) {
  if (line.startsWith('#')) {
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
const unicodeText = body.split('\n')
// console.dir(unicodeText)

// find version of Unicode Emoji set
const currentVersion = extract(unicodeText[0], { regex: regexCurrentVersion })[0]
console.log(currentVersion)


// go through a line with emoji and extract
if (checkEmojiLine(unicodeText[5])) {
  const unicode = extract(unicodeText[5], { regex: regexUnicode })
  const version = extract(unicodeText[5], { regex: regexVersion })
  const emoji = extract(unicodeText[5], { regex: regexEmoji })
  const emojiDescription = extract(unicodeText[5], { regex: regexEmojiDescription, flags: 'gi' })
  console.log(unicode)
  console.log(version)
  console.log(emoji)
  console.log(emojiDescription)
}


