import {container} from "./Infra/Inversify/inversify.config";
import {CommandListenerInterface, GameUIInterface} from "./Domain/interfaces";
import {TYPES} from "./Infra/Inversify/types";

container.get<CommandListenerInterface>(TYPES.CommandListener);
let game = container.get<GameUIInterface>(TYPES.GameUI);
game.start();
