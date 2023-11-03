import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import SuggestionList from "./SuggestionList"
import { ModalsState, Suggestion } from "../utils/model"

export default function SidePanel({
  isOpen,
  category,
  setOpenPanel,
  setOpenAddPopup,
}: ModalsState & { setOpenPanel: Dispatch<SetStateAction<ModalsState>> } & {
  setOpenAddPopup: Dispatch<SetStateAction<ModalsState>>
}) {
  const [categorySuggestions, setCategorySuggestions] = useState<Array<Suggestion>>([])
  const [filteredSuggestions, setFilteredSuggestions] = useState<Array<Suggestion>>()

  useEffect(() => {
    category && setCategorySuggestions(category?.attributes.suggestions?.data)
  }, [category])

  const filterSuggestions = (value: string) => {
    setFilteredSuggestions(
      value
        ? categorySuggestions.filter((sugg: Suggestion) =>
            sugg?.attributes?.title?.toLocaleLowerCase().includes(value.toLocaleLowerCase())
          )
        : undefined
    )
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() =>
          setOpenPanel({
            isOpen: false,
            category: undefined,
          })
        }
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() =>
                          setOpenPanel({
                            isOpen: false,
                            category: undefined,
                          })
                        }
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    {category && (
                      <>
                        <div className="px-4 sm:px-6 relative">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                            {category?.attributes?.title}
                          </Dialog.Title>
                          <div className="relative mt-2 rounded-md shadow-sm">
                            <input
                              type="text"
                              name="suggestionsFilter"
                              id="suggestionsFilter"
                              className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="Rechercher une suggestion"
                              onChange={event => filterSuggestions(event.currentTarget.value)}
                            />
                          </div>
                        </div>
                        <div className="relative flex-1 px-4 sm:px-6 pb-14">
                          <SuggestionList
                            suggestions={filteredSuggestions ?? categorySuggestions}
                            displayAll
                          />
                        </div>
                        <div className="text-center absolute left-0 bottom-0 w-full bg-white pb-3">
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
                        </div>
                      </>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
