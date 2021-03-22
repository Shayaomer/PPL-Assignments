export type State<S, A> = (initialState: S) => [S, A];

export const bind = <S, A, B>(state: State<S, A>, f: (x: A) => State<S, B>) : State<S, B> => {
    return (x : S) => f(state(x)[1])(state(x)[0])
}
