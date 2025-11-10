# number2english_word

[![npm version](https://img.shields.io/npm/v/number2english_word.svg)](https://www.npmjs.com/package/number2english_word)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A comprehensive and feature-rich JavaScript library to convert numbers into English words. Supports integers, decimals, negative numbers, currency formatting, and ordinal numbers.

## Features

✨ **Comprehensive Number Conversion**
- Integers (0 to extremely large numbers)
- Decimal/floating-point numbers
- Negative numbers
- Numbers with commas

💰 **Currency Formatting**
- Multiple currency support (USD, GBP, EUR, INR, JPY)
- Custom currency units
- Proper pluralization

🔢 **Ordinal Numbers**
- Convert to ordinal words (First, Second, Third, etc.)

⚙️ **Configurable Options**
- Capitalization control
- "and" conjunction option
- TypeScript support

## Installation

```bash
npm install number2english_word
```

## Usage

### Basic Number Conversion

```javascript
const number2word = require('number2english_word');

// Basic integers
number2word(0);        // "Zero"
number2word(42);       // "Forty-Two"
number2word(1234);     // "One Thousand Two Hundred Thirty-Four"

// Large numbers
number2word(1000000);  // "One Million"
number2word(1234567890); // "One Billion Two Hundred Thirty-Four Million Five Hundred Sixty-Seven Thousand Eight Hundred Ninety"

// String input with commas
number2word('1,234,567'); // "One Million Two Hundred Thirty-Four Thousand Five Hundred Sixty-Seven"
```

### Comma Interpretation

By default, commas are treated as thousands separators. You can specify how to interpret commas:

```javascript
// Comma as thousands separator (default)
number2word('10,580');  
// "Ten Thousand Five Hundred Eighty"

number2word('1,234.56');  
// "One Thousand Two Hundred Thirty-Four Point Five Six"

// Comma as decimal point (European style)
number2word('10,58', { commaAs: 'decimal' });  
// "Ten Point Five Eight"

number2word('1234,56', { commaAs: 'decimal' });  
// "One Thousand Two Hundred Thirty-Four Point Five Six"

// Same applies to currency
toCurrency('1,234.50');  // Default: comma as thousands
// "One Thousand Two Hundred Thirty-Four Dollars and Fifty Cents"

toCurrency('1234,50', { commaAs: 'decimal' });  // European style
// "One Thousand Two Hundred Thirty-Four Dollars and Fifty Cents"
```

### Decimal Numbers

```javascript
number2word(3.14);      // "Three Point One Four"
number2word(123.456);   // "One Hundred Twenty-Three Point Four Five Six"
number2word('0.5');     // "Zero Point Five"
```

### Negative Numbers

```javascript
number2word(-42);       // "Negative Forty-Two"
number2word(-123.45);   // "Negative One Hundred Twenty-Three Point Four Five"
```

### Options

```javascript
// Disable capitalization
number2word(42, { capitalizeFirst: false }); 
// "forty-two"

// Use "and" in compound numbers
number2word(101, { useAnd: true }); 
// "One Hundred and One"

number2word(523, { useAnd: true }); 
// "Five Hundred and Twenty-Three"
```

### Currency Formatting

```javascript
const { toCurrency } = require('number2english_word');

// Default (BDT)
toCurrency(123.45);  
// "One Hundred Twenty-Three Taka and Forty-Five Paisa"

toCurrency(1);       
// "One Dollar"

toCurrency(0.01);    
// "Zero Dollars and One Cent"

// Different currencies
toCurrency(100.50, { currency: 'GBP' });  
// "One Hundred Pounds and Fifty Pence"

toCurrency(250.75, { currency: 'EUR' });  
// "Two Hundred Fifty Euros and Seventy-Five Cents"

toCurrency(500.25, { currency: 'INR' });  
// "Five Hundred Rupees and Twenty-Five Paise"

toCurrency(1000.50, { currency: 'BDT' });  
// "One Thousand Taka and Fifty Paisa"

// Custom currency units
toCurrency(42, {
    majorUnit: 'Credit',
    majorUnitPlural: 'Credits',
    minorUnit: 'Point',
    minorUnitPlural: 'Points'
});
// "Forty-Two Credits"
```

### Supported Currencies

- **USD** - Dollar/Dollars, Cent/Cents
- **GBP** - Pound/Pounds, Pence/Pence
- **EUR** - Euro/Euros, Cent/Cents
- **INR** - Rupee/Rupees, Paisa/Paise
- **JPY** - Yen/Yen, Sen/Sen
- **BDT** - Taka/Taka, Paisa/Paisa

### Ordinal Numbers

```javascript
const { toOrdinal } = require('number2english_word');

toOrdinal(1);     // "First"
toOrdinal(2);     // "Second"
toOrdinal(3);     // "Third"
toOrdinal(21);    // "Twenty-First"
toOrdinal(100);   // "One Hundredth"
toOrdinal(1000);  // "One Thousandth"
toOrdinal(123);   // "One Hundred Twenty-Third"
```

## TypeScript Support

This package includes TypeScript type definitions:

```typescript
import number2word, { toCurrency, toOrdinal, ConversionOptions, CurrencyOptions } from 'number2english_word';

const result: string = number2word(42);
const currency: string = toCurrency(123.45, { currency: 'USD' });
const ordinal: string = toOrdinal(21);

// With options
const options: ConversionOptions = {
    capitalizeFirst: true,
    useAnd: false
};
const withOptions: string = number2word(100, options);
```

## API Reference

### `number2word(val, options?)`

Main function to convert numbers to words.

**Parameters:**
- `val` (string | number): The number to convert
- `options` (Object, optional):
  - `capitalizeFirst` (boolean): Capitalize the first letter (default: true)
  - `useAnd` (boolean): Use 'and' in compound numbers (default: false)
  - `commaAs` (string): Interpret comma as 'thousands' or 'decimal' (default: 'thousands')

**Returns:** string - The number in English words

### `toCurrency(val, options?)`

Convert a number to currency format.

**Parameters:**
- `val` (string | number): The amount to convert
- `options` (Object, optional):
  - `currency` (string): Currency code - 'USD', 'GBP', 'EUR', 'INR', 'JPY', 'BDT' (default: 'BDT')
  - `majorUnit` (string): Custom major unit name (default: 'Dollar')
  - `majorUnitPlural` (string): Plural form of major unit (default: 'Dollars')
  - `minorUnit` (string): Custom minor unit name (default: 'Cent')
  - `minorUnitPlural` (string): Plural form of minor unit (default: 'Cents')
  - `commaAs` (string): Interpret comma as 'thousands' or 'decimal' (default: 'thousands')

**Returns:** string - The currency amount in words

### `toOrdinal(val)`

Convert a number to ordinal words.

**Parameters:**
- `val` (string | number): The number to convert

**Returns:** string - The ordinal number in words

## Examples

### Real-world Use Cases

```javascript
const number2word = require('number2english_word');
const { toCurrency, toOrdinal } = require('number2english_word');

// Check writing
const checkAmount = toCurrency(1250.50);
console.log(`Amount: ${checkAmount}`);
// "Amount: One Thousand Two Hundred Fifty Taka and Fifty Paisa"

// Ranking system
const position = toOrdinal(3);
console.log(`You finished in ${position} place!`);
// "You finished in Third place!"

// Educational tools
const number = 456;
console.log(`${number} in words is: ${number2word(number)}`);
// "456 in words is: Four Hundred Fifty-Six"

// Invoice generation
const total = 5432.10;
console.log(`Total: ${toCurrency(total, { currency: 'EUR' })}`);
// "Total: Five Thousand Four Hundred Thirty-Two Euros and Ten Cents"
```

## Error Handling

The library throws errors for invalid input:

```javascript
try {
    number2word('abc');
} catch (error) {
    console.error(error.message); // "Invalid number: abc"
}
```

## Supported Number Range

- Minimum: Any negative number
- Maximum: Up to Decillion (10³⁶)
- Decimals: Unlimited decimal places

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Author

**Anwar Jahid**
- Email: ajr.jahid@gmail.com
- GitHub: [@ringkubd](https://github.com/ringkubd)

## Changelog

### Version 2.0.0

**Major Updates:**
- ✨ Added decimal number support
- ✨ Added currency formatting with multiple currency support
- ✨ Added ordinal number conversion
- ✨ Added TypeScript definitions
- ✨ Added comprehensive test suite
- 🐛 Fixed bug with negative number handling
- 🐛 Fixed edge cases with zero values
- 📝 Added complete documentation
- ⚙️ Added configurable options (capitalizeFirst, useAnd)
- 🔧 Improved code structure and maintainability
- 🎨 Better error handling and validation

### Version 1.0.9
- Initial release with basic integer conversion

## Keywords

number, number to text, number to words, number2word, number2text, currency, decimal, english, words, converter, ordinal, typescript

## Support

If you encounter any issues or have questions, please file an issue on the [GitHub repository](https://github.com/ringkubd/number2word/issues).

---

Made with ❤️ by Anwar Jahid
