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

import { Brillo8Token, Brillo8TokenType } from "./token";
import { opcodeBinary, toBinary } from "./util";

export default class Brillo8Transpiler {
    private tokens: Array<Brillo8Token> = [];

    public constructor(tokens: Array<Brillo8Token>) {
        this.tokens = tokens;
    }

    public transpile(): string {
        let result: string = "";
        this.tokens.forEach((token)=> {
            switch(token.type) {
                case Brillo8TokenType.INSTRUCTION:
                    result += opcodeBinary(token.image) + " ";
                    break;
                default:
                    result += toBinary(token.image) + " ";
                    break;
            }
        });

        return (result.match(/.{1,36}/g)?.join("\n") as string).trim();
    }
}