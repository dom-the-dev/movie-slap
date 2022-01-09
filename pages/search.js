import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import {useRouter} from "next/router";
import {searchApi} from "../helper/movies";
import SearchResultsList from "../components/SearchResultsList";
import {BiSkipNext, BiSkipPrevious} from "react-icons/bi";
import SearchBar from "../components/SearchBar";
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";

const Search = () => {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [type, setType] = useState("movie");
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);

    useEffect(() => {
        if (router.query.query) {
            setSearchQuery(router.query.query)
            fetchResults(router.query.query, page)
        }

    }, [router]);

    async function fetchResults(query, nextPage) {
        const {results, page, total_pages} = await searchApi(type, query, nextPage)

        setPage(page)
        setMaxPages(total_pages)
        setResults(results)
    }

    const Pagination = () => {
        return (
            <div className={`my-5 flex justify-end`}>
                <button
                    className={`mr-2 bg-white text-dark hover:text-brand border-white`}
                    disabled={page <= 1}
                    title={"previous page"}
                    onClick={() => fetchResults(searchQuery, page - 1)}
                >
                    <span className="sr-only">prev</span>
                    <AiFillCaretLeft/>
                    <span className="sr-only">previous page</span>
                </button>
                <button
                    className={`bg-white text-dark hover:text-brand border-white`}
                    onClick={() => fetchResults(searchQuery, page + 1)}
                    disabled={page >= maxPages}
                    title={"next page"}
                >
                    <AiFillCaretRight/>
                    <span className="sr-only">next page</span>
                </button>
            </div>
        )
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (!searchQuery) return

        fetchResults(searchQuery, 1)
        setPage(1)
    }

    return (
        <Layout title={"Search"}>
            <div
                className={`h-40 sm:h-56 md:h-64 bg-light mb-7 bg-fixed bg-top bg-contain p-10 rounded-3xl flex flex-col items-center justify-center`}
            >
                <h1 className={`text-white`}>Search for any movie or tv show</h1>
                <SearchBar handleSearch={handleSearch} query={searchQuery} setQuery={setSearchQuery}/>
            </div>


            {results.length && maxPages > 1 ? <Pagination/> : null}

            <div className={`grid gap-5 grid-cols-2 sm:grid-cols-4 md:grid-cols-5`}>
                <SearchResultsList type={type} results={results}/>
            </div>

            {results.length && maxPages > 1 ? <Pagination/> : null}

        </Layout>
    );
};

export default Search;
