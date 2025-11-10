# Quick Reference Card - number2english_word v2.0.0

## Installation
```bash
npm install number2english_word
```

## Import
```javascript
const number2word = require('number2english_word');
const { toCurrency, toOrdinal } = require('number2english_word');
```

## Basic Usage

### Integer to Words
```javascript
number2word(42)        // "Forty-Two"
number2word(1234)      // "One Thousand Two Hundred Thirty-Four"
number2word(1000000)   // "One Million"
```

### Decimal Numbers
```javascript
number2word(3.14)      // "Three Point One Four"
number2word(123.456)   // "One Hundred Twenty-Three Point Four Five Six"
```

### Negative Numbers
```javascript
number2word(-42)       // "Negative Forty-Two"
number2word(-123.45)   // "Negative One Hundred Twenty-Three Point Four Five"
```

### With Options
```javascript
// Lowercase output
number2word(42, { capitalizeFirst: false })
// "forty-two"

// Use "and" in compound numbers
number2word(101, { useAnd: true })
// "One Hundred and One"
```

### Currency Formatting
```javascript
// BDT (default)
toCurrency(123.45)
// "One Hundred Twenty-Three Taka and Forty-Five Paisa"

// GBP
toCurrency(100.50, { currency: 'GBP' })
// "One Hundred Pounds and Fifty Pence"

// EUR
toCurrency(250.75, { currency: 'EUR' })
// "Two Hundred Fifty Euros and Seventy-Five Cents"

// INR
toCurrency(500.25, { currency: 'INR' })
// "Five Hundred Rupees and Twenty-Five Paise"

// Custom currency
toCurrency(42, {
    majorUnit: 'Credit',
    majorUnitPlural: 'Credits'
})
// "Forty-Two Credits"
```

### Ordinal Numbers
```javascript
toOrdinal(1)      // "First"
toOrdinal(2)      // "Second"
toOrdinal(3)      // "Third"
toOrdinal(21)     // "Twenty-First"
toOrdinal(100)    // "One Hundredth"
toOrdinal(123)    // "One Hundred Twenty-Third"
```

## Supported Currencies
| Code | Major Unit | Minor Unit |
|------|------------|------------|
| USD  | Dollar     | Cent       |
| GBP  | Pound      | Pence      |
| EUR  | Euro       | Cent       |
| INR  | Rupee      | Paisa      |
| JPY  | Yen        | Sen        |
| BDT  | Taka       | Paisa      |

## API Reference

### `number2word(value, options?)`
**Parameters:**
- `value` - Number or string to convert
- `options.capitalizeFirst` - Capitalize output (default: true)
- `options.useAnd` - Use "and" in numbers (default: false)
- `options.commaAs` - 'thousands' or 'decimal' (default: 'thousands')

**Returns:** String

### `toCurrency(value, options?)`
**Parameters:**
- `value` - Amount to convert
- `options.currency` - Currency code (default: 'BDT')
- `options.majorUnit` - Custom major unit name
- `options.minorUnit` - Custom minor unit name
- `options.majorUnitPlural` - Plural major unit
- `options.minorUnitPlural` - Plural minor unit
- `options.commaAs` - 'thousands' or 'decimal' (default: 'thousands')

**Returns:** String

### `toOrdinal(value)`
**Parameters:**
- `value` - Number to convert to ordinal

**Returns:** String

## Common Use Cases

### Check Writing
```javascript
const amount = 1250.50;
console.log(`Amount: ${toCurrency(amount)}`);
// "Amount: One Thousand Two Hundred Fifty Taka and Fifty Paisa"
```

### Ranking/Positions
```javascript
const position = 3;
console.log(`You finished ${toOrdinal(position)}!`);
// "You finished Third!"
```

### Invoice Generation
```javascript
const total = 5432.10;
console.log(`Total: ${toCurrency(total, { currency: 'EUR' })}`);
// "Total: Five Thousand Four Hundred Thirty-Two Euros and Ten Cents"
```

### Educational Tools
```javascript
const num = 456;
console.log(`${num} in words: ${number2word(num)}`);
// "456 in words: Four Hundred Fifty-Six"
```

## TypeScript
```typescript
import number2word, { toCurrency, toOrdinal } from 'number2english_word';

const result: string = number2word(42);
const currency: string = toCurrency(123.45);
const ordinal: string = toOrdinal(21);
```

## Error Handling
```javascript
try {
    number2word('abc');
} catch (error) {
    console.error(error.message);
    // "Invalid number: abc"
}
```

## Support
- **GitHub:** https://github.com/ringkubd/number2word
- **Issues:** https://github.com/ringkubd/number2word/issues
- **NPM:** https://www.npmjs.com/package/number2english_word

## Testing
```bash
npm test              # Run tests
npm run test:coverage # Run with coverage
```

## Version
Current: **2.0.0**
License: **ISC**
