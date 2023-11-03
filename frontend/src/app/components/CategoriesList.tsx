"use client"

import {
  FaRegFaceLaughBeam,
  FaLanguage,
  FaRegObjectGroup,
  FaTreeCity,
  FaYoutube,
} from "react-icons/fa6"
import { GiPositionMarker, GiMountainClimbing, GiMusicalNotes } from "react-icons/gi"
import { RxLetterCaseToggle } from "react-icons/rx"
import { SiStylelint } from "react-icons/si"
import { CategoriesList, Category, ModalsState, Suggestion } from "../utils/model"
import { useEffect, useState } from "react"
import { initSocketIo } from "../utils/api-helpers"
import SidePanel from "./SidePanel"
import AddSuggestionPopup from "./AddSuggestionPopup"
import SuggestionList from "./SuggestionList"
import { getCategories } from "../utils/get-page-by-slug"

function RenderCategoryIcon(slug: string | undefined) {
  switch (slug) {
    case "acteur-humoriste":
      return <FaRegFaceLaughBeam size={24} />
    case "costume":
      return <SiStylelint size={24} />
    case "langue":
      return <FaLanguage size={24} />
    case "lieu":
      return <GiPositionMarker size={24} />
    case "mission":
      return <GiMountainClimbing size={24} />
    case "objet":
      return <FaRegObjectGroup size={24} />
    case "phrase":
      return <RxLetterCaseToggle size={24} />
    case "chanteur-musicien":
      return <GiMusicalNotes size={24} />
    case "ville-d-europe":
      return <FaTreeCity size={24} />
    case "youtubeur":
      return <FaYoutube size={24} />
    default:
      return null
  }
}

export default function () {
  const [categoriesList, setCategoriesList] = useState<Array<Category>>()
  const [openPanel, setOpenPanel] = useState<ModalsState>({
    isOpen: false,
    category: undefined,
  })
  const [openAddPopup, setOpenAddPopup] = useState<ModalsState>({
    isOpen: false,
    category: undefined,
  })
  const [triggerGetCategories, setTriggerGetCategories] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (triggerGetCategories) {
      getCategories().then(response => {
        setCategoriesList(response.data)

        // Check if the side panel is open and change the active category
        if (openPanel.isOpen) {
          setOpenPanel({
            isOpen: openPanel.isOpen,
            category: response.data?.find(
              (category: Category) => category.id === openPanel.category?.id
            ),
          })
        }

        setLoading(false)
        setTriggerGetCategories(false)
      })
    }
  }, [triggerGetCategories, loading])

  useEffect(() => {
    // Init websocket connection
    const socket = initSocketIo()
    socket.on("suggestion:create", () => {
      setTriggerGetCategories(true)
    })
    socket.on("suggestion:update", () => {
      setTriggerGetCategories(true)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div className="container mx-auto my-4 ">
      {loading && (
        <div className="text-center">
          <svg
            className="animate-spin h-5 w-5 text-sky-600 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoriesList?.map(category => {
          return (
            <div
              key={category.attributes.title}
              className="flex flex-col rounded-2xl p-5 shadow-lg ring-1 ring-gray-900/5 lg:max-w-2xl"
            >
              <div className="mx-auto flex items-center justify-center">
                <span className="rounded-lg p-2 bg-gray-200">
                  {RenderCategoryIcon(category.attributes.slug)}
                </span>
                <span className="text-2xl ml-3 text-gray-900">{category.attributes.title}</span>
              </div>
              <SuggestionList suggestions={category.attributes.suggestions?.data} />
              <div className="text-center">
                {category.attributes.suggestions?.data?.length > 3 && (
                  <button
                    type="submit"
                    className="mt-5 rounded-md bg-sky-600 hover:bg-yellow-500 transition ease-in-out px-8 py-3 text-base font-medium text-white"
                    onClick={() =>
                      setOpenPanel({
                        isOpen: true,
                        category,
                      })
                    }
                  >
                    Voir plus
                  </button>
                )}
                {category.attributes.suggestions?.data?.length <= 3 && (
                  <button
                    type="submit"
                    className="mt-5 rounded-md bg-sky-600 hover:bg-yellow-500 transition ease-in-out px-8 py-3 text-base font-medium text-white"
                    onClick={() =>
                      setOpenAddPopup({
                        isOpen: true,
                        category,
                      })
                    }
                  >
                    Soumettre ma suggestion
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <SidePanel {...openPanel} setOpenPanel={setOpenPanel} setOpenAddPopup={setOpenAddPopup} />
      <AddSuggestionPopup {...openAddPopup} setOpenAddPopup={setOpenAddPopup} />
    </div>
  )
}
