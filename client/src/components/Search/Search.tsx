import { ChangeEvent, FormEvent } from "react";

interface ISearch {
  handleSearchInputChanges(e: ChangeEvent<HTMLInputElement>): void;
  callSearchFunction(e: FormEvent): void;
  submitWithEnterKey(e: React.KeyboardEvent): void;
}

const Search = ({ handleSearchInputChanges, callSearchFunction, submitWithEnterKey }: ISearch) => {
  return (
    <form className="flex shadow" onSubmit={callSearchFunction}>
      <input
        onChange={handleSearchInputChanges}
        onKeyDown={submitWithEnterKey}
        type="search"
        placeholder="Search"
        className="form-input py-2 px-4 block w-full leading-5 text-gray-700 rounded-l-md focus:outline-none"
      />
      <button type="submit" className="bg-white pr-4 rounded-r-md"> 🔍 </button>
    </form>
  )
}

export default Search;