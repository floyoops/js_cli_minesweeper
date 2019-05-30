import {CellInterface, FactoryInterface, GridInterface} from "../interfaces";
import {CellFactory} from "./CellFactory";
import {FactoryException} from "../Exception/FactoryException";
import {GridModel} from "../Model/GridModel";
import {RandomMines} from "../Service/RandomMines";

export class GridFactory implements FactoryInterface {

    private readonly _cellFactory: CellFactory;
    private readonly _randomMines: RandomMines;

    constructor(
        cellFactory: CellFactory,
        randomMines: RandomMines
    ) {
        this._cellFactory = cellFactory;
        this._randomMines = randomMines;
    }

    public create(size: number, numberOfMines: number): GridInterface {
        GridFactory.validOrException(size, numberOfMines);
        let positionMines: number[] = this._randomMines.getMinesPosition((size*size), numberOfMines);
        let currentCellPosition = 0;
        let cells: CellInterface[] = [];
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                let mined: boolean = this.placeMine(currentCellPosition, positionMines);
                cells.push(this._cellFactory.create(x, y, mined));
                currentCellPosition++;
            }
        }

        return new GridModel(size, cells);
    }

    private placeMine(currentCellPosition: number, positionMines: number[]): boolean {
        if (positionMines.indexOf(currentCellPosition) === -1) {
            return false;
        }
        return true;
    }

    private static validOrException(size: number, numberOfMines: number): void {
        let maxNumberOfMines = (size*size-1);
        if (Number.isInteger(size) === false || size < 2 || size > 100) {
            throw new FactoryException('Value of size not valid');
        }
        if (Number.isInteger(numberOfMines) === false || numberOfMines < 1 || numberOfMines > maxNumberOfMines) {
            throw new FactoryException('Value of numberOfMines not valid');
        }
    }
}
