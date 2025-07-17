
const RANDOM_DATA_MAX = 50
const RANDOM_DATA_MIN = 2

/**
 * 0からmax未満のランダムな整数を返す
 * @param max 
 * @returns 
 */
export const rans = (max: number, min: number = 0) => Math.floor(Math.random() * (max - min)) + min

/**
 * RANDOM_DATA_MIN以上RANDOM_DATA_MAX未満の個数のsymbolの配列を返す
 * @returns 
 */
export const randomSymbols = () => new Array(rans(RANDOM_DATA_MAX, RANDOM_DATA_MIN)).map(() => Symbol())