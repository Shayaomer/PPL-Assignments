/* 2.1 */

export const MISSING_KEY = '___MISSING___'

type PromisedStore<K, V> = {
    get(key: K): Promise<V>,
    set(key: K, value: V): Promise<void>,
    delete(key: K): Promise<void>
}


// export function makePromisedStore<K, V>(): PromisedStore<K, V> {
//     ???
//     return {
//         get(key: K) {
//             ???
//         },
//         set(key: K, value: V) {
//             ???
//         },
//         delete(key: K) {
//             ???
//         },
//     }
// }

// export function getAll<K, V>(store: PromisedStore<K, V>, keys: K[]): ??? {
//     ???
// }

/* 2.2 */

// ??? (you may want to add helper functions here)
//
// export function asycMemo<T, R>(f: (param: T) => R): (param: T) => Promise<R> {
//     ???
// }

/* 2.3 */

export function lazyFilter<T>(genFn: () => Generator<T>, filterFn: (param: T) => boolean) : () => Generator<T> {
    return function * () : Generator<T>
    {
        for (const next of genFn())
        {
            if (filterFn(next))
            {
                {yield next}
            }
        }
    }
}

export function lazyMap<T, R>(genFn: () => Generator<T>, mapFn: (param: T) => T): () => Generator<T> {
    return function * () : Generator<T>
    {
        for (const next of genFn())
        {
            {yield mapFn(next)}
        }
    }
}

/* 2.4 */
// you can use 'any' in this question

export async function asyncWaterfallWithRetry(fns: [() => Promise<any>, ...((param: any) => Promise<any>)[]]): Promise<any> {
    let x: any = undefined
    let y : any
    for (const func of fns)
    {
        try
        {
            y = await func(x)
        }
        catch 
        {
            try
            {
                y = await new Promise((resolve) => setTimeout(()=> resolve(func(x)), 2000))
            }
            catch
            {
                try 
                {
                    y = await new Promise((resolve) => setTimeout(()=> resolve(func(x)), 2000))
                }
                catch (err)
                {
                    throw err
                }
            }
            
        }
        x = y
    }
    return x
}