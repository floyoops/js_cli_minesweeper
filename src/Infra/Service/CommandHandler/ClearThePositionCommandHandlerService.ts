import {ClearThePositionCommandHandler} from "../../../Application/Command/ClearThePosition/ClearThePositionCommandHandler";
import {inject, injectable} from "inversify";
import {TYPES} from "../../Inversify/types";
import {AdjacentMinesInterface, AutoDiscoverMinesInterface, EventBusInterface} from "../../../Domain/interfaces";

@injectable()
export class ClearThePositionCommandHandlerService extends ClearThePositionCommandHandler {
    constructor(
        @inject(TYPES.EventBus) eventBus: EventBusInterface,
        @inject(TYPES.AdjacentMines) adjacentMines: AdjacentMinesInterface,
        @inject(TYPES.AutoDiscoverMines) autoDiscoverMines: AutoDiscoverMinesInterface
    ) {
        super(eventBus, adjacentMines, autoDiscoverMines);
    }
}
