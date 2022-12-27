import { PropsWithChildren } from "react";

export function Card(props: PropsWithChildren) {
  return (
      <div className="shadow-sm shadow-neutral-400 px-2.5 py-5 rounded-lg mb-10">
        {props.children}
      </div>
  )
}