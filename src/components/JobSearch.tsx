"use client";
import { motion } from "framer-motion";
import { ShimmerButton } from "./ui/shimmer-button";
import { useState } from "react";

type JobSearchProps = {
  jobTitle: string;
  setJobTitle: (title: string) => void;
  onSearch: () => void;
  isLoading: boolean;
};

export default function JobSearch({
  jobTitle,
  setJobTitle,
  onSearch,
  isLoading,
}: JobSearchProps) {
  const [error, setError] = useState(false); // Error state to indicate empty input

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading && jobTitle.trim() !== "") {
      onSearch();
    } else if (jobTitle.trim() === "") {
      setError(true); // Trigger error when input is empty
    }
  };

  const handleSearchClick = () => {
    if (jobTitle.trim() === "") {
      setError(true); // Trigger error when input is empty
    } else {
      setError(false);
      onSearch();
    }
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isLoading ? -30 : 0 }}
      className="mt-8 flex flex-row "
    >
      <input
        type="text"
        value={jobTitle}
        onChange={(e) => {
          setJobTitle(e.target.value);
          setError(false); // Reset error on input change
        }}
        onKeyPress={handleKeyPress}
        placeholder="Enter Job Title"
        className={`px-4 py-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      <ShimmerButton
        height="42px"
        className="ml-4 px-4 py-2 border-none focus:outline-none focus:ring-0 hover:border-none active:border-none"
        text="Predict"
        onClick={handleSearchClick}
        disabled={isLoading || jobTitle.trim() === ""} // Disable when loading or input is empty
      />
      {error && <p className="text-red-500 mt-2 ml-2">Job title is required!</p>} {/* Error message */}
    </motion.div>
  );
}
