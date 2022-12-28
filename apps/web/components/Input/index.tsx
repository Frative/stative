import classNames from 'classnames'
import {InputHTMLAttributes} from "react";

export interface InputProps {
  htmlInputProps?: InputHTMLAttributes<HTMLInputElement>
}

export function Input(props: InputProps) {
  return (
    <>
      <label htmlFor={props.htmlInputProps.id}></label>
      <input
        {...props.htmlInputProps}
        className={classNames(
          'outline-none w-full transition-all ease-in-out duration-300',
          'shadow-sm focus:shadow-neutral-400',
          'border-2 border-blue-400 border-solid',
          'rounded-lg',
          'px-2.5',
          'text-xs'
        )}
      />
    </>
  )
}
