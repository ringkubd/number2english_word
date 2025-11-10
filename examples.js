const number2word = require('./index');
const { toCurrency, toOrdinal } = require('./index');

console.log('=== Basic Number Conversion Examples ===\n');

console.log('number2word(42):', number2word(42));
console.log('number2word(123):', number2word(123));
console.log('number2word(1234):', number2word(1234));
console.log('number2word(1000000):', number2word(1000000));
console.log('number2word("1,234,567"):', number2word('1,234,567'));

console.log('\n=== Decimal Numbers ===\n');

console.log('number2word(3.14):', number2word(3.14));
console.log('number2word(123.456):', number2word(123.456));

console.log('\n=== Negative Numbers ===\n');

console.log('number2word(-42):', number2word(-42));
console.log('number2word(-123.45):', number2word(-123.45));

console.log('\n=== With Options ===\n');

console.log('number2word(42, { capitalizeFirst: false }):', number2word(42, { capitalizeFirst: false }));
console.log('number2word(101, { useAnd: true }):', number2word(101, { useAnd: true }));

console.log('=== Currency Formatting ===\n');

console.log('toCurrency(123.45):', toCurrency(123.45));
console.log('toCurrency(1):', toCurrency(1));
console.log('toCurrency(0.01):', toCurrency(0.01));
console.log('toCurrency(100.50, { currency: "GBP" }):', toCurrency(100.50, { currency: 'GBP' }));
console.log('toCurrency(250.75, { currency: "EUR" }):', toCurrency(250.75, { currency: 'EUR' }));
console.log('toCurrency(500.25, { currency: "INR" }):', toCurrency(500.25, { currency: 'INR' }));
console.log('toCurrency(1000.50, { currency: "BDT" }):', toCurrency(1000.50, { currency: 'BDT' }));

console.log('\n=== Comma Handling ===\n');

console.log('number2word("10,580") [comma as thousands]:', number2word('10,580'));
console.log('number2word("10,58", { commaAs: "decimal" }) [comma as decimal]:', number2word('10,58', { commaAs: 'decimal' }));
console.log('toCurrency("1,234.50") [default]:', toCurrency('1,234.50'));
console.log('toCurrency("1234,50", { commaAs: "decimal" }) [European]:', toCurrency('1234,50', { commaAs: 'decimal' }));
console.log('toCurrency("10,580.75", { currency: "BDT" }):', toCurrency('10,580.75', { currency: 'BDT' }));

console.log('\n=== Ordinal Numbers ===\n');

console.log('toOrdinal(1):', toOrdinal(1));
console.log('toOrdinal(2):', toOrdinal(2));
console.log('toOrdinal(3):', toOrdinal(3));
console.log('toOrdinal(21):', toOrdinal(21));
console.log('toOrdinal(100):', toOrdinal(100));
console.log('toOrdinal(123):', toOrdinal(123));

console.log('\n=== Real-world Examples ===\n');

const checkAmount = toCurrency(1250.50);
console.log(`Check Amount: ${checkAmount}`);

const position = toOrdinal(3);
console.log(`You finished in ${position} place!`);

const total = 5432.10;
console.log(`Invoice Total: ${toCurrency(total, { currency: 'EUR' })}`);
