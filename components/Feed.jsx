"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [prompts, setPrompts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPrompts = async () => {
    const response = await fetch("api/prompt");
    const data = await response.json();
    setPrompts(data);
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i")
    return prompts.filter((prompt) => 
      regex.test(prompt.creator.username) ||
      regex.test(prompt.prompt) ||
      regex.test(prompt.tag)
    )
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value)
        setSearchedResults(searchResult)
      }, 500)
    )
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText? (
        <PromptCardList 
        data={searchedResults}
        handleTagClick={handleTagClick} 
      />
      ): (
        <PromptCardList 
        data={prompts}
        handleTagClick={handleTagClick} 
      />
      )}
    </section>
  );
};

export default Feed;
