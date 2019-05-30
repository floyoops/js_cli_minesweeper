import {GridFactory} from "../../../Domain/Factory/GridFactory";
import {inject, injectable} from "inversify";
import {TYPES} from "../../Inversify/types";
import {CellFactory} from "../../../Domain/Factory/CellFactory";
import {RandomMines} from "../../../Domain/Service/RandomMines";

@injectable()
export class GridFactoryService extends GridFactory {
    constructor(
        @inject(TYPES.CellFactory) cellFactory: CellFactory,
        @inject(TYPES.RandomMines) randomMines: RandomMines
    ) {
        super(cellFactory, randomMines);
    }
}
