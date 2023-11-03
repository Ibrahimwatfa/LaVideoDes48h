import { FaRegHeart, FaHeart } from "react-icons/fa6"
import { Suggestion } from "../utils/model"
import { formatNumber, getStrapiURL } from "../utils/api-helpers"
import { useState } from "react"

export default function SuggestionList({
  suggestions,
  displayAll = false,
}: {
  suggestions: Array<Suggestion>
  displayAll?: boolean
}) {
  if (!suggestions || !suggestions.length) return null

  const [errorMessage, setErrorMessage] = useState("")
  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN

  const likeAction = async (suggestion: Suggestion) => {
    const res = await fetch(`${getStrapiURL()}/api/suggestions/${suggestion.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: { likes: Number(suggestion.attributes.likes) + 1 } }),
    })

    if (!res.ok) {
      return
    }

    const userLikes = localStorage.getItem("lavideodes48h-user-likes")

    if (!userLikes) {
      localStorage.setItem("lavideodes48h-user-likes", suggestion.id.toString())
    } else {
      const newUserLikes = userLikes.concat("-").concat(suggestion.id.toString())
      localStorage.setItem("lavideodes48h-user-likes", newUserLikes)
    }
  }

  const unlikeAction = async (suggestion: Suggestion) => {
    const newLikesCount = Number(suggestion.attributes.likes) - 1

    const res = await fetch(`${getStrapiURL()}/api/suggestions/${suggestion.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: { likes: newLikesCount < 0 ? 0 : newLikesCount } }),
    })

    if (!res.ok) {
      return
    }

    const userLikes = localStorage.getItem("lavideodes48h-user-likes")

    if (userLikes) {
      const newUserLikes = userLikes
        .split("-")
        ?.filter?.((userLike: any) => Number(userLike) !== suggestion.id)
      localStorage.setItem("lavideodes48h-user-likes", newUserLikes.join("-"))
    }
  }

  const isUserLikedSuggestion = (suggestionId: number) => {
    const userLikes = localStorage.getItem("lavideodes48h-user-likes")

    return userLikes?.split("-")?.find?.((userLike: any) => Number(userLike) === suggestionId)
  }

  return (
    <ul role="list" className="divide-y divide-gray-100 pt-2">
      {suggestions.map(
        (suggestion, index) =>
          (index < 3 || displayAll) && (
            <li key={suggestion.id} className="flex justify-between p-4">
              <p className="text-lg font-semibold text-gray-900">{suggestion.attributes.title}</p>
              <div className="flex">
                <span>{formatNumber(suggestion.attributes.likes)}</span>
                {isUserLikedSuggestion(suggestion.id) ? (
                  <FaHeart
                    className="ml-3 cursor-pointer text-red-500"
                    size={24}
                    onClick={() => unlikeAction(suggestion)}
                  />
                ) : (
                  <FaRegHeart
                    className="ml-3 cursor-pointer"
                    size={24}
                    onClick={() => likeAction(suggestion)}
                  />
                )}
              </div>
            </li>
          )
      )}
    </ul>
  )
}
