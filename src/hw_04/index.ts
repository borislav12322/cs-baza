class BCD {
    private numbers: number[] = [];

    constructor(num: bigint) {

    }

    valueOf(): bigint {
        return 12312n;
    }

    get(pos: number): number {
        return 1;
    }
}

// console.log(2..toString(2));
// console.log((2 << 8).toString(2));
// console.log((2 << 8 | 9 << 4 | 7).toString(2));
// console.log((9 << 8 | 9 << 4 | 9).toString(2));
// console.log(9 << 8)
// console.log(9 << 4)
//
// let num = 1234;
// while (num > 0) {
//     let digit = num % 10;
//     // console.log(digit);
//     num = Math.floor(num / 10);
// }

console.log((3).toString(2));
console.log((3 << 8 | 2 << 4 | 5).toString(2));