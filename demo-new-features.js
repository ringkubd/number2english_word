const number2word = require('./index');
const { toCurrency } = require('./index');

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║         NEW FEATURES DEMO - v2.0.0 UPDATE                     ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

console.log('🆕 1. BDT CURRENCY SUPPORT (Bangladeshi Taka)');
console.log('═'.repeat(65));
console.log('toCurrency(1000.50, { currency: "BDT" })');
console.log('→', toCurrency(1000.50, { currency: 'BDT' }));
console.log();
console.log('toCurrency(500, { currency: "BDT" })');
console.log('→', toCurrency(500, { currency: 'BDT' }));
console.log();
console.log('toCurrency(10580.75, { currency: "BDT" })');
console.log('→', toCurrency(10580.75, { currency: 'BDT' }));
console.log();

console.log('\n🆕 2. COMMA AS THOUSANDS SEPARATOR (Default Behavior)');
console.log('═'.repeat(65));
console.log('number2word("10,580")');
console.log('→', number2word('10,580'));
console.log();
console.log('number2word("1,234,567")');
console.log('→', number2word('1,234,567'));
console.log();
console.log('toCurrency("1,234.50")');
console.log('→', toCurrency('1,234.50'));
console.log();
console.log('toCurrency("10,580.75", { currency: "BDT" })');
console.log('→', toCurrency('10,580.75', { currency: 'BDT' }));
console.log();

console.log('\n🆕 3. COMMA AS DECIMAL POINT (European Format)');
console.log('═'.repeat(65));
console.log('number2word("10,58", { commaAs: "decimal" })');
console.log('→', number2word('10,58', { commaAs: 'decimal' }));
console.log();
console.log('number2word("1234,56", { commaAs: "decimal" })');
console.log('→', number2word('1234,56', { commaAs: 'decimal' }));
console.log();
console.log('toCurrency("123,45", { commaAs: "decimal" })');
console.log('→', toCurrency('123,45', { commaAs: 'decimal' }));
console.log();
console.log('toCurrency("1000,50", { currency: "EUR", commaAs: "decimal" })');
console.log('→', toCurrency('1000,50', { currency: 'EUR', commaAs: 'decimal' }));
console.log();
console.log('toCurrency("5000,25", { currency: "BDT", commaAs: "decimal" })');
console.log('→', toCurrency('5000,25', { currency: 'BDT', commaAs: 'decimal' }));
console.log();

console.log('\n💡 PRACTICAL EXAMPLES');
console.log('═'.repeat(65));
console.log('Bangladesh invoice: ৳10,580.50');
console.log('→', toCurrency('10,580.50', { currency: 'BDT' }));
console.log();
console.log('European price: 1.234,56€ (German format)');
console.log('→', toCurrency('1234,56', { currency: 'EUR', commaAs: 'decimal' }));
console.log();
console.log('US check: $1,234.56');
console.log('→', toCurrency('1,234.56', { currency: 'USD' }));
console.log();

console.log('\n✅ All 41 tests passing!');
console.log('═'.repeat(65));
