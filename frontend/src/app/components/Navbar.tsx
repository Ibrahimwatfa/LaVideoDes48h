"use client"
import Logo from "./Logo"

export default function Navbar({
  logoUrl,
  logoText,
}: {
  logoUrl: string | null
  logoText: string | null
}) {
  return (
    <div className="container flex justify-between h-16 mx-auto px-4">
      <Logo src={logoUrl}>{logoText && <h2 className="text-1xl font-bold">{logoText}</h2>}</Logo>
    </div>
  )
}
