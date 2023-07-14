# unicode-emojis-unique-id-json

JSON-version of https://www.unicode.org/emoji/charts/emoji-ordering.txt with unique IDs (numbers). The IDs should be unique over time, when new versions of unicode emojis are released. There are a little less than 4000 emojis now. I'm guessing it will pass 10000 in the foreseable future, so the IDs should be 5-digits.

## Content of JSON

```text
U+1F603 ; 0.6 # 😃 grinning face with big eyes
```

will be:

```Json
[
  {
    "id": "00002",
    "utf8": "U+1F603",
    "version": "0.6",
    "emoji": "😃",
    "explanation": "grinning face with big eyes"
  }
]
```


## Tests

Should have tests to ensure that IDs for previous versions of unicode emoji IDs are persistent.
