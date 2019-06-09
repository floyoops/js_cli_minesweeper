import {inject, injectable} from "inversify";
import {
    CommandBusInterface, CommandListenerInterface,
    EventBusInterface,
    GameUIInterface, GridInterface,
    RenderMinesWeeperInterface
} from "../../Domain/interfaces";
import {TYPES} from "../../Infra/Inversify/types";
import {ReadLine} from "readline";
import * as readline from "readline";
import {GenerateANewGridCommand} from "../../Application/Command/GenerateANewGrid/GenerateANewGridCommand";
import {GridGeneratedEvent} from "../../Domain/Event/GridGeneratedEvent";
import {ClearThePositionCommand} from "../../Application/Command/ClearThePosition/ClearThePositionCommand";
import {GridUpdatedEvent} from "../../Domain/Event/GridUpdatedEvent";
import {ClearThePositionCommandValidator} from "../../Domain/Validator/ClearThePositionCommandValidator";
import {GenerateANewGridCommandValidator} from "../../Domain/Validator/GenerateANewGridCommandValidator";

@injectable()
export class MinesWeeperCli implements GameUIInterface{

    private readonly _commandBus: CommandBusInterface;
    private readonly _eventBus: EventBusInterface;
    private readonly _commandListener: CommandListenerInterface;
    private readonly _render: RenderMinesWeeperInterface;
    private readonly _rl: ReadLine;

    constructor(
        @inject(TYPES.CommandBus) commandBus: CommandBusInterface,
        @inject(TYPES.EventBus) eventBus: EventBusInterface,
        @inject(TYPES.CommandListener) commandListener: CommandListenerInterface,
        @inject(TYPES.RenderMinesWeeper) render: RenderMinesWeeperInterface,
    ) {
        this._commandBus = commandBus;
        this._eventBus = eventBus;
        this._commandListener = commandListener;
        this._render = render;
        this._rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    public start(): void {
        // listen the command from commandBus.
        this._commandListener.listen();

        // listen and refresh the vue grid from the eventBus.
        this._eventBus.on('GridGeneratedEvent', (event: GridGeneratedEvent) => {
            let grid: GridInterface = event.getGrid();
            this.clearScreen();
            this.renderTheGrid(grid);
            this.askPositionAction(grid, 'Position to be demined:');
        });
        this._eventBus.on('GridUpdatedEvent', (event: GridUpdatedEvent) => {
            let grid: GridInterface = event.getGrid();
            this.clearScreen();
            this.renderTheGrid(grid);
            this.askPositionAction(grid, 'Position to be demined:');
        });

        // first start.
        this.clearScreen();
        this.askConfigurationGridAction('Configuration grid');
    }

    private askConfigurationGridAction(message: string): void {
        this._rl.write(`${message}\n\n`);
        this._rl.question('size grid ?', (size: string) => {
            this._rl.question('number of mines ?', (numberOfMines: string) => {
                let command = new GenerateANewGridCommand(parseInt(size), parseInt(numberOfMines));
                if (MinesWeeperCli.generateGridCommandIsValid(command) === true) {
                    this._commandBus.emit('GenerateANewGridCommand', command);
                } else {
                    this.askConfigurationGridAction('Value not valid');
                }
            });
        });
    }

    private askPositionAction(grid: GridInterface, message: string): void {
        this._rl.write(`\n${message}\n`);
        this._rl.question('x: ', (x: string) => {
            this._rl.question('y: ', (y: string) => {
                let command = new ClearThePositionCommand(parseInt(x), parseInt(y), grid);
                if (MinesWeeperCli.clearThePositionCommandIsValid(command) === true) {
                    this._commandBus.emit('ClearThePositionCommand', command);
                } else {
                    this.askPositionAction(grid, 'value not valid');
                }
            })
        })
    }

    private static clearThePositionCommandIsValid(command: ClearThePositionCommand): boolean {
        let validator = new ClearThePositionCommandValidator(command);
        return validator.isValid();
    }

    private static generateGridCommandIsValid(command: GenerateANewGridCommand): boolean {
        let validator = new GenerateANewGridCommandValidator(command);
        return validator.isValid();
    }

    private renderTheGrid(grid: GridInterface): void {
        this._rl.write('MinesWeeper CLI\n\n');
        let view: string[] = this._render.showGrid(grid)
        view.forEach((row: string) => {
            this._rl.write(`${row} \n`);
        });
        this._rl.write('\n');
    }

    private clearScreen() {
        this._rl.write('\u001B[2J\u001B[0;0f');
    }
}
