import { JobResponse } from "@/app/page";
import { motion } from "framer-motion";
import { BorderBeam } from "./magicui/border-beam";
import SparklesText from "./magicui/sparkles-text";
import BoxReveal from "./magicui/box-reveal";

type JobResultProps = {
  response: JobResponse;
};

export default function JobResult({ response }: JobResultProps) {
  return (
    <motion.div
      className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 p-8 border border-gray-200 shadow-lg relative bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BorderBeam duration={12} delay={9} />

      {/* Left Column (Reasons) */}
      <div className="flex flex-col space-y-4">
        <SparklesText text={response.replacedIn ?? "unknown"} className="text-2xl font-bold text-gray-800" />
        
        <div>
          <BoxReveal boxColor={"#d3d3d3"} duration={0.5}>
            <p className="text-lg font-semibold text-gray-700 mb-2">Why</p>
          </BoxReveal>

          {/* Scrollable Reasons */}
          <BoxReveal boxColor={"#d3d3d3"} duration={0.5}>
            <div className="max-h-64 overflow-y-auto custom-scrollbar pr-2">
              <ul className="list-none space-y-1 text-gray-600">
                {response.reason.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>
          </BoxReveal>
        </div>
      </div>

      {/* Right Column (Responsibilities) */}
      <div className="flex flex-col space-y-4 p-2">
        <div>
          <BoxReveal boxColor={"#d3d3d3"} duration={0.5}>
            <p className="text-lg font-semibold text-gray-700 mb-2">About</p>
          </BoxReveal>

          {/* Scrollable Responsibilities */}
          <BoxReveal boxColor={"#d3d3d3"} duration={0.5}>
            <div className="max-h-64 overflow-y-auto custom-scrollbar p-4">
              <ul className="list-none space-y-1 text-gray-600">
                {response.importantResponsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>
          </BoxReveal>

          {/* Similar Jobs */}
          <BoxReveal boxColor={"#d3d3d3"} duration={0.5}>
            <p className="mt-8 text-gray-600">
              {response.similarJobs?.map((job, index) => (
                <span key={index}>
                  {job}
                  {index !== response.similarJobs.length - 1 && " | "}
                </span>
              ))}
            </p>
          </BoxReveal>
        </div>
      </div>
    </motion.div>
  );
}
