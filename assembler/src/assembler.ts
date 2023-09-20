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

import colors from '@colors/colors';
import fs from 'node:fs';
import os from 'node:os';
import process from 'node:process';
import Brillo8Tokenizer from './tokenizer';
import { Brillo8IOUtil } from './util';
import Brillo8Transpiler from './transpiler';
import Brillo8TokenizerError from './tokenizer_error';

function processFile(fileName: string): void {
    let contents: string = Brillo8IOUtil.readFile(fileName);
    console.log("  ‣ ".green + "Reading".blue + " input file.");

    let tokenizer: Brillo8Tokenizer = new Brillo8Tokenizer(contents);
    console.log("  ‣ ".green + "Starting".blue + " lexical parsing...");
    tokenizer.scan();

    if(tokenizer.errors.length != 0) {
        console.log("  ‣ ".green + "Errors".red + " encountered on lexical analysis:");
        tokenizer.errors.forEach((error: Brillo8TokenizerError)=> {
            console.log("    - " + error.error.red);
            console.log(("       [line " + error.line + ", column " + error.column + "]").grey);
        });

        console.log("  ‣ ".green + "Assembler task " + "aborted".red + ".");
        return;
    }
    console.log("  ‣ ".green + "Lexical analysis done!");

    let transpiler: Brillo8Transpiler = new Brillo8Transpiler(tokenizer.tokens);
    console.log("  ‣ ".green + "Transpiling assembly file...");

    let transpiled: string = transpiler.transpile();
    console.log("  ‣ ".green + "Done transpilation.");

    let outputFilename: string = fileName.substring(0, fileName.length - 4) + ".bin";
    console.log("  ‣ ".green + "Writing output to file: " + outputFilename.green);

    Brillo8IOUtil.writeFile(outputFilename, transpiled);
}

function main(): void {
    if(os.platform() != "win32")
        colors.enable();

    console.log("┌────────────────────────────────────────────────────────┐".cyan);
    console.log("│".cyan + "                   Brillo-8 Assembler".blue.bold + "                   │".cyan);
    console.log("│".cyan + "                    v0.0.1".yellow + " (Release)  ".brightYellow.italic + "                  │".cyan);

    let fileName: string = process.argv[2];
    if(fileName == undefined) {
        console.log("├────────────────────────────────────────────────────────┤".cyan);
        console.log("│".cyan + "  Usage:                                                " + "│".cyan);
        console.log("│    ".cyan + "b8asm <filename>".brightYellow + "   Convert assembly file to binary. ".italic + "│".cyan);
    }
    else if(!fs.existsSync(fileName)) {
        console.log("├────────────────────────────────────────────────────────┤".cyan);
        console.log("│  ".cyan + "Input file not found.".red + "                                 │".cyan);
    }
    console.log("└────────────────────────────────────────────────────────┘\n".cyan);

    if(fileName != undefined && fs.existsSync(fileName)) {
        console.log("  ‣ ".green + "Compiling ".blue + fileName.green);

        let start = process.hrtime();
        processFile(fileName);

        let ms: string = (process.hrtime(start)[1] / 1000000).toFixed(6);
        console.log("  ‣ ".green + "Ellapsed " + (ms + "ms").green);
        console.log("  ‣ ".green + "Done!");
        console.log();
    }
}

main();