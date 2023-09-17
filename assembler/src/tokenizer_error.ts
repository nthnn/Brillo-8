export default class Brillo8TokenizerError {
    error: string = "";
    line: number = 0;
    column: number = 0;

    constructor(line: number, column: number, error: string) {
        this.line = line;
        this.column = column;
        this.error = error;
    }
}