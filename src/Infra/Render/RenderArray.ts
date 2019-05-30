import {CellInterface, GridInterface, RenderMinesWeeperInterface} from "../../Domain/interfaces";
import {injectable} from "inversify";


@injectable()
export class RenderArray implements RenderMinesWeeperInterface{

    public showGrid(grid: GridInterface) {
        let rowsXY: string[][] = this.gridToArrayAdapter(grid);
        let rows = rowsXY.map((row: string[]) => {
            return row.join(' ');
        })
        return rows;
    }

    public gridToArrayAdapter(grid: GridInterface): string[][] {
        let rows = [];
        grid.getCells().forEach((cell: CellInterface) => {
            let x = cell.getPositionX();
            let y = cell.getPositionY();
            if (typeof rows[y] === 'undefined') {
                rows[y] = [];
            }
            rows[y][x] = RenderArray.getViewCell(cell);
        })

        // reverse for start the position 0 on bottom axe xy
        return rows.reverse();
    }

    public static getViewCell(cell: CellInterface): string {
        if (cell.isDiscover()) {
            if (cell.isMined()) {
                return '[X]';
            }
            if (cell.getNumberOfMinesAdjacent() !== null) {
                return `[${cell.getNumberOfMinesAdjacent()}]`;
            }
            return '[D]';
        }
        return '[ ]';
    }
}
