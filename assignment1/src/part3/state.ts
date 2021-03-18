export type State<S, A> = (initialState: S) => [S, A];

// const die: State<number,number> = (seed) => {
//     const newSeed = random(seed);
//     const die = 1 + Math.floor(newSeed / 1052010 * 6);
//     return [newSeed, die];
//     };


export const bind = <S, A, B>(state: State<S, A>, f: (x: A) => State<S, B>) : State<S, B> => {
    return (x : S) => f(state(x)[1])(state(x)[0])
}
// const rollTwoDice: State<number, [number, number]> =
//     bind(die, die1 => bind(die, die2 => s => [s, [die1, die2]]));



// const random = (seed: number): number =>
//     (80189 * seed + 190886) % 1052010;


// const seed = 42;
// const [newSeed, dice] = rollTwoDice(seed);
// console.log(dice); // ==> [ 3, 6 ]