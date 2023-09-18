import Brillo8TokenizerUtil from '../src/tokenizer_util';

describe("Tokenizer utility test", ()=> {
    it("Whitespace Checks", ()=> {
        expect(Brillo8TokenizerUtil.isWhitespace(' ')).toBe(true);
        expect(Brillo8TokenizerUtil.isWhitespace('\t')).toBe(true);
        expect(Brillo8TokenizerUtil.isWhitespace('\n')).toBe(true);
        expect(Brillo8TokenizerUtil.isWhitespace('\r')).toBe(true);
    });

    it("Number Checks", ()=> {
        expect(Brillo8TokenizerUtil.isNumber('0')).toBe(true);
        expect(Brillo8TokenizerUtil.isNumber('9')).toBe(true);
    });

    it("Possible Instruction", ()=> {
        expect(Brillo8TokenizerUtil.isPossibleInstruction('a')).toBe(true);
        expect(Brillo8TokenizerUtil.isPossibleInstruction('A')).toBe(true);

        expect(Brillo8TokenizerUtil.isPossibleInstruction('z')).toBe(true);
        expect(Brillo8TokenizerUtil.isPossibleInstruction('Z')).toBe(true);
    });

});