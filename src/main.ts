import {container} from "./Infra/Inversify/inversify.config";
import {GameUIInterface} from "./Domain/interfaces";
import {TYPES} from "./Infra/Inversify/types";

let game = container.get<GameUIInterface>(TYPES.GameUI);
game.start();
