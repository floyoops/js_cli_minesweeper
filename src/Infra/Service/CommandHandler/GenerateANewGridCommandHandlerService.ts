import {GenerateANewGridCommandHandler} from "../../../Application/Command/GenerateANewGrid/GenerateANewGridCommandHandler";
import {inject, injectable} from "inversify";
import {GridFactory} from "../../../Domain/Factory/GridFactory";
import {TYPES} from "../../Inversify/types";
import {EventBusInterface} from "../../../Domain/interfaces";

@injectable()
export class GenerateANewGridCommandHandlerService extends GenerateANewGridCommandHandler{
    constructor (
        @inject(TYPES.GridFactory) gridFactory: GridFactory,
        @inject(TYPES.EventBus) eventBus: EventBusInterface
    ) {
        super(gridFactory, eventBus);
    }
}
