const TYPES = {
    RenderMinesWeeper: Symbol.for('RenderMinesWeeper'),
    GameUI: Symbol.for('GameUI'),
    CommandBus: Symbol.for('CommandBus'),
    CommandListener: Symbol.for('CommandListener'),
    EventBus: Symbol.for('EventBus'),
    GenerateANewGridCommandHandler: Symbol.for('GenerateANewGridCommandHandler'),
    ClearThePositionCommandHandler: Symbol.for('ClearThePositionCommandHandler'),
    CellFactory: Symbol.for('CellFactory'),
    GridFactory: Symbol.for('GridFactory'),
    RandomMines: Symbol.for('RandomMines'),
    AdjacentMines: Symbol.for('AdjacentMines'),
    AutoDiscoverMines: Symbol.for('AutoDiscoverMines')
};

export { TYPES }
