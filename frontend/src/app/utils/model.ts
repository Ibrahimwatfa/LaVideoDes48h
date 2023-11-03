export interface HeroProps {
  id: string
  title: string
  description: string
  image: Image
  background: Image
  repeatBackground: boolean
}

export interface CategoriesList {
  data: {
    id: number
    title: string
    categories: { data: Array<Category> }
  }
}

export interface Category {
  id: number
  attributes: {
    id: number
    title: string
    slug: string
    description: string
    suggestions: {
      data: Array<Suggestion>
    }
  }
}

export interface Suggestion {
  id: number
  attributes: {
    title: string
    likes: number
    category: Category
  }
}

export interface FooterLink {
  id: number
  url: string
  newTab: boolean
  text: string
  social?: string
}

interface Image {
  data: {
    id: number
    attributes: Media
  }
}
export interface Media {
  url: string
  caption: string
  alternativeText: string
}

export interface MediaExtended {
  isBackground?: boolean
}
export interface ModalsState {
  isOpen: boolean
  category: Category | undefined
}
