import { useEffect, DependencyList } from 'react';

export function useDebounceEffect(
    fn: () => void,
    waitTime: number,
    deps?: DependencyList
) {
    useEffect(() => {
        // @ts-ignore
        const t = setTimeout(() => fn.apply(undefined, deps), waitTime);

        return () => {
            clearTimeout(t);
        };
    }, deps);
}
