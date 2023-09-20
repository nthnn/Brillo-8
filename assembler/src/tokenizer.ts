/*
 * This file is part of the Brillo-8 assembler.
 * Copyright (c) 2023 Nathanne Isip
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

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
            type: Brillo8TokenType.NUMBER
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