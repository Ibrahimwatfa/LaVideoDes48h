import { io } from "socket.io-client"

export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}${path}`
}

export function getStrapiMedia(url: string | null) {
  if (url == null) {
    return null
  }

  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith("http") || url.startsWith("//")) {
    return url
  }

  // Otherwise prepend the URL path with the Strapi URL
  return `${getStrapiURL()}${url}`
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return date.toLocaleDateString("en-US", options)
}

// ADDS DELAY TO SIMULATE SLOW API REMOVE FOR PRODUCTION
export const delay = (time: number) => new Promise(resolve => setTimeout(() => resolve(1), time))

// Socket.io connection init
export const initSocketIo = () => io(getStrapiURL())

export const formatNumber = (num: number, digits: number = 1) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })

  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0"
}
