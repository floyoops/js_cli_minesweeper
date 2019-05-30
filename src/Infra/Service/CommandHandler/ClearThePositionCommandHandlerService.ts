import {ClearThePositionCommandHandler} from "../../../Application/Command/ClearThePosition/ClearThePositionCommandHandler";
import {inject, injectable} from "inversify";
import {TYPES} from "../../Inversify/types";
import {AdjacentMinesInterface, EventBusInterface} from "../../../Domain/interfaces";

@injectable()
export class ClearThePositionCommandHandlerService extends ClearThePositionCommandHandler {
    constructor(
        @inject(TYPES.EventBus) eventBus: EventBusInterface,
        @inject(TYPES.AdjacentMines) adjacentMines: AdjacentMinesInterface
    ) {
        super(eventBus, adjacentMines);
    }
}
