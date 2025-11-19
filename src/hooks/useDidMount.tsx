/**
 * React hook that returns a boolean indicating if the component has mounted on the client side.
 *
 * @returns {boolean} `true` if the component has mounted (after the first render on the client), otherwise `false`.
 *
 * @example
 * const didMount = useDidMount();
 * useEffect(() => {
 *   if (didMount) {
 *     // Code that should only run after mount
 *   }
 * }, [didMount]);
 */
import { useEffect, useState } from "react"


export function useDidMount(): boolean {
	const [didMount, setDidMount] = useState(false)

	useEffect(() => {
		if (typeof window !== "undefined") {
			setDidMount(true)
		}
	}, [])

	return didMount
}

