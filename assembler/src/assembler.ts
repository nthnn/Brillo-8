import colors from '@colors/colors';
import fs from 'node:fs';
import process from 'node:process';

function processFile(fileName: string): void { }

function main(): void {
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