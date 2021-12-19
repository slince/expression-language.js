import Position from "./position.js";
import {Token, TokenStream, TokenType} from "./token.js";
import Utils from "./utils.js"
import SyntaxError from "./errors.js";

class Lexer{

    constructor(source) {
        // original string
        this.source = source;
        this.end = this.source.length;
        if (this.end === 0) {
            throw new SyntaxError('The source code cannot be blank');
        }
        this.offset = 0;
        this.line = 1;
        this.column = 0;
    }

    lex(){
        const tokens = new TokenStream();
        let token;
        while (!this.eof()) {
            // current char.
            const ch = this.current();
            // skip blank char.
            if (ch === ' ' || ch === "\n") {
                this.offset ++;
                continue;
            }

            // the number.
            if (Utils.isDigit(ch)) {
                token = new Token(TokenType.T_NUM, this.readNumber(), this.position());
                tokens.add(token);
                continue;
            }

            // string.
            if (ch === '\'' || ch === '\"') {
                token = new Token(TokenType.T_STR, this.readString(ch), this.position());
                tokens.add(token);
                continue;
            }

            // the id.
            if (Utils.isIdentifierBegin(ch)) {
                token = new Token(TokenType.T_ID, this.readIdentifier(ch), this.position());
                tokens.add(token);
                continue;
            }

            // punctuation
            let type, next;
            switch (ch) {
                case '=':
                    type = TokenType.T_ASSIGN;
                    next = this.look();
                    if (next === '=') {
                        type = TokenType.T_EQ;
                        this.offset ++;
                    }
                    break;

                case '!':
                    type = TokenType.T_NOT;
                    next = this.look();
                    if (next === '=') {
                        type = TokenType.T_NEQ;
                        this.offset ++;
                    }
                    break;
                case '<':
                    type = TokenType.T_LT;
                    next = this.look();
                    if (next === '=') {
                        type = TokenType.T_LE;
                        this.offset ++;
                    }
                    break;
                case '>':
                    type = TokenType.T_GT;
                    next = this.look();
                    if (next === '=') {
                        type = TokenType.T_GE;
                        this.offset ++;
                    }
                    break;
                case '&':
                    type = TokenType.T_LEA;
                    next = this.look();
                    if (next === '&') {
                        type = TokenType.T_AND;
                        this.offset ++;
                    }
                    break;

                case '+':
                    type = TokenType.T_ADD;
                    next = this.look();
                    if (next === '+') {
                        type = TokenType.T_INC;
                        this.offset ++;
                    }
                    break;
                case '-':
                    type = TokenType.T_SUB;
                    next = this.look();
                    if (next === '-') {
                        type = TokenType.T_DEC;
                        this.offset ++;
                    }
                    break;
                case '*':
                    type = TokenType.T_MUL;
                    break;
                case '/':
                    type = TokenType.T_DIV;
                    break;
                case '%':
                    type = TokenType.T_MOD;
                    break;

                case '(':
                    type = TokenType.T_LPAREN;
                    break;
                case '[':
                    type = TokenType.T_LBRACKET;
                    break;
                case '{':
                    type = TokenType.T_LBRACE;
                    break;

                case ')':
                    type = TokenType.T_RPAREN;
                    break;
                case ']':
                    type = TokenType.T_RBRACKET;
                    break;
                case '}':
                    type = TokenType.T_RBRACE;
                    break;

                case ',':
                    type = TokenType.T_COMMA;
                    break;
                case ':':
                    type = TokenType.T_COLON;
                    break;
                case ';':
                    type = TokenType.T_SEMICOLON;
                    break;
                case '.':
                    type = TokenType.T_DOT;
                    break;
                case '?':
                    type = TokenType.T_QUESTION_MARK;
                    break;
                default:
                    throw new SyntaxError(`Unrecognized punctuation ${ch}`, this.position());
            }
            this.offset ++;
            token = new Token(type, null, this.position());
            tokens.add(token);
        }
        this.offset ++;
        tokens.add(new Token(TokenType.T_EOF, null, this.position()));
        return tokens;
    }

    readNumber(){
        let isFloat = false;
        return this.readIf((ch)=>{
            if (ch === ".") {
                if (isFloat) {
                    return false;
                }
                isFloat = true;
                return true;
            }
            return Utils.isDigit(ch);
        });
    }

    readString(beginChar){
        this.offset ++; // skip first ' or "
        const buffer = this.readIf((ch)=>{
            return ch !== beginChar;
        });
        this.offset ++; // skip last ' or "
        return buffer;
    }

    readIdentifier(){
        return this.readIf((ch)=>{
            return Utils.isIdentifier(ch);
        });
    }

    readIf(predicate){
        const buffer = [];
        while (!this.eof()) {
            const ch = this.next();
            if (predicate(ch)) {
                buffer.push(ch);
                continue;
            }
            this.offset --; // back one if the next is not matched.
            break;
        }
        return buffer.join('');
    }

    next() {
        const ch = this.source[this.offset ++];
        if (ch === "\n") {
            this.line ++;
            this.column = 0;
        } else {
            this.column++;
        }
        return ch;
    }

    look(){
        return this.source.charAt(this.offset + 1);
    }

    current(){
        return this.source.charAt(this.offset);
    }

    eof(){
        return this.current() === '';
    }

    position(){
        return new Position(this.offset, this.line, this.column);
    }
}

export default Lexer;