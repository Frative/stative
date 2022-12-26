import classNames from 'classnames'

export interface ButtonProps {
  title: string
}

export function Button(props: ButtonProps) {
  return (
    <button
      className={classNames(
        // 'bg-primary-light dark:bg-primary-dark',
        'bg-yellow-400',
        'rounded-lg shadow-sm shadow-neutral-400',
        'py-2.5 px-5',
        'transition-shadow',
        'transition-all ease-in-out hover:bg-yellow-300 hover:duration-300',
        'active:bg-yellow-400 active:duration-100'
      )}
    >
      { props.title }
    </button>
  )
}
