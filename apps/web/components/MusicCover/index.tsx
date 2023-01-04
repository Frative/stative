/* eslint-disable @next/next/no-img-element */
export interface MusicCoverProps {
  image: string
  author: string
  name: string
  quote: string
}

export function MusicCover(props: MusicCoverProps) {
  return (
    <div
      className="w-[540px] h-[540px] p-10 m-auto"
    >
      <div className="shadow-neutral-500 w-full h-full rounded-lg shadow-sm py-10 px-5 flex flex-col">
        <div className="flex w-full">
          <div className="w-[150px] h-[150px] min-w-[150px]">
            <img
              className="object-cover object-center h-[inherit] rounded-md"
              alt="Song cover"
              src={props.image}
            />
          </div>

          <div className="ml-5">
            <div className="uppercase text-xl font-medium">{ props.author }</div>
            <div className="text-sm uppercase">{ props.name }</div>
          </div>
        </div>

        <div className="flex flex-1 items-center text-2xl font-light">
          <div className="text-center flex-1">
            <span>&quot;</span>
            <span>{ props.quote }</span>
            <span>&quot;</span>
          </div>
        </div>
      </div>

      <div className="text-xs text-center my-2.5 tracking-widest">STATIVE</div>
    </div>
  )
}