import {AdjacentMinesInterface, AutoDiscoverMinesInterface, CellInterface, GridInterface} from "../interfaces";

export class AutoDiscoverMines implements AutoDiscoverMinesInterface {

    private readonly _adjacentMines: AdjacentMinesInterface

    constructor(
        adjacentMines: AdjacentMinesInterface
    ) {
        this._adjacentMines = adjacentMines;
    }

    public autoDiscover(x: number, y: number, grid: GridInterface): void {
        let cellsDiscover: CellInterface[] = this._adjacentMines.getCellsAdjacent(x, y, grid);
        cellsDiscover.forEach((cell: CellInterface) => {
            let count = this._adjacentMines.countMines(cell.getPositionX(), cell.getPositionY(), grid);
            if (count === 0 && cell.isDiscover() === false) {
                cell.setDiscover(true);
                cell.setNumberOfMinesAdjacent(0);
                this.autoDiscover(cell.getPositionX(), cell.getPositionY(), grid);
            }
        });
    }
}