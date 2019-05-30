import {CellInterface} from "../interfaces";

export class CellModel implements CellInterface {

    private readonly _positionX: number;
    private readonly _positionY: number;
    private readonly _mined: boolean;
    private _discover: boolean;
    private _numberOfMinesAdjacent: number|null;

    constructor(positionX: number, positionY: number, mined: boolean) {
        this._positionX = positionX;
        this._positionY = positionY;
        this._mined = mined;
        this._discover = false;
        this._numberOfMinesAdjacent = null;
    }

    getPositionX(): number {
        return this._positionX;
    }

    getPositionY(): number {
        return this._positionY;
    }

    isMined(): boolean {
        return this._mined;
    }

    isDiscover(): boolean {
        return this._discover;
    }

    setDiscover(discover: boolean) {
        this._discover = discover;
    }

    getNumberOfMinesAdjacent(): number | null {
        return this._numberOfMinesAdjacent;
    }

    setNumberOfMinesAdjacent(value: number | null) {
        this._numberOfMinesAdjacent = value;
    }
}
