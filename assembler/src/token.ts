export enum Brillo8TokenType {
    INSTRUCTION,
    NUMBER
}

export interface Brillo8Token {
    image: string;
    column: number;
    line: number;
    type: Brillo8TokenType;
}