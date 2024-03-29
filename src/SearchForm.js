import { useState } from "react";

function SearchForm({ onSubmit }) {
  const [bookInfo, setBookInfo] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(bookInfo);
  };

  return (
    <form className="mt-10 flex justify-center" onSubmit={handleOnSubmit}>
      <div className="sm:col-span-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Buscar informações de um livro
        </label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input
              type="text"
              name="book"
              id="book"
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="The Lord Of The Rings"
              value={bookInfo}
              onChange={(e) => setBookInfo(e.target.value)}
            />
          </div>

          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              className=" inline-block rounded bg-blue-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
