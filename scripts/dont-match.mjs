import { extract, emojis, emojisCustom } from 'words-n-numbers'

const textFile = `
U+263A ; 0.6 # ☺ smiling face
U+2639 ; 0.7 # ☹ frowning face
U+2620 ; 1.0 # ☠ skull and crossbones
U+2763 ; 1.0 # ❣ heart exclamation
U+2764 ; 0.6 # ❤ red heart
U+1F573 ; 0.7 # 🕳 hole
U+1F5E8 ; 2.0 # 🗨 left speech bubble
U+1F5EF ; 0.7 # 🗯 right anger bubble
U+1F590 ; 0.7 # 🖐 hand with fingers splayed
U+270C ; 0.6 # ✌ victory hand
U+261D ; 0.6 # ☝ index pointing up
U+270D ; 0.7 # ✍ writing hand
U+1F441 ; 0.7 # 👁 eye
U+1F575 ; 0.7 # 🕵 detective
U+1F574 ; 0.7 # 🕴 person in suit levitating
U+26F7 ; 0.7 # ⛷ skier
U+1F3CC ; 0.7 # 🏌 person golfing
U+26F9 ; 0.7 # ⛹ person bouncing ball
U+1F3CB ; 0.7 # 🏋 person lifting weights
U+1F5E3 ; 0.7 # 🗣 speaking head
U+1F43F ; 0.7 # 🐿 chipmunk
U+1F54A ; 0.7 # 🕊 dove
U+1F577 ; 0.7 # 🕷 spider
U+1F578 ; 0.7 # 🕸 spider web
U+1F3F5 ; 0.7 # 🏵 rosette
U+2618 ; 1.0 # ☘ shamrock
U+1F336 ; 0.7 # 🌶 hot pepper
U+1F37D ; 0.7 # 🍽 fork and knife with plate
U+1F5FA ; 0.7 # 🗺 world map
U+1F3D4 ; 0.7 # 🏔 snow-capped mountain
U+26F0 ; 0.7 # ⛰ mountain
U+1F3D5 ; 0.7 # 🏕 camping
U+1F3D6 ; 0.7 # 🏖 beach with umbrella
U+1F3DC ; 0.7 # 🏜 desert
U+1F3DD ; 0.7 # 🏝 desert island
U+1F3DE ; 0.7 # 🏞 national park
U+1F3DF ; 0.7 # 🏟 stadium
U+1F3DB ; 0.7 # 🏛 classical building
U+1F3D7 ; 0.7 # 🏗 building construction
U+1F3D8 ; 0.7 # 🏘 houses
U+1F3DA ; 0.7 # 🏚 derelict house
U+26E9 ; 0.7 # ⛩ shinto shrine
U+1F3D9 ; 0.7 # 🏙 cityscape
U+2668 ; 0.6 # ♨ hot springs
U+1F3CE ; 0.7 # 🏎 racing car
U+1F3CD ; 0.7 # 🏍 motorcycle
U+1F6E3 ; 0.7 # 🛣 motorway
U+1F6E4 ; 0.7 # 🛤 railway track
U+1F6E2 ; 0.7 # 🛢 oil drum
U+1F6F3 ; 0.7 # 🛳 passenger ship
U+26F4 ; 0.7 # ⛴ ferry
U+1F6E5 ; 0.7 # 🛥 motor boat
U+2708 ; 0.6 # ✈ airplane
U+1F6E9 ; 0.7 # 🛩 small airplane
U+1F6F0 ; 0.7 # 🛰 satellite
U+1F6CE ; 0.7 # 🛎 bellhop bell
U+23F1 ; 1.0 # ⏱ stopwatch
U+23F2 ; 1.0 # ⏲ timer clock
U+1F570 ; 0.7 # 🕰 mantelpiece clock
U+1F321 ; 0.7 # 🌡 thermometer
U+2600 ; 0.6 # ☀ sun
U+2601 ; 0.6 # ☁ cloud
U+26C8 ; 0.7 # ⛈ cloud with lightning and rain
U+1F324 ; 0.7 # 🌤 sun behind small cloud
U+1F325 ; 0.7 # 🌥 sun behind large cloud
U+1F326 ; 0.7 # 🌦 sun behind rain cloud
U+1F327 ; 0.7 # 🌧 cloud with rain
U+1F328 ; 0.7 # 🌨 cloud with snow
U+1F329 ; 0.7 # 🌩 cloud with lightning
U+1F32A ; 0.7 # 🌪 tornado
U+1F32B ; 0.7 # 🌫 fog
U+1F32C ; 0.7 # 🌬 wind face
U+2602 ; 0.7 # ☂ umbrella
U+26F1 ; 0.7 # ⛱ umbrella on ground
U+2744 ; 0.6 # ❄ snowflake
U+2603 ; 0.7 # ☃ snowman
U+2604 ; 1.0 # ☄ comet
U+1F397 ; 0.7 # 🎗 reminder ribbon
U+1F39F ; 0.7 # 🎟 admission tickets
U+1F396 ; 0.7 # 🎖 military medal
U+26F8 ; 0.7 # ⛸ ice skate
U+1F579 ; 0.7 # 🕹 joystick
U+2660 ; 0.6 # ♠ spade suit
U+2665 ; 0.6 # ♥ heart suit
U+2666 ; 0.6 # ♦ diamond suit
U+2663 ; 0.6 # ♣ club suit
U+265F ; 11.0 # ♟ chess pawn
U+1F5BC ; 0.7 # 🖼 framed picture
U+1F576 ; 0.7 # 🕶 sunglasses
U+1F6CD ; 0.7 # 🛍 shopping bags
U+26D1 ; 0.7 # ⛑ rescue worker’s helmet
U+1F399 ; 0.7 # 🎙 studio microphone
U+1F39A ; 0.7 # 🎚 level slider
U+1F39B ; 0.7 # 🎛 control knobs
U+260E ; 0.6 # ☎ telephone
U+1F5A5 ; 0.7 # 🖥 desktop computer
U+1F5A8 ; 0.7 # 🖨 printer
U+2328 ; 1.0 # ⌨ keyboard
U+1F5B1 ; 0.7 # 🖱 computer mouse
U+1F5B2 ; 0.7 # 🖲 trackball
U+1F39E ; 0.7 # 🎞 film frames
U+1F4FD ; 0.7 # 📽 film projector
U+1F56F ; 0.7 # 🕯 candle
U+1F5DE ; 0.7 # 🗞 rolled-up newspaper
U+1F3F7 ; 0.7 # 🏷 label
U+2709 ; 0.6 # ✉ envelope
U+1F5F3 ; 0.7 # 🗳 ballot box with ballot
U+270F ; 0.6 # ✏ pencil
U+2712 ; 0.6 # ✒ black nib
U+1F58B ; 0.7 # 🖋 fountain pen
U+1F58A ; 0.7 # 🖊 pen
U+1F58C ; 0.7 # 🖌 paintbrush
U+1F58D ; 0.7 # 🖍 crayon
U+1F5C2 ; 0.7 # 🗂 card index dividers
U+1F5D2 ; 0.7 # 🗒 spiral notepad
U+1F5D3 ; 0.7 # 🗓 spiral calendar
U+1F587 ; 0.7 # 🖇 linked paperclips
U+2702 ; 0.6 # ✂ scissors
U+1F5C3 ; 0.7 # 🗃 card file box
U+1F5C4 ; 0.7 # 🗄 file cabinet
U+1F5D1 ; 0.7 # 🗑 wastebasket
U+1F5DD ; 0.7 # 🗝 old key
U+26CF ; 0.7 # ⛏ pick
U+2692 ; 1.0 # ⚒ hammer and pick
U+1F6E0 ; 0.7 # 🛠 hammer and wrench
U+1F5E1 ; 0.7 # 🗡 dagger
U+2694 ; 1.0 # ⚔ crossed swords
U+1F6E1 ; 0.7 # 🛡 shield
U+2699 ; 1.0 # ⚙ gear
U+1F5DC ; 0.7 # 🗜 clamp
U+2696 ; 1.0 # ⚖ balance scale
U+26D3 ; 0.7 # ⛓ chains
U+2697 ; 1.0 # ⚗ alembic
U+1F6CF ; 0.7 # 🛏 bed
U+1F6CB ; 0.7 # 🛋 couch and lamp
U+26B0 ; 1.0 # ⚰ coffin
U+26B1 ; 1.0 # ⚱ funeral urn
U+26A0 ; 0.6 # ⚠ warning
U+2622 ; 1.0 # ☢ radioactive
U+2623 ; 1.0 # ☣ biohazard
U+2B06 ; 0.6 # ⬆ up arrow
U+2197 ; 0.6 # ↗ up-right arrow
U+27A1 ; 0.6 # ➡ right arrow
U+2198 ; 0.6 # ↘ down-right arrow
U+2B07 ; 0.6 # ⬇ down arrow
U+2199 ; 0.6 # ↙ down-left arrow
U+2B05 ; 0.6 # ⬅ left arrow
U+2196 ; 0.6 # ↖ up-left arrow
U+2195 ; 0.6 # ↕ up-down arrow
U+2194 ; 0.6 # ↔ left-right arrow
U+21A9 ; 0.6 # ↩ right arrow curving left
U+21AA ; 0.6 # ↪ left arrow curving right
U+2934 ; 0.6 # ⤴ right arrow curving up
U+2935 ; 0.6 # ⤵ right arrow curving down
U+269B ; 1.0 # ⚛ atom symbol
U+1F549 ; 0.7 # 🕉 om
U+2721 ; 0.7 # ✡ star of David
U+2638 ; 0.7 # ☸ wheel of dharma
U+262F ; 0.7 # ☯ yin yang
U+271D ; 0.7 # ✝ latin cross
U+2626 ; 1.0 # ☦ orthodox cross
U+262A ; 0.7 # ☪ star and crescent
U+262E ; 1.0 # ☮ peace symbol
U+25B6 ; 0.6 # ▶ play button
U+23ED ; 0.7 # ⏭ next track button
U+23EF ; 1.0 # ⏯ play or pause button
U+25C0 ; 0.6 # ◀ reverse button
U+23EE ; 0.7 # ⏮ last track button
U+23F8 ; 0.7 # ⏸ pause button
U+23F9 ; 0.7 # ⏹ stop button
U+23FA ; 0.7 # ⏺ record button
U+23CF ; 1.0 # ⏏ eject button
U+2640 ; 4.0 # ♀ female sign
U+2642 ; 4.0 # ♂ male sign
U+26A7 ; 13.0 # ⚧ transgender symbol
U+2716 ; 0.6 # ✖ multiply
U+267E ; 11.0 # ♾ infinity
U+203C ; 0.6 # ‼ double exclamation mark
U+2049 ; 0.6 # ⁉ exclamation question mark
U+3030 ; 0.6 # 〰 wavy dash
U+2695 ; 4.0 # ⚕ medical symbol
U+267B ; 0.6 # ♻ recycling symbol
U+269C ; 1.0 # ⚜ fleur-de-lis
U+2611 ; 0.6 # ☑ check box with check
U+2714 ; 0.6 # ✔ check mark
U+303D ; 0.6 # 〽 part alternation mark
U+2733 ; 0.6 # ✳ eight-spoked asterisk
U+2734 ; 0.6 # ✴ eight-pointed star
U+2747 ; 0.6 # ❇ sparkle
U+00A9 ; 0.6 # © copyright
U+00AE ; 0.6 # ® registered
U+2122 ; 0.6 # ™ trade mark
U+1F170 ; 0.6 # 🅰 A button (blood type)
U+1F171 ; 0.6 # 🅱 B button (blood type)
U+2139 ; 0.6 # ℹ information
U+24C2 ; 0.6 # Ⓜ circled M
U+1F17E ; 0.6 # 🅾 O button (blood type)
U+1F17F ; 0.6 # 🅿 P button
U+1F202 ; 0.6 # 🈂 Japanese “service charge” button
U+1F237 ; 0.6 # 🈷 Japanese “monthly amount” button
U+3297 ; 0.6 # ㊗ Japanese “congratulations” button
U+3299 ; 0.6 # ㊙ Japanese “secret” button
U+25FC ; 0.6 # ◼ black medium square
U+25FB ; 0.6 # ◻ white medium square
U+25AA ; 0.6 # ▪ black small square
U+25AB ; 0.6 # ▫ white small square
U+1F3F3 ; 0.7 # 🏳 white flag
U+1F3F4 U+E0067 U+E0062 U+E0065 U+E006E U+E0067 U+E007F ; 5.0 # 🏴󠁧󠁢󠁥󠁮󠁧󠁿 flag: England
`
const emojiText = textFile.split('\n')
emojiText.forEach(emojiLine => {
  const emoji = extract(emojiLine, { regex: emojis, flags: 'giu' })
  console.log(emoji)
})


