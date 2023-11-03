import type { Metadata } from "next"
import "./globals.css"
import { getStrapiMedia, getStrapiURL, initSocketIo } from "./utils/api-helpers"
import { fetchAPI } from "./utils/fetch-api"

import Banner from "./components/Banner"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { FALLBACK_SEO } from "@/app/utils/constants"

async function getGlobal(): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

  if (!token) throw new Error("The Strapi API Token environment variable is not set.")

  const path = `/global`
  const options = { headers: { Authorization: `Bearer ${token}` } }

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "notificationBanner.link",
      "navbar.navbarLogo.logoImg",
      "footer.legalLinks",
      "footer.socialLinks",
    ],
  }
  return await fetchAPI(path, urlParamsObject, options)
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getGlobal()

  if (!meta.data) return FALLBACK_SEO

  const { metadata, favicon } = meta.data.attributes
  const { url } = favicon.data.attributes

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const global = await getGlobal()
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null

  const { notificationBanner, navbar, footer } = global.data.attributes

  const navbarLogoUrl =
    navbar.navbarLogo.logoImg.data && getStrapiMedia(navbar.navbarLogo.logoImg.data.attributes.url)

  return (
    <html lang={"fr"}>
      <body>
        <Navbar logoUrl={navbarLogoUrl} logoText={navbar.navbarLogo.logoText} />

        <main className="">{children}</main>

        <Banner data={notificationBanner} />

        <Footer legalLinks={footer.legalLinks} socialLinks={footer.socialLinks} />
      </body>
    </html>
  )
}
