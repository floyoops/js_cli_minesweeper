import { Container } from "inversify"
import "reflect-metadata"
import {
    AdjacentMinesInterface, AutoDiscoverMinesInterface,
    CommandBusInterface, CommandHandlerInterface,
    CommandListenerInterface, EventBusInterface, FactoryInterface,
    GameUIInterface,
    RenderMinesWeeperInterface, ServiceInterface
} from "../../Domain/interfaces";
import {TYPES} from "./types";
import {RenderArray} from '../Render/RenderArray';
import {MinesWeeperCli} from "../../UI/Cli/MinesWeeperCli";
import {CommandBus} from "../Bus/CommandBus";
import {CommandListener} from "../Bus/CommandListener";
import {GenerateANewGridCommandHandlerService} from "../Service/CommandHandler/GenerateANewGridCommandHandlerService";
import {CellFactoryService} from "../Service/Factory/CellFactoryService";
import {RandomMinesService} from "../Service/RandomMinesService";
import {EventBus} from "../Bus/EventBus";
import {GridFactoryService} from "../Service/Factory/GridFactoryService";
import {ClearThePositionCommandHandlerService} from "../Service/CommandHandler/ClearThePositionCommandHandlerService";
import {AdjacentMinesService} from "../Service/AdjacentMinesService";
import {AutoDiscoverMinesService} from "../Service/AutoDiscoverMinesService";

const container = new Container({skipBaseClassChecks: true});

// infra
container.bind<RenderMinesWeeperInterface>(TYPES.RenderMinesWeeper).to(RenderArray).inSingletonScope();
container.bind<GameUIInterface>(TYPES.GameUI).to(MinesWeeperCli).inSingletonScope();
container.bind<CommandBusInterface>(TYPES.CommandBus).to(CommandBus).inSingletonScope();
container.bind<CommandListenerInterface>(TYPES.CommandListener).to(CommandListener).inSingletonScope();
container.bind<EventBusInterface>(TYPES.EventBus).to(EventBus).inSingletonScope();

// factory
container.bind<FactoryInterface>(TYPES.CellFactory).to(CellFactoryService).inSingletonScope();
container.bind<FactoryInterface>(TYPES.GridFactory).to(GridFactoryService).inSingletonScope();

// service
container.bind<ServiceInterface>(TYPES.RandomMines).to(RandomMinesService).inSingletonScope();
container.bind<AdjacentMinesInterface>(TYPES.AdjacentMines).to(AdjacentMinesService).inSingletonScope();
container.bind<AutoDiscoverMinesInterface>(TYPES.AutoDiscoverMines).to(AutoDiscoverMinesService).inSingletonScope();

// Command handler
container.bind<CommandHandlerInterface>(TYPES.GenerateANewGridCommandHandler).to(GenerateANewGridCommandHandlerService).inSingletonScope();
container.bind<CommandHandlerInterface>(TYPES.ClearThePositionCommandHandler).to(ClearThePositionCommandHandlerService).inSingletonScope();

export { container };
