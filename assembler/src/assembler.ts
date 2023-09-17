import colors from '@colors/colors';
import fs from 'node:fs';
import os from 'node:os';
import process from 'node:process';
import Brillo8Tokenizer from './tokenizer';
import { Brillo8IOUtil } from './util';

function processFile(fileName: string): void {
    let tokenizer: Brillo8Tokenizer = new Brillo8Tokenizer(
        Brillo8IOUtil.readFile(fileName)
    );

    tokenizer.scan();
}

function main(): void {
    if(os.platform() != "win32")
        colors.enable();

    console.log("┌────────────────────────────────────────────────────────┐".cyan);
    console.log("│".cyan + "                   Brillo-8 Assembler".blue.bold + "                   │".cyan);
    console.log("│".cyan + "                    v0.0.1".yellow + " (Release)  ".brightYellow.italic + "                  │".cyan);
    console.log("├────────────────────────────────────────────────────────┤".cyan);

    let fileName: string = process.argv[2];
    if(fileName == undefined) {
        console.log("│".cyan + "  Usage:                                                " + "│".cyan);
        console.log("│    ".cyan + "b8asm <filename>".brightYellow + "   Convert assembly file to binary. ".italic + "│".cyan);
    }
    else if(!fs.existsSync(fileName))
        console.log("│  ".cyan + "Input file not found.".red + "                                 │".cyan);
    else console.log("│  ".cyan + "Compiling input file...                               " + "│".cyan);

    console.log("└────────────────────────────────────────────────────────┘".cyan);
    console.log();

    if(fileName != undefined && fs.existsSync(fileName)) {
        console.log("  ‣ ".green + "Compiling " + fileName.green);

        let start = process.hrtime();
        processFile(fileName);

        let ms: string = (process.hrtime(start)[1] / 1000000).toFixed(6);
        console.log("  ‣ ".green + "Ellapsed " + (ms + "ms").green);
        console.log("  ‣ ".green + "Done!");
        console.log();
    }
}

main();