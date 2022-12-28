import { useReducer } from 'react'
import { Stage } from '@stative/interfaces'

function reducer(state: any, commit: any) {
	return { ...state, ...commit }
}

export function useStage<S>(initialState: S): Stage<S> {
	const [state, commitState] = useReducer(reducer, initialState)
	return { state, commitState }
}