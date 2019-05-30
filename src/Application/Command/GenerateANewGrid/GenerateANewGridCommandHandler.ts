import {CommandHandlerInterface, EventBusInterface, GridInterface} from "../../../Domain/interfaces";
import {GenerateANewGridCommand} from "./GenerateANewGridCommand";
import {GridFactory} from "../../../Domain/Factory/GridFactory";
import {GridGeneratedEvent} from "../../../Domain/Event/GridGeneratedEvent";

export class GenerateANewGridCommandHandler implements CommandHandlerInterface{

    private readonly _gridFactory: GridFactory;
    private readonly _eventBus: EventBusInterface;

    constructor(gridFactory: GridFactory, eventBus: EventBusInterface) {
        this._gridFactory = gridFactory;
        this._eventBus = eventBus;
    }

    handle(command: GenerateANewGridCommand): void {
        let grid: GridInterface = this._gridFactory.create(command.getSize(), command.getNumberOfMines());
        this._eventBus.emit('GridGeneratedEvent', new GridGeneratedEvent(grid));
    }
}
