import { State, bind } from "./state";

export type Queue = number[];

export const enqueue = (input : number) : State<Queue, number | undefined> => {
    return (q : Queue) => [q.concat([input]), undefined];
};

export const dequeue:State<Queue,number> =  (q) => {
    return [q.slice(1), q[0]]
};

export const queueManip:State<Queue, number|undefined> = 
    bind(dequeue, x => bind(enqueue(2*x), () => bind(enqueue(x/3), ()=> dequeue)));