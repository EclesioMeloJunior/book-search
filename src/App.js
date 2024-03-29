import "./App.css";
import { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import Pagination from "./Pagination";
import BookInformations from "./BookInformations";

const API_HOST = "https://openlibrary.org";

function App() {
  const [query, setQuery] = useState("");
  const [bookInformations, setBookInformations] = useState(null);

  const [maxPage, setMaxPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(`pagina atual: ${currentPage}`);
    if (query !== "") {
      executeAPICall(query, currentPage);
    }
  }, [currentPage, query]);

  const handleChangePage = (currentPage, wantedPage) => {
    if (wantedPage >= 1 && wantedPage <= maxPage) {
      return wantedPage;
    }

    return currentPage;
  };

  const executeAPICall = async (query, page) => {
    setIsLoading(true);
    console.log(`executing call with query: ${query}`);
    const response = await fetch(
      `${API_HOST}/search.json?q=${query}&fields=key,language,title,author_name,publish_year&page=${page}&limit=1`,
      {
        method: "GET",
      }
    );

    const responseBody = await response.json();

    if (responseBody.numFound > 0) {
      setMaxPage(responseBody.numFound);
    }

    if (responseBody.docs !== null && responseBody.docs.length > 0) {
      setBookInformations(responseBody.docs[0]);
    } else {
      setBookInformations(null);
    }

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center align-center">
        <SearchForm
          onSubmit={(query) => {
            setQuery(query);
            setCurrentPage(1);
          }}
        />

        {isLoading === true ? (
          <>
            <div className="mt-6 border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <BookInformations informations={bookInformations} />
        )}

        <div className="mt-10 flex justify-center">
          <Pagination
            max={maxPage}
            page={currentPage}
            className="w-1/2"
            query={query}
            onNext={() =>
              setCurrentPage((current) =>
                handleChangePage(current, current + 1)
              )
            }
            onPrevious={() =>
              setCurrentPage((current) =>
                handleChangePage(current, current - 1)
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
