import {CellInterface, GridInterface} from "../../../src/Domain/interfaces";
import {CellModel} from "../../../src/Domain/Model/CellModel";
import {GridModel} from "../../../src/Domain/Model/GridModel";
import {AdjacentMines} from "../../../src/Domain/Service/AdjacentMines";
import {AutoDiscoverMines} from "../../../src/Domain/Service/AutoDiscoverMines";

describe('Auto discover mines', () => {
    it('success', () => {
        /**
         * instance a grid.
         *
         * [ ] [ ] [X]
         * [ ] [ ] [ ]
         * [ ] [ ] [ ]
         */
        let cells: CellInterface[] = [];
        cells.push(new CellModel(0, 0, false));
        cells.push(new CellModel(1, 0, false));
        cells.push(new CellModel(2, 0, false));
        cells.push(new CellModel(0, 1, false));
        cells.push(new CellModel(1, 1, false));
        cells.push(new CellModel(2, 1, false));
        cells.push(new CellModel(0, 2, false));
        cells.push(new CellModel(1, 2, false));
        cells.push(new CellModel(2, 2, true));
        let grid: GridInterface = new GridModel(3, cells);

        // we make sure that all cells are not discover.
        cells.forEach((cell: CellInterface) => {
            expect(cell.isDiscover()).toBe(false);
        })

        /**
         * Expect the discover grid.
         *
         * [0] [1] [X]
         * [0] [1] [1]
         * [0] [0] [0]
         */
        let adjacentMines = new AdjacentMines();
        let autoDiscoverMines = new AutoDiscoverMines(adjacentMines);
        autoDiscoverMines.autoDiscover(0, 0, grid);
        // x:0 y:0
        expect(grid.getCells()[0].isDiscover()).toBe(true);
        expect(grid.getCells()[0].getNumberOfMinesAdjacent()).toBe(0);
        // x:1 y:0
        expect(grid.getCells()[1].isDiscover()).toBe(true);
        expect(grid.getCells()[1].getNumberOfMinesAdjacent()).toBe(0);
        // x:2 y:0
        expect(grid.getCells()[2].isDiscover()).toBe(true);
        expect(grid.getCells()[2].getNumberOfMinesAdjacent()).toBe(0);
        // x:0 y:1
        expect(grid.getCells()[3].isDiscover()).toBe(true);
        expect(grid.getCells()[3].getNumberOfMinesAdjacent()).toBe(0);
        // x:1 y:1
        expect(grid.getCells()[4].isDiscover()).toBe(true);
        expect(grid.getCells()[4].getNumberOfMinesAdjacent()).toBe(1);
        // x:2 y:1
        expect(grid.getCells()[5].isDiscover()).toBe(true);
        expect(grid.getCells()[5].getNumberOfMinesAdjacent()).toBe(1);
        // x:0 y:2
        expect(grid.getCells()[6].isDiscover()).toBe(true);
        expect(grid.getCells()[6].getNumberOfMinesAdjacent()).toBe(0);
        // x:1 y2
        expect(grid.getCells()[7].isDiscover()).toBe(true);
        expect(grid.getCells()[7].getNumberOfMinesAdjacent()).toBe(1);
        // x:2 y:2
        expect(grid.getCells()[8].isDiscover()).toBe(false);
        expect(grid.getCells()[8].getNumberOfMinesAdjacent()).toBe(null);

    })
})