import {ValidatorInterface} from "../interfaces";
import {GenerateANewGridCommand} from "../../Application/Command/GenerateANewGrid/GenerateANewGridCommand";

export class GenerateANewGridCommandValidator implements ValidatorInterface {

    private readonly _command: GenerateANewGridCommand;

    constructor(command: GenerateANewGridCommand) {
        this._command = command;
    }

    isValid(): boolean {
        // validate size
        let size: number = this._command.getSize();
        if ((Number.isInteger(size) !== true) || size < 2 || size > 30) {
            return false;
        }

        // validate numberOfMines
        let numberOfMines: number = this._command.getNumberOfMines();
        let maxMineAuthorized = (size*size-1);
        if (Number.isInteger(numberOfMines) !== true || numberOfMines < 1 || numberOfMines > maxMineAuthorized) {
            return false;
        }

        return true;
    }
}
