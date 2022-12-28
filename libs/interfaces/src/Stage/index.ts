import { Dispatch, SetStateAction } from 'react'

export interface Stage<S> {
	state: S
	commitState: Dispatch<SetStateAction<S>>
}