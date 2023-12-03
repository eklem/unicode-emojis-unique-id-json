let testObj = {
  "id": "01637",
  "emoji": "🧑‍🦯‍➡️",
  "description": "man with white cane facing right: light skin tone",
  "unicode": [
    "1F468",
    "1F3FB",
    "200D",
    "1F9AF",
    "200D",
    "27A1",
    "FE0F"
  ],
  "versionIntroduced": "E15.1"
}

let emoji = testObj.unicode.join()

// console.log(testObj.emoji)
console.log(String.fromCodePoint(0x1F468, 0x1F3FB, 0x200D, 0x1F9AF, 0x200D, 0x27A1, 0xFE0F))
