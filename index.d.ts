/**
 * Type definitions for number2english_word
 */

export interface ConversionOptions {
    /**
     * Capitalize the first letter of the result
     * @default true
     */
    capitalizeFirst?: boolean;
    
    /**
     * Use 'and' in compound numbers (e.g., "One Hundred and Twenty-Three")
     * @default false
     */
    useAnd?: boolean;
    
    /**
     * Interpret comma as 'thousands' separator or 'decimal' point
     * @default 'thousands'
     */
    commaAs?: 'thousands' | 'decimal';
}

export interface CurrencyOptions {
    /**
     * Currency code (USD, GBP, EUR, INR, JPY, BDT)
     * @default 'BDT'
     */
    currency?: 'USD' | 'GBP' | 'EUR' | 'INR' | 'JPY' | 'BDT' | string;
    
    /**
     * Name of the major currency unit
     * @default 'Dollar'
     */
    majorUnit?: string;
    
    /**
     * Name of the minor currency unit
     * @default 'Cent'
     */
    minorUnit?: string;
    
    /**
     * Plural form of the major currency unit
     * @default 'Dollars'
     */
    majorUnitPlural?: string;
    
    /**
     * Plural form of the minor currency unit
     * @default 'Cents'
     */
    minorUnitPlural?: string;
    
    /**
     * Interpret comma as 'thousands' separator or 'decimal' point
     * @default 'thousands'
     */
    commaAs?: 'thousands' | 'decimal';
}

/**
 * Convert a number to English words
 * @param val - The number to convert (supports integers and decimals)
 * @param options - Configuration options
 * @returns The number in English words
 * @example
 * number2wordEnglish(123); // "One Hundred Twenty-Three"
 * number2wordEnglish(123.45); // "One Hundred Twenty-Three Point Four Five"
 * number2wordEnglish(-42); // "Negative Forty-Two"
 */
declare function number2wordEnglish(
    val: string | number,
    options?: ConversionOptions
): string;

/**
 * Convert a number to currency format
 * @param val - The amount to convert
 * @param options - Currency configuration options
 * @returns The currency amount in words
 * @example
 * toCurrency(123.45); // "One Hundred Twenty-Three Dollars and Forty-Five Cents"
 * toCurrency(1.50, { currency: 'GBP' }); // "One Pound and Fifty Pence"
 */
export declare function toCurrency(
    val: string | number,
    options?: CurrencyOptions
): string;

/**
 * Convert a number to ordinal words
 * @param val - The number to convert
 * @returns The ordinal number in words
 * @example
 * toOrdinal(1); // "First"
 * toOrdinal(23); // "Twenty-Third"
 * toOrdinal(100); // "One Hundredth"
 */
export declare function toOrdinal(val: string | number): string;

/**
 * Alias for the main conversion function
 */
export declare const toWords: typeof number2wordEnglish;

export default number2wordEnglish;
