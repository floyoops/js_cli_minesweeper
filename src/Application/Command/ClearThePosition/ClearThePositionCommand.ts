import {CommandInterface, GridInterface} from "../../../Domain/interfaces";

export class ClearThePositionCommand implements CommandInterface {

    private readonly _x: number;
    private readonly _y: number;
    private readonly _grid: GridInterface;

    constructor(
        x: number,
        y: number,
        grid: GridInterface
    ) {
        this._x = x;
        this._y = y;
        this._grid = grid;
    }

    getX(): number {
        return this._x;
    }

    getY(): number {
        return this._y;
    }

    getGrid(): GridInterface {
        return this._grid;
    }
}
