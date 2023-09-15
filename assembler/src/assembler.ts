import colors from '@colors/colors';
import fs from 'fs';
import process from 'process';

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

    console.log("└────────────────────────────────────────────────────────┘".cyan);
    console.log();
}

main();