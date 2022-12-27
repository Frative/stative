import classNames from 'classnames'

export interface ButtonProps {
  title: string
}

export function Button(props: ButtonProps) {
  return (
    <button
      className={classNames(
        'bg-blue-400',
        'rounded-lg shadow-sm shadow-neutral-400',
        'py-2.5 px-5',
        'transition-shadow',
        'transition-all ease-in-out hover:bg-blue-500 hover:duration-300',
        'active:bg-blue-400 active:duration-100',
        'text-white',
        'text-xs'
      )}
    >
      { props.title }
    </button>
  )
}
