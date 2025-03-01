import test from 'ava'
import arr from '../dist/unicode-emojis-unique-id.json' with { type: 'json' }

const emojisArr = arr.emojis

const e06 = {
  "id": "00001",
  "emoji": "😃",
  "description": "grinning face with big eyes",
  "unicode": [
    "U+1F603"
  ],
  "versionIntroduced": "0.6"
}

const e07 = {
  "id": "000035",
  "emoji": "😐",
  "description": "neutral face",
  "unicode": [
    "1F610"
  ],
  "versionIntroduced": "E0.7"
}

const e10 = {
  "id": "000002",
  "emoji": "😀",
  "description": "grinning face",
  "unicode": [
    "1F600"
  ],
  "versionIntroduced": "E1.0"
}

const e30 = {
  "id": "000007",
  "emoji": "🤣",
  "description": "rolling on the floor laughing",
  "unicode": [
    "1F923"
  ],
  "versionIntroduced": "E3.0"
}

const e40 = {
  "id": "000524",
  "emoji": "👱‍♀️",
  "description": "woman: blond hair",
  "unicode": [
    "1F471",
    "200D",
    "2640",
    "FE0F"
  ],
  "versionIntroduced": "E4.0"
}

const e50 = {
  "id": "000016",
  "emoji": "🤩",
  "description": "star-struck",
  "unicode": [
    "1F929"
  ],
  "versionIntroduced": "E5.0"
}

const e110 = {
  "id": "000014",
  "emoji": "🥰",
  "description": "smiling face with hearts",
  "unicode": [
    "1F970"
  ],
  "versionIntroduced": "E11.0"
}

const e120 = {
  "id": "000088",
  "emoji": "🥱",
  "description": "yawning face",
  "unicode": [
    "1F971"
  ],
  "versionIntroduced": "E12.0"
}

const e130 = {
  "id": "000022",
  "emoji": "🥲",
  "description": "smiling face with tear",
  "unicode": [
    "1F972"
  ],
  "versionIntroduced": "E13.0"
}

const e140 = {
  "id": "003518",
  "emoji": "🫠",
  "description": "melting face",
  "unicode": [
    "1FAE0"
  ],
  "versionIntroduced": "E14.0"
}

test('Testing one of emojis v E0.6', t => {
  t.plan(1)
  const objActual = emojisArr.find(({ id }) => id === e06.id)
	t.deepEqual(objActual, e06)
})

test('Testing one of emojis v E0.7', t => {
  t.plan(1)
  const objActual = emojisArr.find(({ id }) => id === e07.id)
	t.deepEqual(objActual, e07)
})

test('Testing one of emojis v E1.0', t => {
  t.plan(1)
  const objActual = emojisArr.find(({ id }) => id === e10.id)
	t.deepEqual(objActual, e10)
})

test('Testing one of emojis v E3.0', t => {
  t.plan(1)
  const objActual = emojisArr.find(({ id }) => id === e30.id)
	t.deepEqual(objActual, e30)
})

test('Testing one of emojis v E4.0', t => {
  t.plan(1)
  const objActual = emojisArr.find(({ id }) => id === e40.id)
	t.deepEqual(objActual, e40)
})

test('Testing one of emojis v E5.0', t => {
  t.plan(1)
  const objActual = emojisArr.find(({ id }) => id === e50.id)
	t.deepEqual(objActual, e50)
})

test('Testing one of emojis v E11.0', t => {
  t.plan(1)
  const objActual = emojisArr.find(({ id }) => id === e110.id)
	t.deepEqual(objActual, e110)
})

test('Testing one of emojis v E12.0', t => {
  t.plan(1)
  const objActual = emojisArr.find(({ id }) => id === e120.id)
	t.deepEqual(objActual, e120)
})

test('Testing one of emojis v E13.0', t => {
  t.plan(1)
  const objActual = emojisArr.find(({ id }) => id === e130.id)
	t.deepEqual(objActual, e130)
})

test('Testing one of emojis v E14.0', t => {
  t.plan(1)
  const objActual = emojisArr.find(({ id }) => id === e140.id)
	t.deepEqual(objActual, e140)
})
