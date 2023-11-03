import classNames from "classnames"
import { HeroProps } from "../utils/model"
import HighlightedText from "./HighlightedText"
import Media from "./Media"
import { getStrapiMedia } from "../utils/api-helpers"

export default function Hero({
  title,
  description,
  image,
  background,
  repeatBackground,
}: HeroProps) {
  const backgroundImageUrl = getStrapiMedia(background.data?.attributes?.url) ?? ""

  return (
    <section
      className={classNames("sm:-mt-16 bg-sky-600", {
        "bg-repeat": repeatBackground,
        "bg-cover": !repeatBackground,
      })}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="container flex flex-col items-center justify-center mx-auto pt-4 sm:pt-0 sm:px-4 sm:flex-row sm:justify-between">
        <div className="flex flex-col justify-center text-center md:max-w-sm md:text-left">
          <HighlightedText
            text={title}
            tag="h1"
            className="text-3xl lg:text-7xl font-bold text-white"
          />

          {description && (
            <HighlightedText text={description} tag="p" className="tmt-6 mb-8 text-lg sm:mb-12" />
          )}
        </div>
        {image.data && (
          <div className="overflow-hidden h-40 sm:h-auto">
            <Media {...image.data.attributes} />
          </div>
        )}
      </div>
    </section>
  )
}
