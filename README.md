# Vietnamese Money Number to Text Converter: Đổi tiền số sang chữ Tiếng Việt.
The N2vi.js "Vietnamese Money Number to Text Converter" is a lightweight, zero-dependency JavaScript library that converts integer values into their full Vietnamese word representation. It correctly handles all the special linguistic rules of Vietnamese numbering (“lăm”, “mốt”, “lẻ”, etc.), supports arbitrary-length numbers, and can optionally append a currency unit.

## Key Features

- ✅ Framework-agnostic UMD bundle (works in Node.js and browsers)  
- 🔢 Converts any non-negative integer to Vietnamese words  
- 💬 Handles linguistic nuances:  
  - “lăm” for units digit 5 after tens  
  - “mốt” for units digit 1 after twenty  
  - “lẻ” for zero in the tens place  
- 💸 Optional currency suffix (e.g. `đồng`, `USD`)  
- 🎯 Minimal, readable codebase (~100 lines)

# USAGE:
```js
string = to_vietnamese(10000);  \\"mười nghìn đồng"
string = to_vietnamese("324000"); \\"ba trăm hai mươi bốn nghìn đồng"
to_vietnamese('921200120000') \\ "chín trăm hai mươi mốt tỉ hai trăm triệu một trăm hai mươi nghìn đồng"
```
# DEMO

https://hankphung.github.io/numer_to_vietnamese_text/

----

Authored by Dong Hung Phung. MIT License.
