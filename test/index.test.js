const number2wordEnglish = require('../index');
const { toCurrency, toOrdinal } = require('../index');

describe('number2wordEnglish - Basic Integer Conversion', () => {
    test('converts single digit numbers', () => {
        expect(number2wordEnglish(0)).toBe('Zero');
        expect(number2wordEnglish(1)).toBe('One');
        expect(number2wordEnglish(5)).toBe('Five');
        expect(number2wordEnglish(9)).toBe('Nine');
    });

    test('converts numbers less than 20', () => {
        expect(number2wordEnglish(10)).toBe('Ten');
        expect(number2wordEnglish(11)).toBe('Eleven');
        expect(number2wordEnglish(15)).toBe('Fifteen');
        expect(number2wordEnglish(19)).toBe('Nineteen');
    });

    test('converts tens', () => {
        expect(number2wordEnglish(20)).toBe('Twenty');
        expect(number2wordEnglish(30)).toBe('Thirty');
        expect(number2wordEnglish(50)).toBe('Fifty');
        expect(number2wordEnglish(90)).toBe('Ninety');
    });

    test('converts compound numbers under 100', () => {
        expect(number2wordEnglish(21)).toBe('Twenty-One');
        expect(number2wordEnglish(45)).toBe('Forty-Five');
        expect(number2wordEnglish(99)).toBe('Ninety-Nine');
    });

    test('converts hundreds', () => {
        expect(number2wordEnglish(100)).toBe('One Hundred');
        expect(number2wordEnglish(200)).toBe('Two Hundred');
        expect(number2wordEnglish(500)).toBe('Five Hundred');
    });

    test('converts compound hundreds', () => {
        expect(number2wordEnglish(101)).toBe('One Hundred One');
        expect(number2wordEnglish(123)).toBe('One Hundred Twenty-Three');
        expect(number2wordEnglish(999)).toBe('Nine Hundred Ninety-Nine');
    });

    test('converts thousands', () => {
        expect(number2wordEnglish(1000)).toBe('One Thousand');
        expect(number2wordEnglish(5000)).toBe('Five Thousand');
        expect(number2wordEnglish(10000)).toBe('Ten Thousand');
    });

    test('converts complex numbers', () => {
        expect(number2wordEnglish(1234)).toBe('One Thousand Two Hundred Thirty-Four');
        expect(number2wordEnglish(12345)).toBe('Twelve Thousand Three Hundred Forty-Five');
        expect(number2wordEnglish(123456)).toBe('One Hundred Twenty-Three Thousand Four Hundred Fifty-Six');
    });

    test('converts millions', () => {
        expect(number2wordEnglish(1000000)).toBe('One Million');
        expect(number2wordEnglish(1234567)).toBe('One Million Two Hundred Thirty-Four Thousand Five Hundred Sixty-Seven');
    });

    test('converts billions', () => {
        expect(number2wordEnglish(1000000000)).toBe('One Billion');
        expect(number2wordEnglish(1234567890)).toBe('One Billion Two Hundred Thirty-Four Million Five Hundred Sixty-Seven Thousand Eight Hundred Ninety');
    });

    test('converts very large numbers', () => {
        expect(number2wordEnglish('1000000000000')).toBe('One Trillion');
        expect(number2wordEnglish('1000000000000000')).toBe('One Quadrillion');
    });
});

describe('number2wordEnglish - Negative Numbers', () => {
    test('converts negative numbers', () => {
        expect(number2wordEnglish(-1)).toBe('Negative One');
        expect(number2wordEnglish(-42)).toBe('Negative Forty-Two');
        expect(number2wordEnglish(-123)).toBe('Negative One Hundred Twenty-Three');
        expect(number2wordEnglish('-1000')).toBe('Negative One Thousand');
    });
});

describe('number2wordEnglish - Decimal Numbers', () => {
    test('converts decimal numbers', () => {
        expect(number2wordEnglish(1.5)).toBe('One Point Five');
        expect(number2wordEnglish(3.14)).toBe('Three Point One Four');
        expect(number2wordEnglish(123.456)).toBe('One Hundred Twenty-Three Point Four Five Six');
    });

    test('converts decimals with trailing zeros', () => {
        expect(number2wordEnglish('1.50')).toBe('One Point Five Zero');
        expect(number2wordEnglish('10.00')).toBe('Ten Point Zero Zero');
    });

    test('converts zero with decimals', () => {
        expect(number2wordEnglish('0.5')).toBe('Zero Point Five');
        expect(number2wordEnglish('0.123')).toBe('Zero Point One Two Three');
    });
});

describe('number2wordEnglish - String Input', () => {
    test('handles string input', () => {
        expect(number2wordEnglish('42')).toBe('Forty-Two');
        expect(number2wordEnglish('1000')).toBe('One Thousand');
    });

    test('handles strings with commas as thousands separator', () => {
        expect(number2wordEnglish('1,234')).toBe('One Thousand Two Hundred Thirty-Four');
        expect(number2wordEnglish('1,234,567')).toBe('One Million Two Hundred Thirty-Four Thousand Five Hundred Sixty-Seven');
        expect(number2wordEnglish('10,580')).toBe('Ten Thousand Five Hundred Eighty');
    });

    test('handles strings with commas as decimal point', () => {
        expect(number2wordEnglish('1,5', { commaAs: 'decimal' })).toBe('One Point Five');
        expect(number2wordEnglish('123,456', { commaAs: 'decimal' })).toBe('One Hundred Twenty-Three Point Four Five Six');
        expect(number2wordEnglish('10,58', { commaAs: 'decimal' })).toBe('Ten Point Five Eight');
    });
});

describe('number2wordEnglish - Options', () => {
    test('capitalizeFirst option', () => {
        expect(number2wordEnglish(42, { capitalizeFirst: false })).toBe('forty-two');
        expect(number2wordEnglish(123, { capitalizeFirst: false })).toBe('one hundred twenty-three');
    });

    test('useAnd option', () => {
        expect(number2wordEnglish(101, { useAnd: true })).toBe('One Hundred and One');
        expect(number2wordEnglish(523, { useAnd: true })).toBe('Five Hundred and Twenty-Three');
    });
});

describe('number2wordEnglish - Edge Cases', () => {
    test('handles empty string', () => {
        expect(number2wordEnglish('')).toBe('Zero');
    });

    test('handles leading zeros', () => {
        expect(number2wordEnglish('0042')).toBe('Forty-Two');
        expect(number2wordEnglish('00100')).toBe('One Hundred');
    });

    test('throws error for invalid input', () => {
        expect(() => number2wordEnglish('abc')).toThrow('Invalid number');
        expect(() => number2wordEnglish('12a34')).toThrow('Invalid number');
    });
});

describe('toCurrency', () => {
    test('converts basic currency amounts', () => {
        expect(toCurrency(0)).toBe('Zero Taka');
        expect(toCurrency(1)).toBe('One Taka');
        expect(toCurrency(5)).toBe('Five Taka');
        expect(toCurrency(100)).toBe('One Hundred Taka');
    });

    test('converts amounts with cents', () => {
        expect(toCurrency(1.50)).toBe('One Taka and Fifty Paisa');
        expect(toCurrency(0.01)).toBe('Zero Taka and One Paisa');
        expect(toCurrency(123.45)).toBe('One Hundred Twenty-Three Taka and Forty-Five Paisa');
    });

    test('handles different currencies', () => {
        expect(toCurrency(1.50, { currency: 'GBP' })).toBe('One Pound and Fifty Pence');
        expect(toCurrency(100.99, { currency: 'EUR' })).toBe('One Hundred Euros and Ninety-Nine Cents');
        expect(toCurrency(500.50, { currency: 'INR' })).toBe('Five Hundred Rupees and Fifty Paise');
        expect(toCurrency(750.25, { currency: 'BDT' })).toBe('Seven Hundred Fifty Taka and Twenty-Five Paisa');
    });

    test('handles custom currency units', () => {
        expect(toCurrency(42, {
            majorUnit: 'Credit',
            majorUnitPlural: 'Credits',
            minorUnit: 'Point',
            minorUnitPlural: 'Points'
        })).toBe('Forty-Two Credits');
    });

    test('handles negative currency amounts', () => {
        expect(toCurrency(-25.50)).toBe('Negative Twenty-Five Taka and Fifty Paisa');
    });

    test('handles zero cents', () => {
        expect(toCurrency(100.00)).toBe('One Hundred Taka');
        expect(toCurrency('50')).toBe('Fifty Taka');
    });

    test('handles currency with comma as thousands separator', () => {
        expect(toCurrency('1,234.50')).toBe('One Thousand Two Hundred Thirty-Four Taka and Fifty Paisa');
        expect(toCurrency('10,580.75', { currency: 'BDT' })).toBe('Ten Thousand Five Hundred Eighty Taka and Seventy-Five Paisa');
    });

    test('handles currency with comma as decimal point', () => {
        expect(toCurrency('123,45', { commaAs: 'decimal' })).toBe('One Hundred Twenty-Three Taka and Forty-Five Paisa');
        expect(toCurrency('1000,50', { currency: 'EUR', commaAs: 'decimal' })).toBe('One Thousand Euros and Fifty Cents');
    });
});

describe('toOrdinal', () => {
    test('converts basic ordinal numbers', () => {
        expect(toOrdinal(1)).toBe('First');
        expect(toOrdinal(2)).toBe('Second');
        expect(toOrdinal(3)).toBe('Third');
        expect(toOrdinal(4)).toBe('Fourth');
        expect(toOrdinal(5)).toBe('Fifth');
    });

    test('converts teens to ordinals', () => {
        expect(toOrdinal(11)).toBe('Eleventh');
        expect(toOrdinal(12)).toBe('Twelfth');
        expect(toOrdinal(13)).toBe('Thirteenth');
    });

    test('converts tens to ordinals', () => {
        expect(toOrdinal(20)).toBe('Twentieth');
        expect(toOrdinal(30)).toBe('Thirtieth');
        expect(toOrdinal(40)).toBe('Fortieth');
        expect(toOrdinal(50)).toBe('Fiftieth');
    });

    test('converts compound ordinals', () => {
        expect(toOrdinal(21)).toBe('Twenty-First');
        expect(toOrdinal(42)).toBe('Forty-Second');
        expect(toOrdinal(99)).toBe('Ninety-Ninth');
    });

    test('converts large ordinals', () => {
        expect(toOrdinal(100)).toBe('One Hundredth');
        expect(toOrdinal(1000)).toBe('One Thousandth');
        expect(toOrdinal(1000000)).toBe('One Millionth');
    });

    test('converts complex ordinals', () => {
        expect(toOrdinal(123)).toBe('One Hundred Twenty-Third');
        expect(toOrdinal(1001)).toBe('One Thousand First');
    });

    test('handles zero and negative ordinals', () => {
        expect(toOrdinal(0)).toBe('Zeroth');
        expect(toOrdinal(-5)).toBe('Negative Fifth');
    });

    test('throws error for invalid input', () => {
        expect(() => toOrdinal('abc')).toThrow('Invalid number');
    });
});

describe('Module Exports', () => {
    test('exports all required functions', () => {
        expect(typeof number2wordEnglish).toBe('function');
        expect(typeof toCurrency).toBe('function');
        expect(typeof toOrdinal).toBe('function');
        expect(typeof number2wordEnglish.toWords).toBe('function');
    });

    test('toWords is an alias for main function', () => {
        expect(number2wordEnglish.toWords(42)).toBe(number2wordEnglish(42));
    });
});
