import {RandomMines} from "../../../src/Domain/Service/RandomMines";

describe('random mines service', () => {
    it('success random', () => {
        let exclude: number[] = [0, 1, 2, 3];
        let s = new RandomMines();
        let r = s.getRandomIntInclusive(0, 4, exclude)
        expect(r).toBe(4);
    })

    it('get mines position success', () => {
        let s = new RandomMines();
        let r = s.getMinesPosition(25, 8);
        expect(r.length).toBe(8);
    })
})
