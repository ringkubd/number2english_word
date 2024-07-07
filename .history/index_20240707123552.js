let lt20 = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen" ],
    tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety" ],
    scales = ["", "Thousand", "Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion" ],
    max = scales.length * 3;

function number2wordEnglish(val){
    let len;
    val = parseFloat(val);
    // special cases
    if (val[0] === "-") { return "Negative " + number2wordEnglish(val.slice(1)); }
    if (val === "0") { return "Zero"; }

    val = trim_zeros(val);
    len = val.length;

    // general cases
    if (len < max) { return convert_lt_max(val); }
    if (len >= max) { return convert_max(val); }
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
    let l = val.length;
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
    let rem, l;

    val = trim_zeros(val);
    l = val.length;

    if (l === 0) { return ""; }
    if (l < 3) { return convert_lt100(val); }
    if (l === 3) { //less than 1000
        rem = val.slice(1);
        if (rem) {
            return lt20[val[0]] + " Hundred " + convert_lt1000(rem);
        } else {
            return lt20[val[0]] + " Hundred";
        }
    }
}

function convert_lt100(val) {
    if (is_lt20(val)) { // less than 20
        return lt20[val];
    } else if (val[1] === "0") {
        return tens[val[0]];
    } else {
        return tens[val[0]] + "-" +  lt20[val[1]];
    }
}


function split_rl(str, n) {
    // takes a string 'str' and an integer 'n'. Splits 'str' into
    // groups of 'n' chars and returns the result as an array. Works
    // from right to left.
    if (str) {
        return Array.prototype.concat
            .apply(split_rl(str.slice(0, (-n)), n), [str.slice(-n)]);
    } else {
        return [];
    }
}

function with_scale(str, i) {
    let scale;
    if (str && i > (-1)) {
        scale = scales[i];
        if (scale !== undefined) {
            return str.trim() + " " + scale;
        } else {
            return number2wordEnglish(str.trim());
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
module.exports = number2wordEnglish;
