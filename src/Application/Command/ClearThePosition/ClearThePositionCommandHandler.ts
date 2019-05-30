import {
    AdjacentMinesInterface,
    CellInterface,
    CommandHandlerInterface,
    EventBusInterface,
    GridInterface
} from "../../../Domain/interfaces";
import {ClearThePositionCommand} from "./ClearThePositionCommand";
import {GridUpdatedEvent} from "../../../Domain/Event/GridUpdatedEvent";
import {CommandHandlerException} from "../../../Domain/Exception/CommandHandlerException";

export class ClearThePositionCommandHandler implements CommandHandlerInterface{

    private readonly _eventBus: EventBusInterface;
    private readonly _adjacentMines: AdjacentMinesInterface;

    constructor(eventBus: EventBusInterface, adjacentMines: AdjacentMinesInterface) {
        this._eventBus = eventBus;
        this._adjacentMines = adjacentMines;
    }

    handle(command: ClearThePositionCommand): void {
        let grid: GridInterface = command.getGrid();
        let x: number = command.getX();
        let y: number = command.getY();
        let cellDiscover = this.findCellOrException(grid, x, y);
        cellDiscover.setDiscover(true);
        let countMinesAdjacent: number = this._adjacentMines.countMines(
            cellDiscover.getPositionX(),
            cellDiscover.getPositionY(),
            grid
        );
        cellDiscover.setNumberOfMinesAdjacent(countMinesAdjacent);

        this._eventBus.emit('GridUpdatedEvent', new GridUpdatedEvent(command.getGrid()));
    }

    private findCellOrException(grid: GridInterface, x: number, y: number): CellInterface {
        let cell: CellInterface = grid.getCells().find((cell: any) => {
            if (cell.getPositionX() === x && cell.getPositionY() === y) {
                return cell;
            }
        });
        if (typeof cell === 'undefined') {
            throw new CommandHandlerException(`Cell X:${x} Y:${y} not found`);
        }

        return cell;
    }
}
