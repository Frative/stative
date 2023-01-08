import { PropsWithChildren, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from '../../public/images/stative.svg'

export function Layout(props: PropsWithChildren) {
  const currentYear = useMemo(() => new Date().getFullYear(), [])
  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      <div className="border-solid border border-neutral-300">
        <div className="max-w-2xl w-full m-auto flex items-center min-h-[55px]">
          <Link href="/">
            <Image src={Logo} alt="Stative" />
          </Link>
        </div>
      </div>
      
      <div className="flex-1">
        {props.children}
      </div>

      <div className="flex justify-center items-center text-xs text-neutral-500 min-h-[50px]">
        <div>
          <span>Copyright ©</span>
          {" "}
          <span>{currentYear}</span>
          {" "}
          <Link href="https://github.com/lnfrative">Infrative</Link>.
        </div>
      </div>
    </div>
  )
}