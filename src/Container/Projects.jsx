import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MdCopyAll } from "react-icons/md";
import { ToastContainer, toast } from "react-custom-alert";
import "react-custom-alert/dist/index.css";

const Projects = () => {
  const projects = useSelector((state) => state.projects?.projects);
  const searchTerm = useSelector((state) =>
    state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : ""
  );
  const [filtered, setFiltered] = useState(null);

  useEffect(() => {
    if (searchTerm?.length > 0) {
      setFiltered(
        projects?.filter((project) => {
          const lowerCaseItem = project?.title.toLowerCase();
          return searchTerm
            .split("")
            .every((letter) => lowerCaseItem.includes(letter));
        })
      );
    } else {
      setFiltered(null);
    }
  }, [searchTerm, projects]);

  const copyToClipboard = (output) => {
    navigator.clipboard.writeText(output);
    toast.success("Code copied to clipboard successfully!");
  };

  return (
    <div className="w-full py-6 flex items-center justify-center gap-6 flex-wrap">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ToastContainer floatingTime={2000} />
      </motion.div>
      {filtered ? (
        <>
          {filtered &&
            filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                copyToClipboard={copyToClipboard}
              />
            ))}
        </>
      ) : (
        <>
          {projects &&
            projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                copyToClipboard={copyToClipboard}
              />
            ))}
        </>
      )}
    </div>
  );
};

const ProjectCard = ({ project, index, copyToClipboard }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className=" overflow-hidden w-full cursor-pointer md:w-[450px] h-[375px] bg-secondary rounded-md p-4 flex flex-col items-center justify-center gap-4"
    >
      <div
        className="bg-primary w-full rounded-md overflow-hidden"
        style={{ overflow: "hidden", height: "100%" }}
      >
        <iframe
          title="Result"
          srcDoc={project.output}
          style={{
            border: "none",
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        ></iframe>
      </div>

      <div className="flex items-center justify-start gap-3 w-full">
        {/* image */}
        <div className="w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
          {project?.user?.photoURL ? (
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={project?.user?.photoURL}
              alt={project?.user?.displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-xl text-white font-semibold capitalize">
              {project?.user?.email[0]}
            </p>
          )}
        </div>
        {/* user name */}
        <div>
          <p className="text-primaryText text-lg font-semibold">
            {project?.title}
          </p>
          <p className="text-gray-500 text-sm">
            {project?.user?.displayName
              ? project?.user?.displayName
              : `${project?.user?.email.split("@")[0]}`}
          </p>
        </div>

        {/* collection */}
        <motion.div
          className="cursor-pointer ml-auto "
          whileTap={{ scale: 0.9 }}
          onClick={() => copyToClipboard(project.output)}
        >
          <MdCopyAll className="text-primaryText text-3xl" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;
