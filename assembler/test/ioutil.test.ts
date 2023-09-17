import fs from 'node:fs';

import { Brillo8IOUtil } from "../src/util";

describe("IO Utility", ()=> {
    it("Write function", ()=> expect(Brillo8IOUtil.writeFile("test.txt", "Done")).toBe(undefined));

    it("Read function", ()=> {
        expect(Brillo8IOUtil.readFile("test.txt")).toBe("Done");
        fs.rmSync("test.txt");
    });
});
