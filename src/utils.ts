
export default {
    isDigit: function(ch: string): boolean {
        return /[0-9]/i.test(ch);
    },
    isLetter: function(ch: string): boolean {
        return /[a-z_]/i.test(ch);
    },
    isIdentifier: function(ch: string): boolean {
        return /\w/i.test(ch);
    }
}