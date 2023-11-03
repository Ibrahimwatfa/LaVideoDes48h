import CategoriesList from "../components/CategoriesList"
import Hero from "../components/Hero"
import RichText from "../components/RichText"

export function sectionRenderer(section: any, index: number) {
  switch (section.__component) {
    case "sections.hero":
      return <Hero key={index} {...section} />
    case "sections.categories-list":
      return <CategoriesList key={index} />
    case "sections.rich-text":
      return <RichText key={index} data={section} />
    default:
      return null
  }
}
