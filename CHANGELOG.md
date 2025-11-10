# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2025-11-10

### Changed

- **Default currency changed**: BDT (Bangladeshi Taka) is now the default currency instead of USD
- **Regional focus**: Better support for Bangladesh and South Asian users
- **Backward compatibility**: All existing functionality preserved with explicit currency options

### Migration Notes

- **For Bangladesh users**: No changes needed - BDT is now default
- **For international users**: Specify currency explicitly if using USD:

  ```javascript
  toCurrency(amount, { currency: 'USD' }); // Explicit USD
  toCurrency(amount); // Now defaults to BDT
  ```

## [2.1.0] - 2025-11-10

### Added
- **BDT currency support**: Added Bangladeshi Taka (BDT) with Taka/Paisa units
- **Comma interpretation option**: New `commaAs` option to specify whether commas should be interpreted as:
  - `'thousands'` - Thousands separator (default) - e.g., "10,580" = ten thousand
  - `'decimal'` - Decimal point (European format) - e.g., "10,58" = ten point five eight
- **Enhanced currency formatting**: `commaAs` option now available in `toCurrency()` function
- **More test cases**: Added 3 new test cases for comma handling and BDT currency (41 total tests)

### Changed
- Updated TypeScript definitions to include `commaAs` option
- Enhanced documentation with comma interpretation examples
- Updated supported currencies list to include BDT

### Examples
```javascript
// BDT Currency
toCurrency(10580.75, { currency: 'BDT' });
// "Ten Thousand Five Hundred Eighty Taka and Seventy-Five Paisa"

// Comma as thousands separator (default)
number2word('10,580');  // "Ten Thousand Five Hundred Eighty"

// Comma as decimal point (European format)
number2word('10,58', { commaAs: 'decimal' });  // "Ten Point Five Eight"
```

## [2.0.0] - 2024-11-10

### Added
- **Decimal number support**: Convert decimal/floating-point numbers to words
- **Currency formatting**: New `toCurrency()` function with support for:
  - USD (Dollar/Cents)
  - GBP (Pound/Pence)
  - EUR (Euro/Cents)
  - INR (Rupee/Paise)
  - JPY (Yen/Sen)
  - Custom currency units
- **Ordinal numbers**: New `toOrdinal()` function to convert numbers to ordinals (First, Second, Third, etc.)
- **Configuration options**:
  - `capitalizeFirst`: Control capitalization of the output
  - `useAnd`: Use 'and' in compound numbers (e.g., "One Hundred and One")
- **TypeScript support**: Complete TypeScript type definitions (.d.ts file)
- **Comprehensive test suite**: 38 test cases covering all functionality using Jest
- **Development tools**:
  - ESLint configuration for code quality
  - Prettier configuration for code formatting
  - Jest configuration for testing
- **Documentation**:
  - Comprehensive README with examples
  - Usage examples file
  - API documentation
  - LICENSE file
  - This CHANGELOG
- **Better error handling**: Proper validation and error messages for invalid input

### Changed
- Refactored code structure with better organization and documentation
- Improved code readability with JSDoc comments
- Updated package.json with modern configuration
- Version bumped from 1.0.9 to 2.0.0 (major version due to breaking changes)
- Better handling of edge cases (empty strings, null, undefined)
- Improved negative number handling

### Fixed
- Bug with negative number conversion
- Edge case handling for zero values
- Input validation improvements
- String parsing with commas
- Leading zeros handling

### Security
- Added input validation to prevent invalid data processing
- Improved error handling to prevent crashes

## [1.0.9] - 2024-07-07

### Added
- Initial release
- Basic integer to English word conversion
- Support for numbers up to Decillion

[2.0.0]: https://github.com/ringkubd/number2word/compare/v1.0.9...v2.0.0
[1.0.9]: https://github.com/ringkubd/number2word/releases/tag/v1.0.9
