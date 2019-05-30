import {AdjacentMinesInterface, CellInterface, GridInterface} from "../interfaces";
import {ServiceException} from "../Exception/ServiceException";

export class AdjacentMines implements AdjacentMinesInterface {

    public countMines(x: number, y: number, grid: GridInterface): number {
        let count: number = 0;
        let cellsAdjacent = this.getCellsAdjacent(x, y, grid);
        cellsAdjacent.forEach((cell: CellInterface) => {
            if (cell.isMined() === true) {
                count++;
            }
        })

        return count;
    }

    public getCellsAdjacent(x: number, y: number, grid: GridInterface): CellInterface[] {
        let minPosition = 0;
        let maxPosition = grid.getSize() - 1;
        let cells: CellInterface[] = [];
        if (x < maxPosition) {
            cells.push(this.findCellOrException(grid, (x+1), y));
        }
        if (y < maxPosition) {
            cells.push(this.findCellOrException(grid, x, (y+1)));
        }
        if (x < maxPosition && y < maxPosition) {
            cells.push(this.findCellOrException(grid, (x+1), (y+1)));
        }
        if (x > minPosition) {
            cells.push(this.findCellOrException(grid, (x-1), y));
        }
        if (y > minPosition) {
            cells.push(this.findCellOrException(grid, x, (y-1)));
        }
        if (x > minPosition && y > minPosition) {
            cells.push(this.findCellOrException(grid, (x-1), (y-1)));
        }
        if (x > minPosition && y < maxPosition) {
            cells.push(this.findCellOrException(grid, (x-1), (y+1)));
        }
        if (x < maxPosition && y > minPosition) {
            cells.push(this.findCellOrException(grid, (x+1), (y-1)));
        }

        return cells;
    }

    private findCellOrException(grid: GridInterface, x: number, y: number): CellInterface {
        let cell: CellInterface = grid.getCells().find((cell: any) => {
            if (cell.getPositionX() === x && cell.getPositionY() === y) {
                return cell;
            }
        });
        if (typeof cell === 'undefined') {
            throw new ServiceException(`Cell X:${x} Y:${y} not found`);
        }

        return cell;
    }
}
