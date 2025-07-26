import { SearchFormProps } from "@/interfaces";
import React from "react";
import { Button } from "./ui/button";

const SearchForm: React.FC<SearchFormProps> = ({
  search,
  setSearch,
  handleSearch,
  error,
  isLoading = false,
}) => {
  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col items-center justify-center gap-0 w-full max-w-xl mx-auto"
      autoComplete="off"
    >
      <div className="flex flex-row w-full">
        <div className="flex items-center flex-1 bg-white border border-orange-500 px-3 py-2 text-lg shadow-sm h-12">
          <input
            type="text"
            placeholder="Find your perfect domain"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none bg-transparent text-lg text-black"
            autoFocus
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="rounded-none rounded-r-lg px-8 py-3 text-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white shadow transition h-12 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            "Search"
          )}
        </Button>
      </div>
      {error && (
        <div className="text-red-500 text-base mt-3 text-left pl-2 w-full">
          {error}
        </div>
      )}
    </form>
  );
};

export default SearchForm;
