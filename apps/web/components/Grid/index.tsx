import { PropsWithChildren } from "react";

export function Grid(props: PropsWithChildren) {
  return (
    <div className="max-w-2xl w-full m-auto border-2 border-solid border-red-100 p-2.5">
      {props.children}
    </div>
  )
}
