export interface RenderMinesWeeperInterface {
    showGrid(grid: GridInterface): string[];
}

export interface GameUIInterface {
    start(): void
}

export interface CommandBusInterface {
    on(event: string | symbol, listener: (...args: any[]) => void): this
    emit(event: string | symbol, ...args: any[]): boolean
    addListener(event: string | symbol, listener: (...args: any[]) => void): this;
}

export interface CommandInterface {
}
export interface CommandListenerInterface {
    listen(): void
}
export interface CommandHandlerInterface {
    handle(command: CommandInterface): void
}

export interface EventBusInterface {
    on(event: string | symbol, listener: (...args: any[]) => void): this
    emit(event: string | symbol, ...args: any[]): boolean
    addListener(event: string | symbol, listener: (...args: any[]) => void): this;
}

export interface EventInterface {
}

export interface CellInterface {
    getPositionX(): number;

    getPositionY(): number;

    isMined(): boolean;

    isDiscover(): boolean;

    setDiscover(discover: boolean): void;

    getNumberOfMinesAdjacent(): number | null;

    setNumberOfMinesAdjacent(value: number | null): void;
}

export interface GridInterface {
    getCells(): CellInterface[];
    getSize(): number;
}

export interface FactoryInterface {
}

export interface ServiceInterface {
}

export interface AdjacentMinesInterface{
    countMines(x: number, y: number, grid: GridInterface): number;
    getCellsAdjacent(x: number, y: number, grid: GridInterface): CellInterface[];
}

export interface ValidatorInterface {
    isValid(): boolean
}

export interface AutoDiscoverMinesInterface {
    autoDiscover(x: number, y: number, grid: GridInterface): void;
}