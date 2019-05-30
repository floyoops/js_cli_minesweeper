import {RandomMines} from "../../../src/Domain/Service/RandomMines";
import {CellFactory} from "../../../src/Domain/Factory/CellFactory";
import {GridFactory} from "../../../src/Domain/Factory/GridFactory";
import {EventBusInterface, GridInterface} from "../../../src/Domain/interfaces";
import {ClearThePositionCommand} from "../../../src/Application/Command/ClearThePosition/ClearThePositionCommand";
import {ClearThePositionCommandHandler} from "../../../src/Application/Command/ClearThePosition/ClearThePositionCommandHandler";
import {GridUpdatedEvent} from "../../../src/Domain/Event/GridUpdatedEvent";
import {CommandHandlerException} from "../../../src/Domain/Exception/CommandHandlerException";
import {AdjacentMines} from "../../../src/Domain/Service/AdjacentMines";

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
        let eventBus: EventBusInterface = new EventBusMock();
        let grid: GridInterface = gridFactory.create(5, 1);

        // handle
        let command = new ClearThePositionCommand(1, 1, grid);
        let commandHandler = new ClearThePositionCommandHandler(eventBus, adjacentMines);
        commandHandler.handle(command);

        // expect
        let expectedEvent = new GridUpdatedEvent(grid);
        expect(eventBus.emit).toHaveBeenLastCalledWith(
            'GridUpdatedEvent',
            expectedEvent
        )
        expect(grid.getCells()[0].isDiscover()).toBe(false);
        expect(grid.getCells()[6].isDiscover()).toBe(true);
        expect(grid.getCells()[20].isDiscover()).toBe(false);
    })

    it ('Exception on cell not found', () => {
        // dep
        let randomMines = new RandomMines();
        let cellFactory = new CellFactory();
        let gridFactory = new GridFactory(cellFactory, randomMines);
        let adjacentMines = new AdjacentMines();
        let eventBus: EventBusInterface = new EventBusMock();
        let grid: GridInterface = gridFactory.create(5, 1);

        // handle
        let command = new ClearThePositionCommand(0, 7, grid);
        let commandHandler = new ClearThePositionCommandHandler(eventBus, adjacentMines);
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
