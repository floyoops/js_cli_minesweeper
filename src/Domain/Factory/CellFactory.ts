import {CellInterface, FactoryInterface} from "../interfaces";
import {CellModel} from "../Model/CellModel";
import {FactoryException} from "../Exception/FactoryException";

export class CellFactory implements FactoryInterface{

    public create(positionX: number, positionY: number, mined: boolean): CellInterface {
        CellFactory.validOrException(positionX, positionY);
        return new CellModel(positionX, positionY, mined);
    }

    private static validOrException(positionX: number, positionY: number): void {
        if (Number.isInteger(positionX) === false || positionX < 0) {
            throw new FactoryException('Value of positionX not valid');
        }
        if (Number.isInteger(positionY) === false || positionY < 0) {
            throw new FactoryException('Value of positionY not valid');
        }
    }
}
