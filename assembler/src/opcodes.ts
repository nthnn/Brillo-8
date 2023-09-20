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

export const Brillo8Opcodes: Map<string, string> =
    new Map<string, string>([
    ["PUSH",    "00000000"],
    ["POP",     "00000001"],
    ["ADD",     "00000010"],
    ["SUB",     "00000011"],
    ["MUL",     "00000100"],
    ["DIV",     "00000101"],
    ["REM",     "00000110"],
    ["POW",     "00000111"],
    ["AND",     "00001000"],
    ["OR",      "00001001"],
    ["SHL",     "00001010"],
    ["SHR",     "00001011"],
    ["LAND",    "00001100"],
    ["LOR",     "00001101"],
    ["LT",      "00001110"],
    ["LE",      "00001111"],
    ["GT",      "00010000"],
    ["GE",      "00010001"],
    ["EQ",      "00010010"],
    ["NEQ",     "00010011"],
    ["JMP",     "00010100"],
    ["IF",      "00010101"],
    ["ENDIF",   "00010110"],
    ["YIELD",   "00010111"],
    ["RESET",   "00011000"],
    ["HALT",    "00011001"],
    ["PMODE",   "00011010"],
    ["DREAD",   "00011011"],
    ["DWRITE",  "00011100"],
    ["AREAD",   "00011101"],
    ["AWRITE",  "00011110"],
    ["AREF",    "00011111"],
    ["PLSIN",   "00100000"],
    ["PLSINL",  "00100001"],
    ["LD",      "00100010"],
    ["ST",      "00100011"],
    ["DELAY",   "00100100"],
    ["DELAYMS", "00100101"],
    ["MILLIS",  "00100110"],
    ["MICROS",  "00100111"],
    ["SHFIN",   "00101000"],
    ["SHFOUT",  "00101001"],
    ["TONE",    "00101010"],
    ["NOTONE",  "00101011"],
    ["RND",     "00101100"],
    ["RNDS",    "00101101"],
    ["I2CB",    "00101110"],
    ["I2CE",    "00101111"],
    ["I2CREQ",  "00110000"],
    ["I2CA",    "00110001"],
    ["I2CR",    "00110010"],
    ["I2CW",    "00110011"],
    ["SPIB",    "00110100"],
    ["SPIBT",   "00110101"],
    ["SPIE",    "00110110"],
    ["SPIET",   "00110111"],
    ["SPIT",    "00111000"],
    ["SPIUI",   "00111001"],
    ["SSERB",   "00111010"],
    ["SSERE",   "00111011"],
    ["SSERA",   "00111100"],
    ["SSERR",   "00111101"],
    ["SSERW",   "00111110"],
    ["EOBC",    "00111111"],
]);