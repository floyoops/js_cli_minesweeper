import {ServiceInterface} from "../interfaces";

export class RandomMines implements ServiceInterface{

    public getMinesPosition(numberOfCells: number, numberOfMines: number) {
        let positions: number[] = [];
        for(let i = 0; i < numberOfMines; i++) {
            positions.push(this.getRandomIntInclusive(0, (numberOfCells-1), positions));
        }

        return positions;
    }

    public getRandomIntInclusive(min: number, max: number, exclude: number[]): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        let r: number =  Math.floor(Math.random() * (max - min +1)) + min;
        // retry if mine already exist in the cell.
        if (exclude.indexOf(r) > -1) {
            return this.getRandomIntInclusive(min, max, exclude);
        }

        return r;
    }
}
