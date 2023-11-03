import Image from "next/image"
import { getStrapiMedia } from "../utils/api-helpers"
import { Media, MediaExtended } from "../utils/model"

export default function Media(media: Media & MediaExtended) {
  const imgUrl = getStrapiMedia(media.url)
  return (
    <Image
      src={imgUrl || ""}
      alt={media.alternativeText || "none provided"}
      className=""
      {...(media.isBackground
        ? { fill: true }
        : {
            width: 350,
            height: 350,
          })}
    />
  )
}
