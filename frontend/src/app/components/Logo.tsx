import Link from "next/link"
import Image from "next/image"
import { GoHomeFill } from "react-icons/go"

export default function Logo({
  src,
  children,
}: {
  src: string | null
  children?: React.ReactNode
}) {
  return (
    <Link href="/" aria-label="Back to homepage" className="flex items-center">
      {src && <Image src={src} alt="logo" width={45} height={45} />}
      {!src && <GoHomeFill size={22} />}
      <div className="ml-2">{children}</div>
    </Link>
  )
}
