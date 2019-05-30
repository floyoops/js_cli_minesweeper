import {inject, injectable} from "inversify";
import {CommandBusInterface, CommandListenerInterface} from "../../Domain/interfaces";
import {TYPES} from "../Inversify/types";
import {GenerateANewGridCommandHandler} from "../../Application/Command/GenerateANewGrid/GenerateANewGridCommandHandler";
import {GenerateANewGridCommand} from "../../Application/Command/GenerateANewGrid/GenerateANewGridCommand";
import {ClearThePositionCommand} from "../../Application/Command/ClearThePosition/ClearThePositionCommand";
import {ClearThePositionCommandHandler} from "../../Application/Command/ClearThePosition/ClearThePositionCommandHandler";

@injectable()
export class CommandListener implements CommandListenerInterface{

    private readonly _commandBus: CommandBusInterface;
    private readonly _generateANewGridCommandHandler: GenerateANewGridCommandHandler;
    private readonly _clearThePositionCommandHandler: ClearThePositionCommandHandler;

    constructor(
        @inject(TYPES.CommandBus) commandBus: CommandBusInterface,
        @inject(TYPES.GenerateANewGridCommandHandler) generateANewGridCommandHandler: GenerateANewGridCommandHandler,
        @inject(TYPES.ClearThePositionCommandHandler) clearThePositionCommandHandler: ClearThePositionCommandHandler
    ) {
        this._commandBus = commandBus;
        this._generateANewGridCommandHandler = generateANewGridCommandHandler;
        this._clearThePositionCommandHandler = clearThePositionCommandHandler;
        this.listen();
    }

    private listen(): void {
        this._commandBus.on('GenerateANewGridCommand', (cmd: GenerateANewGridCommand) => {
            this._generateANewGridCommandHandler.handle(cmd)
        })
        this._commandBus.on('ClearThePositionCommand', (cmd: ClearThePositionCommand) => {
            this._clearThePositionCommandHandler.handle(cmd);
        })
    }
}
