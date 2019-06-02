import {RandomMines} from "../../../src/Domain/Service/RandomMines";
import {CellFactory} from "../../../src/Domain/Factory/CellFactory";
import {GridFactory} from "../../../src/Domain/Factory/GridFactory";
import {CellInterface, EventBusInterface, GridInterface} from "../../../src/Domain/interfaces";
import {ClearThePositionCommand} from "../../../src/Application/Command/ClearThePosition/ClearThePositionCommand";
import {ClearThePositionCommandHandler} from "../../../src/Application/Command/ClearThePosition/ClearThePositionCommandHandler";
import {GridUpdatedEvent} from "../../../src/Domain/Event/GridUpdatedEvent";
import {CommandHandlerException} from "../../../src/Domain/Exception/CommandHandlerException";
import {AdjacentMines} from "../../../src/Domain/Service/AdjacentMines";
import {AutoDiscoverMines} from "../../../src/Domain/Service/AutoDiscoverMines";

const EventBusMock = jest.fn<EventBusInterface, []>(() => ({
    emit: jest.fn(),
    on: jest.fn(),
    addListener: jest.fn(),
}));

describe('clear the position command handler', () => {
    it ('success', () => {
        // dep
        let randomMines = new RandomMines();
        let cellFactory = new CellFactory();
        let gridFactory = new GridFactory(cellFactory, randomMines);
        let adjacentMines = new AdjacentMines();
        let autoDiscoverMines = new AutoDiscoverMines(adjacentMines);
        let eventBus: EventBusInterface = new EventBusMock();
        let grid: GridInterface = gridFactory.create(5, 1);

        // handle
        let command = new ClearThePositionCommand(1, 1, grid);
        let commandHandler = new ClearThePositionCommandHandler(eventBus, adjacentMines, autoDiscoverMines);
        commandHandler.handle(command);

        // expect
        let expectedEvent = new GridUpdatedEvent(grid);
        expect(eventBus.emit).toHaveBeenLastCalledWith(
            'GridUpdatedEvent',
            expectedEvent
        )
        let countDiscover = 0;
        grid.getCells().forEach((cell: CellInterface) => {
            if (cell.isDiscover() === true ) {
                countDiscover++
            }
        })
        expect(countDiscover).toBeGreaterThan(0);
    })

    it ('Exception on cell not found', () => {
        // dep
        let randomMines = new RandomMines();
        let cellFactory = new CellFactory();
        let gridFactory = new GridFactory(cellFactory, randomMines);
        let adjacentMines = new AdjacentMines();
        let autoDiscoverMines = new AutoDiscoverMines(adjacentMines);
        let eventBus: EventBusInterface = new EventBusMock();
        let grid: GridInterface = gridFactory.create(5, 1);

        // handle
        let command = new ClearThePositionCommand(0, 7, grid);
        let commandHandler = new ClearThePositionCommandHandler(eventBus, adjacentMines, autoDiscoverMines);
        let expectedException = null;
        try {
            commandHandler.handle(command);
        } catch (e) {
            expectedException = e;
        }

        // expect
        expect(expectedException).toBeInstanceOf(CommandHandlerException);
        expect(expectedException.message).toBe('Cell X:0 Y:7 not found');

    })
})
