import {AutoDiscoverMines} from "../../Domain/Service/AutoDiscoverMines";
import {inject, injectable} from "inversify";
import {AdjacentMinesInterface} from "../../Domain/interfaces";
import {TYPES} from "../Inversify/types";

@injectable()
export class AutoDiscoverMinesService extends AutoDiscoverMines {
    constructor(
        @inject(TYPES.AdjacentMines) adjacentMines: AdjacentMinesInterface
    ) {
        super(adjacentMines);
    }
}