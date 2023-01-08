import classNames from "classnames"
import { useEffect, useState } from "react"

export function GlobalLoader() {
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    setRendered(true)
  }, [rendered])

  return (
    <div
      className={classNames(
        'fixed w-full h-full left-0 top-0 bg-black flex items-center justify-center transition-all ease-in-out duration-500',
        {
          'bg-opacity-40': rendered,
          'bg-opacity-0': !rendered,
        }

      )}
    >
      <div className="text-white flex flex-col items-center justify-center">
        <span
          style={{ borderRadius: '50%', borderBottomColor: 'transparent', borderWidth: '0.15em' }}
          className="align-middle text-center inline-block border-solid animate-spin w-[1em] h-[1em] border-white text-sm"
        ></span>

        <p className="my-2.5 text-xs">Processing</p>
      </div>
    </div>
  )
}