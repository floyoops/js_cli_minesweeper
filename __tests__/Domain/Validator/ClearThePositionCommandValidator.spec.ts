import {GridInterface} from "../../../src/Domain/interfaces";
import {GridModel} from "../../../src/Domain/Model/GridModel";
import {ClearThePositionCommand} from "../../../src/Application/Command/ClearThePosition/ClearThePositionCommand";
import {ClearThePositionCommandValidator} from "../../../src/Domain/Validator/ClearThePositionCommandValidator";

describe('validator clear the position', () => {
    it ('isValid success', () => {
        let grid: GridInterface = new GridModel(5, []);
        let command = new ClearThePositionCommand(1, 1, grid);
        let validator = new ClearThePositionCommandValidator(command);
        expect(validator.isValid()).toBe(true);
    });

    it ('isValid fail value just above', () => {
        let grid: GridInterface = new GridModel(5, []);
        let command = new ClearThePositionCommand(0, 5, grid);
        let validator = new ClearThePositionCommandValidator(command);
        expect(validator.isValid()).toBe(false);
    })

    it ('isValid fail value too big', () => {
        let grid: GridInterface = new GridModel(5, []);
        let command = new ClearThePositionCommand(100, 100, grid);
        let validator = new ClearThePositionCommandValidator(command);
        expect(validator.isValid()).toBe(false);
    });

    it ('isValid fail negative value', () => {
        let grid: GridInterface = new GridModel(5, []);
        let command = new ClearThePositionCommand(1, -1, grid);
        let validator = new ClearThePositionCommandValidator(command);
        expect(validator.isValid()).toBe(false);
    });
})
