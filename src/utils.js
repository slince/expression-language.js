
export default {
    isDigit: function(ch) {
        return /[0-9]/i.test(ch);
    },
    isIdentifierBegin: function(ch) {
        return /[a-z_]/i.test(ch);
    },
    isIdentifier: function(ch) {
        return /\w/i.test(ch);
    }
}