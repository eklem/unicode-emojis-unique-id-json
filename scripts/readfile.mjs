import { existsSync, readFileSync, writeFileSync } from 'fs'

// check if JSON file exists and merge
if (existsSync('../dist/unicode-emojis-unique-id.json', 'utf8')) {
  console.log('file exists')
  const emojisUniqueId = readFileSync('../dist/unicode-emojis-unique-id.json', 'utf8').toString().trim()
  console.log(JSON.parse(emojisUniqueId))
} else {
  console.log('File doesn\'t exist\nYou need to create one with at least one emoji object in an array')
}
