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

import fs from 'node:fs';
import { Brillo8Opcodes } from './opcodes';

export class Brillo8IOUtil {
    public static readFile(fileName: string): string {
        return fs.readFileSync(fileName, 'utf-8');
    }

    public static writeFile(fileName: string, contents: string): void {
        fs.writeFileSync(fileName, contents);
    }
}

export function opcodeBinary(opcode: string): string {
    return Brillo8Opcodes.get(opcode) as string;
}

export function toBinary(num: string): string {
    let dec: number = parseInt(num);
    if(dec == 0)
        return "00000000";

    let binResult: string = "";
    while(dec > 0) {
        binResult = (dec % 2) + binResult;
        dec = Math.floor(dec / 2);
    }

    while(binResult.length < 8)
        binResult = "0" + binResult;

    return binResult;
}