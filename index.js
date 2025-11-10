/**
 * number2english_word - Convert numbers to English words
 * Supports integers, decimals, and currency formatting
 */

const lt20 = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
    "Eighteen", "Nineteen"
];

const tens = [
    "", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
];

const scales = [
    "", "Thousand", "Million", "Billion", "Trillion", "Quadrillion", "Quintillion",
    "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion"
];

const max = scales.length * 3;

/**
 * Main function to convert a number to English words
 * @param {string|number} val - The number to convert
 * @param {Object} options - Configuration options
 * @param {boolean} options.capitalizeFirst - Capitalize the first letter (default: true)
 * @param {boolean} options.useAnd - Use 'and' in compound numbers (default: false)
 * @param {string} options.commaAs - Interpret comma as 'thousands' separator or 'decimal' point (default: 'thousands')
 * @returns {string} The number in English words
 */
function number2wordEnglish(val = "", options = {}) {
    const { capitalizeFirst = true, useAnd = false, commaAs = 'thousands' } = options;
    
    // Store options in context for nested calls
    number2wordEnglish._options = { capitalizeFirst, useAnd, commaAs };
    
    // Handle null, undefined, or empty string
    if (val === null || val === undefined || val === "") {
        return "Zero";
    }

    // Convert to string and clean up based on comma interpretation
    let valStr = val.toString().trim();
    
    // Handle comma interpretation
    if (commaAs === 'decimal') {
        // Replace comma with period for decimal interpretation
        valStr = valStr.replace(/,/g, '.');
    } else {
        // Remove commas (thousands separator - default behavior)
        valStr = valStr.replaceAll(",", "");
    }
    
    // Handle negative numbers
    if (valStr[0] === "-") {
        const result = "Negative " + number2wordEnglish(valStr.slice(1), { capitalizeFirst: true, useAnd });
        return capitalizeFirst ? result : result.toLowerCase();
    }

    // Handle decimal numbers
    if (valStr.includes(".")) {
        return convertDecimal(valStr, options);
    }

    // Check if string contains only valid number characters
    if (!/^-?\d*\.?\d+$/.test(valStr)) {
        throw new Error(`Invalid number: ${val}`);
    }
    
    // Parse as float to handle scientific notation
    const numVal = parseFloat(valStr);
    
    // Check if it's a valid number
    if (isNaN(numVal)) {
        throw new Error(`Invalid number: ${val}`);
    }

    // Handle zero
    if (numVal === 0 || valStr === "0") {
        return capitalizeFirst ? "Zero" : "zero";
    }

    const cleanVal = trim_zeros(valStr);
    const len = cleanVal.length;

    // Convert based on length
    let result;
    if (len < max) {
        result = convert_lt_max(cleanVal);
    } else {
        result = convert_max(cleanVal);
    }

    return capitalizeFirst ? result : result.toLowerCase();
}

/**
 * Convert decimal numbers to words
 * @param {string} val - The decimal number as a string
 * @param {Object} options - Configuration options
 * @returns {string} The decimal number in words
 */
function convertDecimal(val, options = {}) {
    const { capitalizeFirst = true } = options;
    const parts = val.split(".");
    const integerPart = parts[0] || "0";
    const decimalPart = parts[1] || "";

    let result = number2wordEnglish(integerPart, { ...options, capitalizeFirst: true });
    
    if (decimalPart) {
        result += " Point";
        // Convert each decimal digit individually
        for (let i = 0; i < decimalPart.length; i++) {
            result += " " + (lt20[parseInt(decimalPart[i])] || "Zero");
        }
    }

    return capitalizeFirst ? capitalizeFirstLetter(result) : result;
}

/**
 * Convert number to currency format
 * @param {string|number} val - The number to convert
 * @param {Object} options - Configuration options
 * @param {string} options.currency - Currency type ('USD', 'GBP', 'EUR', 'INR', 'JPY', 'BDT', etc.)
 * @param {string} options.majorUnit - Name of major unit (default: 'Dollar')
 * @param {string} options.minorUnit - Name of minor unit (default: 'Cent')
 * @param {string} options.majorUnitPlural - Plural form of major unit (default: 'Dollars')
 * @param {string} options.minorUnitPlural - Plural form of minor unit (default: 'Cents')
 * @param {string} options.commaAs - Interpret comma as 'thousands' separator or 'decimal' point (default: 'thousands')
 * @returns {string} The currency amount in words
 */
function toCurrency(val, options = {}) {
    const {
        currency = 'BDT',
        majorUnit = 'Dollar',
        minorUnit = 'Cent',
        majorUnitPlural = 'Dollars',
        minorUnitPlural = 'Cents',
        commaAs = 'thousands'
    } = options;

    // Predefined currency configurations
    const currencies = {
        'USD': { major: 'Dollar', majorPlural: 'Dollars', minor: 'Cent', minorPlural: 'Cents' },
        'GBP': { major: 'Pound', majorPlural: 'Pounds', minor: 'Pence', minorPlural: 'Pence' },
        'EUR': { major: 'Euro', majorPlural: 'Euros', minor: 'Cent', minorPlural: 'Cents' },
        'INR': { major: 'Rupee', majorPlural: 'Rupees', minor: 'Paisa', minorPlural: 'Paise' },
        'JPY': { major: 'Yen', majorPlural: 'Yen', minor: 'Sen', minorPlural: 'Sen' },
        'BDT': { major: 'Taka', majorPlural: 'Taka', minor: 'Paisa', minorPlural: 'Paisa' }
    };

    // If custom units are provided, use them; otherwise use currency config
    const currencyConfig = (majorUnit !== 'Dollar' || minorUnit !== 'Cent') ? {
        major: majorUnit,
        majorPlural: majorUnitPlural,
        minor: minorUnit,
        minorPlural: minorUnitPlural
    } : (currencies[currency.toUpperCase()] || {
        major: majorUnit,
        majorPlural: majorUnitPlural,
        minor: minorUnit,
        minorPlural: minorUnitPlural
    });

    let valStr = val.toString().trim();
    
    // Handle comma interpretation for currency
    if (commaAs === 'decimal') {
        // Replace comma with period for decimal interpretation
        valStr = valStr.replace(/,/g, '.');
    } else {
        // Remove commas (thousands separator - default behavior)
        valStr = valStr.replaceAll(",", "");
    }
    
    const isNegative = valStr[0] === "-";
    const absVal = isNegative ? valStr.slice(1) : valStr;
    
    const parts = absVal.split(".");
    const dollars = parseInt(parts[0]) || 0;
    const cents = parts[1] ? parseInt(parts[1].padEnd(2, '0').slice(0, 2)) : 0;

    let result = "";
    
    if (isNegative) {
        result += "Negative ";
    }

    // Major unit
    if (dollars === 0) {
        result += "Zero";
    } else {
        result += number2wordEnglish(dollars, { capitalizeFirst: true });
    }
    
    result += " " + (dollars === 1 ? currencyConfig.major : currencyConfig.majorPlural);

    // Minor unit
    if (cents > 0) {
        result += " and " + number2wordEnglish(cents, { capitalizeFirst: true });
        result += " " + (cents === 1 ? currencyConfig.minor : currencyConfig.minorPlural);
    }

    return capitalizeFirstLetter(result);
}

/**
 * Convert number to ordinal words (First, Second, Third, etc.)
 * @param {string|number} val - The number to convert
 * @returns {string} The ordinal number in words
 */
function toOrdinal(val) {
    const num = parseInt(val);
    
    if (isNaN(num)) {
        throw new Error(`Invalid number: ${val}`);
    }

    if (num === 0) return "Zeroth";

    const words = number2wordEnglish(Math.abs(num), { capitalizeFirst: true });
    
    // Convert last word to ordinal
    const ordinalMap = {
        "One": "First", "Two": "Second", "Three": "Third", "Four": "Fourth",
        "Five": "Fifth", "Six": "Sixth", "Seven": "Seventh", "Eight": "Eighth",
        "Nine": "Ninth", "Ten": "Tenth", "Eleven": "Eleventh", "Twelve": "Twelfth",
        "Thirteen": "Thirteenth", "Fourteen": "Fourteenth", "Fifteen": "Fifteenth",
        "Sixteen": "Sixteenth", "Seventeen": "Seventeenth", "Eighteen": "Eighteenth",
        "Nineteen": "Nineteenth", "Twenty": "Twentieth", "Thirty": "Thirtieth",
        "Forty": "Fortieth", "Fifty": "Fiftieth", "Sixty": "Sixtieth",
        "Seventy": "Seventieth", "Eighty": "Eightieth", "Ninety": "Ninetieth",
        "Hundred": "Hundredth", "Thousand": "Thousandth", "Million": "Millionth",
        "Billion": "Billionth", "Trillion": "Trillionth"
    };

    // Handle compound numbers with hyphens (e.g., Twenty-One)
    const parts = words.split(/\s+/);
    const lastPart = parts[parts.length - 1];
    
    if (lastPart.includes('-')) {
        const hyphenParts = lastPart.split('-');
        const lastHyphenWord = hyphenParts[hyphenParts.length - 1];
        if (ordinalMap[lastHyphenWord]) {
            hyphenParts[hyphenParts.length - 1] = ordinalMap[lastHyphenWord];
        } else {
            hyphenParts[hyphenParts.length - 1] = lastHyphenWord + 'th';
        }
        parts[parts.length - 1] = hyphenParts.join('-');
    } else if (ordinalMap[lastPart]) {
        parts[parts.length - 1] = ordinalMap[lastPart];
    } else if (lastPart.endsWith("y")) {
        parts[parts.length - 1] = lastPart.slice(0, -1) + "ieth";
    } else {
        parts[parts.length - 1] = lastPart + "th";
    }

    return (num < 0 ? "Negative " : "") + parts.join(" ");
}

function convert_max(val) {
    return split_rl(val, max)
        .map(function (val, i, arr) {
            if (i < arr.length - 1) {
                return convert_lt_max(val) + " " + scales.slice(-1);
            }
            return convert_lt_max(val);
        })
        .join(" ");
}

function convert_lt_max(val) {
    const l = val.length;
    if (l < 4) {
        return convert_lt1000(val).trim();
    } else {
        return split_rl(val, 3)
            .map(convert_lt1000)
            .reverse()
            .map(with_scale)
            .reverse()
            .join(" ")
            .trim();
    }
}

function convert_lt1000(val) {
    val = trim_zeros(val);
    const l = val.length;

    if (l === 0) return "";
    if (l < 3) return convert_lt100(val);
    if (l === 3) {
        const rem = val.slice(1);
        const useAnd = number2wordEnglish._options?.useAnd;
        const connector = useAnd && rem !== "00" ? " and " : " ";
        
        if (rem && trim_zeros(rem)) {
            return lt20[val[0]] + " Hundred" + connector + convert_lt1000(rem);
        } else {
            return lt20[val[0]] + " Hundred";
        }
    }
}

function convert_lt100(val) {
    if (is_lt20(val)) {
        return lt20[parseInt(val, 10)];
    } else if (val[1] === "0") {
        return tens[val[0]];
    } else {
        return tens[val[0]] + "-" + lt20[val[1]];
    }
}

function split_rl(str, n) {
    // takes a string 'str' and an integer 'n'. Splits 'str' into
    // groups of 'n' chars and returns the result as an array. Works
    // from right to left.
    if (str) {
        return Array.prototype.concat
            .apply(split_rl(str.slice(0, -n), n), [str.slice(-n)]);
    } else {
        return [];
    }
}

function with_scale(str, i) {
    if (str && i > -1) {
        const scale = scales[i];
        if (scale !== undefined) {
            return str.trim() + " " + scale;
        } else {
            return number2wordEnglish(str.trim(), { capitalizeFirst: false });
        }
    } else {
        return "";
    }
}

function trim_zeros(val) {
    return val.toString().replace(/^0*/, "");
}

function is_lt20(val) {
    return parseInt(val, 10) < 20;
}

function capitalizeFirstLetter(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Export main function and additional utilities
module.exports = number2wordEnglish;
module.exports.toWords = number2wordEnglish;
module.exports.toCurrency = toCurrency;
module.exports.toOrdinal = toOrdinal;

