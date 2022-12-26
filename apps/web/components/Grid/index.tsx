import { PropsWithChildren } from "react";

export function Grid(props: PropsWithChildren) {
  return (
    <div className="max-w-2xl w-full m-auto bg-red-100">
      {props.children}
    </div>
  )
}
