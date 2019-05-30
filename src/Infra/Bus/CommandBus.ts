import { EventEmitter } from 'events';
import {injectable} from "inversify";
import {CommandBusInterface} from "../../Domain/interfaces";

@injectable()
export class CommandBus extends EventEmitter implements CommandBusInterface {
}
