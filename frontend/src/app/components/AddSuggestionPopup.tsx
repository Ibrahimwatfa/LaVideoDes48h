import { Dispatch, FormEvent, Fragment, SetStateAction, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { getStrapiURL } from "../utils/api-helpers"
import { ModalsState } from "../utils/model"

export default function AddSuggestionPopup({
  isOpen,
  category,
  setOpenAddPopup,
}: ModalsState & { setOpenAddPopup: Dispatch<SetStateAction<ModalsState>> }) {
  const [isLoading, setIsLoading] = useState<boolean>()
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [successMessage, setSuccessMessage] = useState<string | undefined>()
  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    reset()

    try {
      const formData = new FormData(event.currentTarget)
      const suggestion = formData.get("suggestion") as string

      if (!suggestion || !suggestion?.replace(/ /g, "").length) {
        setErrorMessage("Ce champ est obligatoire!")
        return
      }

      if (!/^[a-zA-Z0-9-_' âàäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/.test(suggestion)) {
        setErrorMessage("Caractères non autorisés!")
        return
      }

      setIsLoading(true) // Set loading to true when the request starts
      const response = await fetch(`${getStrapiURL()}/api/suggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            title: suggestion,
            category: category?.id,
          },
        }),
      })

      if (!response.ok) {
        reset()
        const json = await response.json()

        if (json?.error?.message === "This attribute must be unique") {
          setErrorMessage("Cette proposition a déjà été faite, vous pouvez la liker !")
        } else {
          setErrorMessage("Veuillez réessayer plus tard !")
        }
        return
      }

      setSuccessMessage("La suggestion a bien été ajoutée !")

      setTimeout(() => {
        close()
      }, 2000)
    } catch (error: any) {
      reset()

      if (error?.error?.message === "This attribute must be unique") {
        setErrorMessage("Cette proposition a déjà été faite, vous pouvez la liker !")
      }
    }
  }

  const reset = () => {
    setSuccessMessage(undefined)
    setErrorMessage(undefined)
    setIsLoading(false)
  }

  const close = () => {
    reset()
    setOpenAddPopup({
      isOpen: false,
      category: undefined,
    })
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                <form onSubmit={onSubmit}>
                  <div className="p-4">
                    <h2 className="text-base font-semibold text-gray-900">
                      Soumettre ma suggestion
                    </h2>
                    <div className="flex mt-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
                      <input
                        type="text"
                        name="suggestion"
                        id="suggestion"
                        className="block flex-1 border-0 bg-transparent py-1.5 px-2.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        placeholder="......"
                        required
                        maxLength={100}
                        onChange={reset}
                      />
                    </div>
                    {errorMessage && (
                      <span className="text-red-600 pt-2 block text-sm">{errorMessage}</span>
                    )}
                    {successMessage && (
                      <span className="pt-2 block text-sm text-green-600">{successMessage}</span>
                    )}
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm enabled:hover:bg-yellow-500 disabled:opacity-75 transition ease-in-out sm:ml-3 sm:w-auto"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      )}
                      Soumettre
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={close}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
