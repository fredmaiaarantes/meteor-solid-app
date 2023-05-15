import { createSignal } from "solid-js";

export const LinkForm = () => {
  const [title, setTitle] = createSignal("");
  const [url, setUrl] = createSignal("");

  const resetForm = () => {
    setTitle("");
    setUrl("");
  }

  const saveLink = async (e) => {
    e.preventDefault();
    await Meteor.callAsync("insertLink", {title: title(), url: url()});
    resetForm();
  }

  return (
    <form onSubmit={saveLink}>
      <div className="grid grid-cols-1 gap-y-3 py-2">
        <div>
          <label htmlFor="title" className="sr-only">
            New Title
          </label>
          <div>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input
                type="text"
                id="title"
                placeholder="New Title"
                value={title()}
                onInput={(e) => setTitle(e.currentTarget.value)}
                className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm"
              />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="url" className="sr-only">
            New URL
          </label>
          <div>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input
                type="url"
                id="url"
                placeholder="New URL"
                value={url()}
                onInput={(e) => setUrl(e.currentTarget.value)}
                className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-end gap-x-3">
        <button
          onClick={resetForm}
          type="button"
          className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-800 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          Save
        </button>
      </div>
    </form>
  )
}
