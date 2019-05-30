import {CellFactory} from "../../../src/Domain/Factory/CellFactory";
import {FactoryException} from "../../../src/Domain/Exception/FactoryException";

describe('test cell factory', () => {
    it('factory cell success', () => {
        let cellFactory = new CellFactory();
        let cell = cellFactory.create(1, 0, true);
        expect(1).toBe(cell.getPositionX());
        expect(0).toBe(cell.getPositionY());
        expect(true).toBe(cell.isMined());
        expect(null).toBe(cell.getNumberOfMinesAdjacent());
        expect(false).toBe(cell.isDiscover());
    })

    it('factory cell exception positionX', () => {
        let cellFactory = new CellFactory();
        let testException = null;
        try {
            cellFactory.create(1.5, 0, true);
        } catch (e) {
            testException = e;
        }
        expect(testException).toBeInstanceOf(FactoryException);
        expect(testException.message).toBe('Value of positionX not valid');
    })
});
