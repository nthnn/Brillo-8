export default class Brillo8TokenizerUtil {
    public static isWhitespace(char: string): boolean {
        return [" ", "\t", "\r", "\n"].includes(char);
    }

    public static isPossibleInstruction(char: string): boolean {
        return /^[a-zA-Z]+$/.test(char);
    }

    public static isNumber(char: string): boolean {
        return /^[0-9]+$/.test(char);
    }
}