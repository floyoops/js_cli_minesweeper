import {GenerateANewGridCommand} from "../../../src/Application/Command/GenerateANewGrid/GenerateANewGridCommand";

describe('test new command', () => {
    it ('command instance generate grid', () => {
        let command = new GenerateANewGridCommand(5, 1);
        expect(5).toBe(command.getSize())
    })
})
