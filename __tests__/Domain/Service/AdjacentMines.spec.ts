import {CellInterface, GridInterface} from "../../../src/Domain/interfaces";
import {CellModel} from "../../../src/Domain/Model/CellModel";
import {GridModel} from "../../../src/Domain/Model/GridModel";
import {AdjacentMines} from "../../../src/Domain/Service/AdjacentMines";

describe('adjacent mines service', () => {
    it('count success for cell 0,0 with 3 mines', () => {
        // instance a grid.
        let cells: CellInterface[] = [];
        cells.push(new CellModel(0, 0, false));
        cells.push(new CellModel(1, 0, true));
        cells.push(new CellModel(0, 1, true));
        cells.push(new CellModel(1, 1, true));
        let grid: GridInterface = new GridModel(2, cells);

        // service.
        let adjacentMines = new AdjacentMines();
        let r = adjacentMines.countMines(0, 0, grid);
        expect(r).toBe(3);
    })

    it('count success for cell 0,0 with 1 mines', () => {
        // instance a grid.
        let cells: CellInterface[] = [];
        cells.push(new CellModel(0, 0, false));
        cells.push(new CellModel(1, 0, true));
        cells.push(new CellModel(0, 1, false));
        cells.push(new CellModel(1, 1, false));
        let grid: GridInterface = new GridModel(2, cells);

        // service.
        let adjacentMines = new AdjacentMines();
        let r = adjacentMines.countMines(0, 0, grid);
        expect(r).toBe(1);
    })

    it('count success for cell 0,0 with 0 mines', () => {
        // instance a grid.
        let cells: CellInterface[] = [];
        cells.push(new CellModel(0, 0, false));
        cells.push(new CellModel(1, 0, false));
        cells.push(new CellModel(0, 1, false));
        cells.push(new CellModel(1, 1, false));
        let grid: GridInterface = new GridModel(2, cells);

        // service.
        let adjacentMines = new AdjacentMines();
        let r = adjacentMines.countMines(0, 0, grid);
        expect(r).toBe(0);
    })

    it('count success for cell 0,0 with full mined', () => {
        // instance a grid.
        let cells: CellInterface[] = [];
        cells.push(new CellModel(0, 0, true));
        cells.push(new CellModel(1, 0, true));
        cells.push(new CellModel(0, 1, true));
        cells.push(new CellModel(1, 1, true));
        let grid: GridInterface = new GridModel(2, cells);

        // service.
        let adjacentMines = new AdjacentMines();
        let r = adjacentMines.countMines(0, 0, grid);
        expect(r).toBe(3);
    })

    it('count success for cell 1,0 with 3 mines', () => {
        // instance a grid.
        let cells: CellInterface[] = [];
        cells.push(new CellModel(0, 0, true));
        cells.push(new CellModel(1, 0, false));
        cells.push(new CellModel(0, 1, true));
        cells.push(new CellModel(1, 1, true));
        let grid: GridInterface = new GridModel(2, cells);

        // service.
        let adjacentMines = new AdjacentMines();
        let r = adjacentMines.countMines(1, 0, grid);
        expect(r).toBe(3);
    })

    it ('count success for 9 cells for cell 1,1 with 8 mines', () => {
        let cells: CellInterface[] = [];
        cells.push(new CellModel(0, 0, true));
        cells.push(new CellModel(1, 0, true));
        cells.push(new CellModel(2, 0, true));
        cells.push(new CellModel(0, 1, true));
        cells.push(new CellModel(1, 1, false));
        cells.push(new CellModel(2, 1, true));
        cells.push(new CellModel(0, 2, true));
        cells.push(new CellModel(1, 2, true));
        cells.push(new CellModel(2, 2, true));
        let grid: GridInterface = new GridModel(3, cells);

        // service.
        let adjacentMines = new AdjacentMines();
        let r = adjacentMines.countMines(1, 1, grid);
        expect(r).toBe(8);
    })
})
