import { State, bind } from "./state";

export type Stack = number[];

export const push = (x: number) : State<Stack,undefined> => {
    return ((s: Stack) => [[x].concat(s),undefined])
}

export const pop: State<Stack,number> = (x) => {
    return [x.slice(1), x[0]]
}

export const stackManip: State<Stack,undefined> = 
    bind(pop, x => bind(push(x*x), () => bind(pop, (y) => push(x+y))))
