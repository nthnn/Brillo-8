import fs from 'node:fs';

export default class IOUtil {
    static readFile(fileName: string): string {
        return fs.readFileSync(fileName, 'utf-8');
    }

    static writeFile(fileName: string, contents: string): void {
        fs.writeFileSync(fileName, contents);
    }
}