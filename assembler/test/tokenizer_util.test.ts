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

import Brillo8TokenizerUtil from '../src/tokenizer_util';

describe("Tokenizer utility test", ()=> {
    it("Whitespace Checks", ()=> {
        expect(Brillo8TokenizerUtil.isWhitespace(' ')).toBe(true);
        expect(Brillo8TokenizerUtil.isWhitespace('\t')).toBe(true);
        expect(Brillo8TokenizerUtil.isWhitespace('\n')).toBe(true);
        expect(Brillo8TokenizerUtil.isWhitespace('\r')).toBe(true);
    });

    it("Number Checks", ()=> {
        expect(Brillo8TokenizerUtil.isNumber('0')).toBe(true);
        expect(Brillo8TokenizerUtil.isNumber('9')).toBe(true);
    });

    it("Possible Instruction", ()=> {
        expect(Brillo8TokenizerUtil.isPossibleInstruction('a')).toBe(true);
        expect(Brillo8TokenizerUtil.isPossibleInstruction('A')).toBe(true);

        expect(Brillo8TokenizerUtil.isPossibleInstruction('z')).toBe(true);
        expect(Brillo8TokenizerUtil.isPossibleInstruction('Z')).toBe(true);
    });

});