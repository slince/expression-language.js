import Position from "./position";
import {Token, Tokens, TokenStream, TokenType} from "./token";
import Utils from "./utils"
import {SyntaxError} from "./errors";

export default class Lexer{
    private readonly source: string;
    private readonly end: number;
    private offset: number;
    private line: number;
    private column: number;

    constructor(source: string) {
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

    lex(): TokenStream{
        const tokens = new TokenStream();
        let token;
        while (!this.eof()) {
            // current char.
            const ch = this.current();
            // skip blank char.
            if (ch === ' ' || ch === "\n") {
                this.next();
                continue;
            }
            const position = this.position();
            switch (true) {
                case Utils.isDigit(ch):
                    token = new Token(TokenType.T_NUM, this.readNumber(), position);
                    break;
                case ch === '\'' || ch === '\"':
                    token = new Token(TokenType.T_STR, this.readString(ch), position);
                    break;
                case Utils.isLetter(ch):
                    token = new Token(TokenType.T_ID, this.readIdentifier(), position);
                    break;
                default:
                    token = this.lexPunctuation(position);
            }
            tokens.add(token);
        }
        tokens.add(new Token(TokenType.T_EOF, Tokens[TokenType.T_EOF], this.position()));
        return tokens;
    }

    private lexPunctuation(position: Position){
        let type, next;
        let ch = this.current()
        switch (ch) {
            case '=':
                type = TokenType.T_ASSIGN;
                next = this.look();
                if (next === '=') {
                    type = TokenType.T_EQ;
                    this.next();
                }
                break;

            case '!':
                type = TokenType.T_NOT;
                next = this.look();
                if (next === '=') {
                    type = TokenType.T_NEQ;
                    this.next();
                }
                break;
            case '<':
                type = TokenType.T_LT;
                next = this.look();
                if (next === '=') {
                    type = TokenType.T_LE;
                    this.next();
                }
                break;
            case '>':
                type = TokenType.T_GT;
                next = this.look();
                if (next === '=') {
                    type = TokenType.T_GE;
                    this.next();
                }
                break;
            case '&':
                type = TokenType.T_LEA;
                next = this.look();
                if (next === '&') {
                    type = TokenType.T_AND;
                    this.next();
                }
                break;

            case '+':
                type = TokenType.T_ADD;
                next = this.look();
                if (next === '+') {
                    type = TokenType.T_INC;
                    this.next();
                }
                break;
            case '-':
                type = TokenType.T_SUB;
                next = this.look();
                if (next === '-') {
                    type = TokenType.T_DEC;
                    this.next();
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
                throw new SyntaxError(`Unrecognized punctuation ${ch}`, position);
        }
        this.next();
        return new Token(type, Tokens[type], position);
    }

    private readNumber(): string{
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

    private readString(beginChar: string): string{
        this.next(); // skip first ' or "
        const buffer = this.readIf((ch)=>{
            return ch !== beginChar;
        });
        this.next(); // skip last ' or "
        return buffer;
    }

    private readIdentifier(): string{
        return this.readIf((ch)=>{
            return Utils.isIdentifier(ch);
        });
    }

    private readIf(predicate: Function): string{
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

    private next(): string{
        const ch = this.source.charAt(this.offset ++);
        if (ch === "\n") {
            this.line ++;
            this.column = 0;
        } else {
            this.column++;
        }
        return ch;
    }

    private look(): string{
        return this.source.charAt(this.offset + 1);
    }

    private current(): string{
        return this.source.charAt(this.offset);
    }

    private eof(): boolean{
        return this.current() === '';
    }

    private position(): Position{
        return new Position(this.offset, this.line, this.column);
    }
}