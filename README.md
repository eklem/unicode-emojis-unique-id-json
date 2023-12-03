# unicode-emojis-unique-id-json

JSON-version of https://unicode.org/Public/emoji/15.0/emoji-test.txt with unique IDs (numbers). The IDs should be unique over time, when new versions of unicode emojis are released. There are a little less than 4000 emojis now if you count the ones with modifiers. I'm guessing it will pass 10000 in the foreseeable future, so the IDs should be 5-digits.

The IDs will start at 00000 and then counting. The reasons for this way of creating IDs instead of some hashing algorithm are two:

* The IDs need to be numbers
* The IDs need to be as short as possible

The usage is for the [One-time-pad encryption/decryption library](https://github.com/eklem/otp-encryption-decryption-lib). More specific: To be able to encrypt and decrypt emojis (in addition to characters and numbers). Emoji encryption and decryption are done through a codebook, starting with a 0 to be identified as a emoji plaincode and then followed by 5 digits.

## Content of JSON

Text-line from https://unicode.org/Public/emoji/15.1/emoji-test.txt

```text
1F600                                                  ; fully-qualified     # 😀 E1.0 grinning face
```

will be:

```Json
[
 {
    "id": "000001",
    "emoji": "😃",
    "description": "grinning face with big eyes",
    "unicode": [
      "U+1F603"
    ],
    "versionIntroduced": "0.6"
  }
]
```

## To get back to the same IDs if something goes wrong

Start from Unicode Emojis v13.0, then run the script on all versions after. That will so far be:

* 13.0
* 13.1
* 14.0 <- We are here now
* 15.0
* 15.1
* [future versions]

Version 15 won't happen before I get regex to work for the [two-character emojis introduced in v15.0 and v15.1](https://github.com/eklem/unicode-emojis-unique-id-json/issues/9).

## Work to be done

* [x] regex for extracting content from text-file.
* [x] read old JSON, fetch new emojis, convert to JSON and add what's not in the old JSON with unique IDs
* [x] write to JSON
* [ ] show which unicode emoji versions are met with this library
* [ ] tests to check that all IDs for previous versions of this library are corresponding to new version of library. Do this by having a previous version directory


## Tests

Should have tests to ensure that IDs for previous versions of unicode emoji IDs are persistent.
