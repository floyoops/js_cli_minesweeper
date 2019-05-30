import {CellInterface, GridInterface} from "../interfaces";

export class GridModel implements GridInterface {

    private readonly _size: number;
    private readonly _cells: CellInterface[];

    constructor(size: number, cells: CellInterface[]) {
        this._size = size;
        this._cells = cells;
    }

    getSize(): number {
        return this._size;
    }

    getCells(): CellInterface[] {
        return this._cells;
    }
}
