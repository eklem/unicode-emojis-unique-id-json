# unicode-emojis-unique-id-json

JSON-version of https://www.unicode.org/emoji/charts/emoji-ordering.txt with unique IDs (numbers). The IDs should be unique over time, when new versions of unicode emojis are released. There are a little less than 4000 emojis now if you count the ones with modifiers. I'm guessing it will pass 10000 in the foreseable future, so the IDs should be 5-digits.

The IDs will start at 00000 and then counting. The reasons for this way of creating IDs instead of some hashing algorithm are two:

* The IDs need to be numbers
* The IDs need to be as short as possible

The usage is for the [One-time-pad encryption/decryption library](https://github.com/eklem/otp-encryption-decryption-lib). More specific: To be able to encrypt and decrypt emojis (in addition to characters and numbers). Emoji encryption and decryption are done through a codebook, starting with a 0 to be identified as a emoji plaincode and then followed by 5 digits.

## Content of JSON

Text-line from https://www.unicode.org/emoji/charts/emoji-ordering.txt

```text
U+1F603 ; 0.6 # 😃 grinning face with big eyes
```

will be:

```Json
[
  {
    "id": "00001",
    "unicode": ["U+1F603"],
    "version": "0.6",
    "emoji": "😃",
    "description": "grinning face with big eyes"
  }
]
```

## Work to be done

* [ ] regex for extracting content from text-file.
* [ ] write to JSON
* [ ] show which unicode emoji versions are met with this library
* [ ] tests to check that all IDs for previous versions of this library are corresponding to new version of library.


## Tests

Should have tests to ensure that IDs for previous versions of unicode emoji IDs are persistent.
