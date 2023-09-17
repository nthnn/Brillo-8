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