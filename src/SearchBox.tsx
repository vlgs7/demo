import React, { useState, useEffect, useRef, Fragment } from "react";
import { matchSorter } from "match-sorter";
import suggestionsData from "./keywords.json";
import { AiFillCamera, AiOutlineClose } from "react-icons/ai";
import clsx from "clsx";

interface Suggestion {
  label: string;
  value: number;
}

const SearchBox: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue) {
      const matchedSuggestions = matchSorter(suggestionsData, inputValue, {
        keys: ["text"],
      }).slice(0, 10);
      setSuggestions(
        matchedSuggestions.map((suggestion) => ({
          label: suggestion.text,
          value: suggestion.id,
        }))
      );
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  const clearInput = () => {
    setInputValue("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col items-center  h-screen ">
      <img src="/Baidu.svg" alt="Baidu_Logo" className="mt-64" />
      <div
        className={clsx(
          `mt-6 flex items-center  mx-auto mb-4 border rounded w-4/5  hover:shadow-md border-blue-600 gap-4`,
          suggestions.length > 0 && "border-b-white"
        )}
      >
        <div className="flex-1 bg-transparent rounded-full py-[14px] pl-2 outline-none transition duration-200">
          <div className="retative">
            <input
              ref={inputRef}
              className="bg-transparent rounded-full  outline-none transition duration-200 pl-2"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Search..."
            />

            {suggestions.length > 0 && (
              <div
                className={clsx(
                  "absolute z-10 w-4/5  bg-white border  rounded mt-[14px] clear-both left-[192px]",
                  suggestions.length > 0 &&
                    `border-x-blue-500 border-b-blue-600`
                )}
              >
                <div className="">
                  {suggestions.map((item) => (
                    <div
                      key={item.value}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setInputValue(item.label);
                      }}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {inputValue && (
          <button
            className="text-gray-500 hover:text-gray-700 transition duration-200 items-center"
            onClick={clearInput}
          >
            <AiOutlineClose />
          </button>
        )}
        <AiFillCamera />
        <button className="px-6 py-4 bg-blue-500 text-white  ml-2">
          百度一下
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
