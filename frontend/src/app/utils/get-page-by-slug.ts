import { fetchAPI } from "@/app/utils/fetch-api"
const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

export async function getPageBySlug(slug: string, lang: string) {
  const path = `/pages`
  const urlParamsObject = { filters: { slug }, locale: lang }
  const options = { headers: { Authorization: `Bearer ${token}` } }
  return await fetchAPI(path, urlParamsObject, options)
}

export async function getCategories() {
  const options = { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
  return await fetchAPI(
    "/categories?sort[0]=order:asc&fields[0]=id&fields[1]=title&fields[2]=slug&fields[3]=description&populate[suggestions][sort][0]=likes:desc&populate[suggestions][fields][0]=title&populate[suggestions][fields][1]=likes",
    {},
    options
  )
}
