/* 2.1 */

export const MISSING_KEY = '___MISSING___'

type PromisedStore<K, V> = {
    get(key: K): Promise<V>,
    set(key: K, value: V): Promise<void>,
    delete(key: K): Promise<void>
}


export function makePromisedStore<K, V>(): PromisedStore<K, V> {
    const store = new Map<K,V>();
    return {
        get(key: K) : Promise<V> {
            return new Promise<V>((resolve, reject) => {
                const a = store.get(key)
                a != undefined ? resolve(a) : reject(MISSING_KEY) 
            })
        },
        set(key: K, value: V) : Promise<void> {
            return new Promise<void>((resolve, reject) => {
                store.set(key, value)
                console.log(store)
            })
        },
        delete(key: K) : Promise<void> {
            return new Promise<void>((resolve, reject) => {
                store.delete(key) ? resolve() : reject(MISSING_KEY)
            })
        },
    }
}

export function getAll<K, V>(store: PromisedStore<K, V>, keys: K[]): Promise<V[]> {
    return new Promise<V[]>((resolve, reject) => {
    const a : V[] = []
    keys.map((key: K) => store.get(key).then((value)=>a.concat(value)).catch((err)=>err))
    })
}

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
    for (const func of fns)
    {
        try
        {
            x = await func(x)
        }
        catch 
        {
            try
            {
                x = await new Promise((resolve) => setTimeout(()=> resolve(func(x)), 2000))
            }
            catch
            {
                try 
                {
                    x = await new Promise((resolve) => setTimeout(()=> resolve(func(x)), 2000))
                }
                catch (err)
                {
                    throw err
                }
            }

        }
    }
    return x
} 