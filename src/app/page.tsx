"use client";
import { useState, useEffect } from "react";
import Head from "next/head"; // Import Next.js Head component
import JobSearch from "@/components/JobSearch";
import LoadingAnimation from "@/components/LoadingAnimation";
import JobResult from "@/components/JobResult";
import GitHubButton from "@/components/GitHubButton";
import { motion } from "framer-motion";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import HyperText from "@/components/magicui/hyper-text";

export type JobResponse = {
  title: string;
  replacedIn: string;
  importantResponsibilities: string[];
  reason: string[];
  similarJobs: string[];
};

export default function Home() {
  const [jobTitle, setJobTitle] = useState("");
  const [response, setResponse] = useState<JobResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (response?.title) {
      document.title = `${response.title} | JobExpiresIn`;
    } else {
      document.title = "JobExpiresIn";
    }
  }, [response]);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(`/api/job?jobTitle=${jobTitle}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data: JobResponse = await res.json();
      setResponse(data);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Meta Tags for SEO */}
      <Head>
        <title>{response?.title ? `${response.title} | JobExpiresIn` : "JobExpiresIn"}</title>
        <meta name="description" content="Predict when your job will be replaced by AI. Get insights on job replacement, key responsibilities, similar jobs, and more." />
        <meta name="keywords" content="AI jobs, job replacement, AI predictions, similar jobs, key responsibilities, AI future, automation" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content={response?.title ? `${response.title} | JobExpiresIn` : "JobExpiresIn"} />
        <meta property="og:description" content="Find out when your job might be replaced by AI. Get key responsibilities, similar jobs, and replacement timeframe predictions." />
        <meta property="og:url" content="https://jobexpiresin.vercel.app/" />
        <meta property="og:type" content="website" />


        {/* Canonical URL */}
        <link rel="canonical" href="https://jobexpiresin.vercel.app/" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen py-2 relative overflow-hidden">
        <AnimatedGridPattern
          numSquares={10}
          maxOpacity={0.5}
          duration={3}
          width={80}
          height={80}
          className="absolute bottom-5 right-50 skew-y-12 [mask-image:radial-gradient(1200px_circle_at_bottom_right,white,transparent)]"
        />
        <GitHubButton />
        <motion.div
          className="flex flex-col items-center"
          initial={{ y: 0 }}
          animate={{ y: isLoading ? -150 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {response && response.title ? (
            <HyperText
              className="text-4xl font-bold text-black dark:text-white"
              text={response.title}
              duration={1}
            />
          ) : (
            <HyperText
              className="text-4xl font-bold text-gray-500"
              text="JobExpiresIn"
              animateOnLoad={false}
            />
          )}

          <JobSearch
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </motion.div>

        {isLoading && <LoadingAnimation />}

        {error && !isLoading && (
          <div className="mt-4 text-red-600">
            <p>{error}</p>
          </div>
        )}

        {response && !isLoading && !error && <JobResult response={response} />}

        <p className="absolute bottom-1 mt-2 mb-2 text-center text-[#a0a0a0]">
          This project is just for fun, and the responses are generated by AI.
        </p>
      </div>
    </>
  );
}
