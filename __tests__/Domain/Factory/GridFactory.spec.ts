import {CellFactory} from "../../../src/Domain/Factory/CellFactory";
import {GridFactory} from "../../../src/Domain/Factory/GridFactory";
import {FactoryException} from "../../../src/Domain/Exception/FactoryException";
import {GridModel} from "../../../src/Domain/Model/GridModel";
import {RandomMines} from "../../../src/Domain/Service/RandomMines";
import {CellInterface} from "../../../src/Domain/interfaces";

describe('test grid factory', () => {
    it ('factory grid size 2 success', () => {
        let cellFactory = new CellFactory();
        let randomMines = new RandomMines();
        let gridFactory = new GridFactory(cellFactory, randomMines);
        let grid = gridFactory.create(2, 1);
        expect(grid).toBeInstanceOf(GridModel);
        expect(grid.getSize()).toBe(2);
        expect(grid.getCells().length).toBe(4);
        expect(grid.getCells()[0].getPositionX()).toBe(0);
        expect(grid.getCells()[0].getPositionY()).toBe(0);
        expect(grid.getCells()[2].getPositionX()).toBe(1);
        expect(grid.getCells()[2].getPositionY()).toBe(0);
        expect(grid.getCells()[3].getPositionX()).toBe(1);
        expect(grid.getCells()[3].getPositionY()).toBe(1);

        // check mined.
        let cellMined: CellInterface = grid.getCells().find((cell: CellInterface) => {
            return cell.isMined() === true;
        })
        expect(cellMined.isMined()).toBe(true);
    })

    it ('factory grid size 5 success', () => {
        let cellFactory = new CellFactory();
        let randomMines = new RandomMines();
        let gridFactory = new GridFactory(cellFactory, randomMines);
        let grid = gridFactory.create(5, 1);
        expect(grid).toBeInstanceOf(GridModel);
        expect(grid.getCells().length).toBe(25);
        expect(grid.getCells()[0].getPositionX()).toBe(0);
        expect(grid.getCells()[0].getPositionY()).toBe(0);
        expect(grid.getCells()[10].getPositionX()).toBe(2);
        expect(grid.getCells()[10].getPositionY()).toBe(0);
        expect(grid.getCells()[21].getPositionX()).toBe(4);
        expect(grid.getCells()[21].getPositionY()).toBe(1);
        expect(grid.getCells()[24].getPositionX()).toBe(4);
        expect(grid.getCells()[24].getPositionY()).toBe(4);
    })

    it ('factory grid exception on size', () => {
        let cellFactory = new CellFactory();
        let randomMines = new RandomMines();
        let gridFactory = new GridFactory(cellFactory, randomMines);
        let testException = null;
        try {
            gridFactory.create(1, 1);
        } catch (e) {
            testException = e;
        }
        expect(testException).toBeInstanceOf(FactoryException);
        expect(testException.message).toBe('Value of size not valid');
    })

    it ('factory grid exception numberOfMines too big', () => {
        let cellFactory = new CellFactory();
        let randomMines = new RandomMines();
        let gridFactory = new GridFactory(cellFactory, randomMines);
        let testException = null;
        try {
            gridFactory.create(5, 25);
        } catch (e) {
            testException = e;
        }
        expect(testException).toBeInstanceOf(FactoryException);
        expect(testException.message).toBe('Value of numberOfMines not valid');
    })
})
