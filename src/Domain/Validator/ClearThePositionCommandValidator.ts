import {ValidatorInterface} from "../interfaces";
import {ClearThePositionCommand} from "../../Application/Command/ClearThePosition/ClearThePositionCommand";

export class ClearThePositionCommandValidator implements ValidatorInterface {

    private readonly _command: ClearThePositionCommand;

    constructor(command: ClearThePositionCommand) {
        this._command = command;
    }

    public isValid(): boolean {
        let sizeMax = (this._command.getGrid().getSize() -1);
        if (ClearThePositionCommandValidator.axeIsValid(this._command.getX(), sizeMax) === false) {
            return false;
        }
        if (ClearThePositionCommandValidator.axeIsValid(this._command.getY(), sizeMax) === false) {
            return false;
        }
        return true;
    }

    private static axeIsValid(axe: number, sizeMax: number): boolean {
        if ((Number.isInteger(axe) !== true) || (axe < 0 || axe > sizeMax)) {
            return false;
        }
        return true;
    }
}
