import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";

// Context (Warehouse)
const AppContext = React.createContext();

// Open Library API base URL
const URL = "https://openlibrary.org/search.json?title=";

// Gita Slok counts per chapter
const slokcount = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78];

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("java");
  const [searchResult, setSearchResult] = useState("java");

  const [verse, setVerse] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [slok, setSlok] = useState(null);

  // Replace spaces/dots with +
  const searchQueryValue = useMemo(() => searchQuery.replace(/[ .]+/g, '+'), [searchQuery]);

  // Fetch Gita verse using local backend proxy
//   useEffect(() => {
//     const gitaChapter = Math.floor(Math.random() * 17) + 1;
//     const gitaSlok = Math.floor(Math.random() * slokcount[gitaChapter - 1]) + 1;
//     setChapter(gitaChapter);
//     setSlok(gitaSlok);

//     async function fetchGitaVerse() {
//       try {
//         const response = await fetch(`http://localhost:5000/api/gita/${gitaChapter}/${gitaSlok}`);
//         const data = await response.json();
//         setVerse(data);
//       } catch (e) {
//         setError({
//           message: "Failed to fetch Gita verse.",
//           statusCode: 500,
//           type: "fetch-gita-error",
//         });
//       }
//     }

//     fetchGitaVerse();
//   }, []);

  // Fetch books based on query
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${URL}${searchQueryValue}`);
      const data = await response.json();
      const { docs } = data;

      if (docs.length > 0) {
        setSearchResult(`Result for "${searchQuery}" found`);
        const newBooks = docs.map((bookSingle) => {
          const {
            key,
            author_name,
            cover_i,
            edition_count,
            first_publish_year,
            title,
            public_scan_b,
            language,
            number_of_pages_median,
            ia,
            seed,
          } = bookSingle;

          return {
            id: key,
            author: author_name,
            cover_id: cover_i,
            edition_count,
            first_publish_year,
            title,
            available: public_scan_b,
            language,
            pages: number_of_pages_median,
            read_link: ia,
            seed,
          };
        });
        setBooks(newBooks);
      } else {
        setSearchResult(`No result for "${searchQuery}"`);
        setError({
          message: `No results found for ${searchQuery}`,
          statusCode: response.status,
          type: response.type,
        });
      }
    } catch (e) {
      console.error(e);
      setError({
        message: "An error occurred while fetching books.",
        statusCode: 500,
        type: "fetch-books-error",
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchQueryValue, searchQuery]);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [fetchData]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        error,
        books,
        setSearchQuery,
        searchQuery,
        searchResult,
        chapter,
        slok,
        verse,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook
const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider, useGlobalContext };
