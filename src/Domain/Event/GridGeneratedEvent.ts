import {EventInterface, GridInterface} from "../interfaces";

export class GridGeneratedEvent implements EventInterface {

    private readonly _grid: GridInterface;

    constructor(grid: GridInterface) {
        this._grid = grid;
    }

    public getGrid(): GridInterface {
        return this._grid;
    }
}
