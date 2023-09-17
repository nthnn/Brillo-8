import { Brillo8Token, Brillo8TokenType } from "./token";
import { opcodeBinary, toBinary } from "./util";

export default class Brillo8Transpiler {
    private tokens: Array<Brillo8Token> = [];

    public constructor(tokens: Array<Brillo8Token>) {
        this.tokens = tokens;
    }

    public transpile(): string {
        let result: string = "";
        this.tokens.forEach((token)=> {
            switch(token.type) {
                case Brillo8TokenType.INSTRUCTION:
                    result += opcodeBinary(token.image) + " ";
                    break;
                default:
                    result += toBinary(token.image) + " ";
                    break;
            }
        });

        return result.match(/.{1,36}/g)?.join("\n") as string;
    }
}