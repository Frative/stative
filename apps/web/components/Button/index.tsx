import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'

export interface ButtonProps {
  title: string
  htmlButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>
}

export function Button(props: ButtonProps) {
  return (
    <button
      {...props.htmlButtonProps}
      className={classNames(
        'bg-blue-400',
        'rounded-lg shadow-sm shadow-neutral-400',
        'py-2.5 px-5',
        'transition-shadow',
        'transition-all ease-in-out hover:bg-blue-500 hover:duration-300',
        'active:bg-blue-400 active:duration-100',
        'text-white',
        'text-xs',
        'w-[inherit]'
      )}
    >
      { props.title }
    </button>
  )
}
