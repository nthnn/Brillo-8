import { opcodeBinary, toBinary } from "../src/util";

describe("String to Binary", ()=> {
    it("OpCode Conversions", ()=> {
        expect(opcodeBinary("DWRITE")).toBe("00011100");
        expect(opcodeBinary("YIELD")).toBe("00010111");
    });

    it("Number Conversions", ()=> {
        expect(toBinary("0")).toBe("00000000");
        expect(toBinary("1")).toBe("00000001");
    
        expect(toBinary("254")).toBe("11111110");
        expect(toBinary("255")).toBe("11111111");
    });
});