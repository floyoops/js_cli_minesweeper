import {GenerateANewGridCommand} from "../../../src/Application/Command/GenerateANewGrid/GenerateANewGridCommand";
import {GenerateANewGridCommandValidator} from "../../../src/Domain/Validator/GenerateANewGridCommandValidator";

describe('generate a new grid validator', () => {
    it ('validator isValid', () => {
        let command = new GenerateANewGridCommand(5, 4);
        let validator = new GenerateANewGridCommandValidator(command);
        expect(validator.isValid()).toBe(true);
    });

    it ('validator fail on no mine declared', () => {
        let command = new GenerateANewGridCommand(5, 0);
        let validator = new GenerateANewGridCommandValidator(command);
        expect(validator.isValid()).toBe(false);
    });

    it ('validator fail on negative mine declared', () => {
        let command = new GenerateANewGridCommand(5, -10);
        let validator = new GenerateANewGridCommandValidator(command);
        expect(validator.isValid()).toBe(false);
    });

    it ('validator fail on too big mines declared', () => {
        let command = new GenerateANewGridCommand(5, 100);
        let validator = new GenerateANewGridCommandValidator(command);
        expect(validator.isValid()).toBe(false);
    });

    it ('validator fail on too big size declared', () => {
        let command = new GenerateANewGridCommand(100, 5);
        let validator = new GenerateANewGridCommandValidator(command);
        expect(validator.isValid()).toBe(false);
    });

    it ('validator fail on number of mines has the same quantities of cells', () => {
        let command = new GenerateANewGridCommand(5, 25);
        let validator = new GenerateANewGridCommandValidator(command);
        expect(validator.isValid()).toBe(false);
    });
});
