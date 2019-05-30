import { EventEmitter } from 'events';
import {injectable} from "inversify";
import {EventBusInterface} from "../../Domain/interfaces";

@injectable()
export class EventBus extends EventEmitter implements EventBusInterface {
}
