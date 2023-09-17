import { Brillo8Opcodes } from "./opcodes";
import { Brillo8Token, Brillo8TokenType } from "./token";
import Brillo8TokenizerError from "./tokenizer_error";
import Brillo8TokenizerUtil from "./tokenizer_util";

export default class Brillo8Tokenizer {
    private source: string = "";

    private idx: number = 0;
    private col: number = 0;
    private line: number = 1;

    tokens: Array<Brillo8Token> = [];
    errors: Array<Brillo8TokenizerError> = [];

    constructor(source: string) {
        this.source = source;
    }

    private isAtEnd(): boolean {
        return this.idx == this.source.length;
    }

    private advance(): void {
        if(this.peek() == "\n") {
            this.line++;
            this.col = 0;
        }
        else this.col++;

        this.idx++;
    }

    private consume(): string {
        let char: string = this.peek();
        this.advance();

        return char;
    }

    private peek(): string {
        return this.source[this.idx];
    }

    private scanPossibleInstruction(): void {
        let column: number = this.col;
        let image: string = this.consume();

        while(!this.isAtEnd() && Brillo8TokenizerUtil.isPossibleInstruction(this.peek()))
            image += this.consume();

        if(Brillo8Opcodes.has(image))
            this.tokens.push({
                image: image,
                column: column,
                line: this.line,
                type: Brillo8TokenType.INSTRUCTION
            });
        else this.errors.push(new Brillo8TokenizerError(
            this.line, column,
            "No matching instruction with keyword: " + image
        ));
    }

    private scanDigits(): void {
        let column: number = this.col;
        let image: string = this.consume();

        while(!this.isAtEnd() && Brillo8TokenizerUtil.isNumber(this.peek()))
            image += this.consume();

        this.tokens.push({
            image: image,
            column: column,
            line: this.line,
            type: Brillo8TokenType.INSTRUCTION
        });

        let asInt: number = parseInt(image);
        if(asInt < 0 || asInt > 255)
            this.errors.push(new Brillo8TokenizerError(
                this.line, column,
                "Numbers must be between the range 0 and 255, encountered '" + image + "'."
            ));
    }

    private skipWhitespace(): void {
        while(!this.isAtEnd() && Brillo8TokenizerUtil.isWhitespace(this.peek()))
            this.advance();
    }

    private skipComments(): void {
        this.advance();
 
        while(!this.isAtEnd() && this.peek() != '\n')
            this.advance();
    }

    public scan(): void {
        while(!this.isAtEnd()) {
            if(Brillo8TokenizerUtil.isPossibleInstruction(this.peek()))
                this.scanPossibleInstruction();
            else if(Brillo8TokenizerUtil.isNumber(this.peek()))
                this.scanDigits();
            else if(this.peek() == ';')
                this.skipComments();

            this.skipWhitespace();
        }
    }
}