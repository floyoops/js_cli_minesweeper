import {CommandInterface} from "../../../Domain/interfaces";

export class GenerateANewGridCommand implements CommandInterface{
    private readonly _size: number;
    private readonly _numberOfMines: number;

    constructor(size: number, numberOfMines: number) {
        this._size = size;
        this._numberOfMines = numberOfMines;
    }

    public getSize(): number {
        return this._size;
    }

    public getNumberOfMines(): number {
        return this._numberOfMines;
    }
}
