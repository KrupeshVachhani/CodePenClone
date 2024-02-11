import React, { useEffect, useState } from "react";
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";
import SplitPane from "react-split-pane";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { AnimatePresence, motion } from "framer-motion";
import { MdCheck, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { UserProfile, Alert, Spinner } from "../components";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState();
  const [isTitle, setIsTitle] = useState(false);
  const [title, setTitle] = useState("Untitled");
  const [alert, setAlert] = useState(false);

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

  const updateOutput = () => {
    const combinedCode = `
        <html>
            <head>
                <style>
                ${css}
                </style>
            </head>
            <body>
                ${html}
                <script>
                ${js}
                </script>
            </body>
        </html>
        `;
    setOutput(combinedCode);
  };
  const saveProgram = async () => {
    const confirmSave = window.confirm(
      `Are you sure you want to save this project with the title "${title}" & this code? Once it is saved, you cannot edit it again.`
    );

    if (confirmSave) {
      const id = `${Date.now()}`;
      const _doc = {
        id,
        title,
        html,
        css,
        js,
        output,
        user,
      };

      try {
        // Save the project
        await setDoc(doc(db, "projects", id), _doc);

        // Show success alert
        setAlert(true);
        setTimeout(() => setAlert(false), 2000);
        
        // Navigate to home screen after saving
        setTimeout(() => navigate("/home/projects"), 1000);
        
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {/* new project */}
      <div className="w-full h-full flex flex-col items-start justify-start overflow-x-hidden">
        {/* alert */}
        <AnimatePresence>
          {alert && <Alert status={"Success"} alertMessage={"Project Saved"} />}
        </AnimatePresence>

        {/* header */}

        <header className="w-full flex items-center justify-between px-8 py-4">
          <div className="flex items-center justify-center gap-6">
            <Link to={"/home/projects"}>
              <img className="w-32 h-auto object-contain" src={logo} />
            </Link>

            <div className="flex flex-col items-start justify-start">
              {/* title */}
              <div className="flex items-center justify-center gap-3">
                <AnimatePresence>
                  {isTitle ? (
                    <>
                      <motion.input
                        key={isTitle}
                        type="text"
                        placeholder="Your Title"
                        value={title}
                        maxLength={20}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-36 h-8 px-2 mb-4 rounded-md bg-secondary focus:outline-none focus:ring-2 focus:ring-primaryText focus:border-transparent text-primaryText text-md"
                      />
                    </>
                  ) : (
                    <>
                      <motion.p
                        key={"titleLabel"}
                        className=" px-3 py-2 text-white text-lg mb-1"
                      >
                        {title}
                      </motion.p>
                    </>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {isTitle ? (
                    <>
                      <motion.div
                        key={"MdCheck"}
                        whileTap={{ scale: 0.9 }}
                        className="cursor-pointer pb-3"
                        onClick={() => setIsTitle(false)}
                      >
                        <MdCheck className="text-2xl text-green-500" />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        key={"MdCheck"}
                        whileTap={{ scale: 0.9 }}
                        className="cursor-pointer pb-3"
                        onClick={() => setIsTitle(true)}
                      >
                        <MdEdit className="text-2xl text-primaryText" />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* follow */}
              <div className="flex items-center justify-center px-3 -mt-2 gap-3 ">
                <p className="text-white text-sm">
                  {user?.displayName
                    ? user?.displayName
                    : `${user?.email.split("@")[0]}`}
                </p>
                <motion.p
                  whileTap={{ scale: 0.9 }}
                  className="text-[10px] bg-emerald-500 rounded-sm px-2 py-[2] text-primary font-semibold cursor-pointer"
                >
                  + Follow
                </motion.p>
              </div>
            </div>
          </div>

          {/* user section */}
          {user && (
            <div className="flex items-center justify-center gap-4">
              <motion.button
                onClick={saveProgram}
                whileTap={{ scale: 0.9 }}
                className="px-6 py-4 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md"
              >
                Save
              </motion.button>
              <UserProfile />
            </div>
          )}
        </header>

        {/* coding section */}

        {/* horizontal split */}
        <div className="w-full h-full">
          <SplitPane
            split="horizontal"
            minSize={300}
            maxSize={-100}
            defaultSize={"50%"}
          >
            {/* top horizontal split */}
            <SplitPane
              split="vertical"
              minSize={300}
              maxSize={600}
              defaultSize={400}
              className="w-full h-full"
            >
              {/* html */}
              <div className="w-full h-full flex flex-col items-start justify-start">
                <div className="w-full px-4 py-2 border-t-2 border-red-500 flex items-center justify-between bg-secondary">
                  <div className=" flex items-center gap-3">
                    <FaHtml5 className="text-xl text-red-500" />
                    <p className="font-semibold text-red-500">HTML</p>
                  </div>
                  <div className="flex items-center gap-5 px-4 cursor-pointer">
                    <FcSettings className="text-md" />
                    <FaChevronDown className="text-md text-primaryText" />
                  </div>
                </div>
                <div className="w-full p-1 overflow-auto">
                  <CodeMirror
                    value={html}
                    height="600px"
                    extensions={[javascript({ jsx: true })]}
                    theme={"dark"}
                    onChange={(value, viewUpdate) => {
                      setHtml(value);
                    }}
                  />
                </div>
              </div>

              <SplitPane
                split="vertical"
                minSize={300}
                maxSize={600}
                defaultSize={400}
                className="w-full h-full"
              >
                {/* css */}
                <div className="w-full h-full flex flex-col items-start justify-start">
                  <div className="w-full px-4 py-2 border-t-2 border-sky-400 flex items-center justify-between bg-secondary">
                    <div className="flex items-center gap-3 border-t-gray-800">
                      <FaCss3 className="text-xl text-sky-400" />
                      <p className="font-semibold text-sky-400">CSS</p>
                    </div>
                    <div className="flex items-center gap-5 px-4 cursor-pointer">
                      <FcSettings className="text-md" />
                      <FaChevronDown className="text-md text-primaryText" />
                    </div>
                  </div>
                  <div className="w-full p-1 overflow-auto">
                    <CodeMirror
                      value={css}
                      height="600px"
                      extensions={[javascript({ jsx: true })]}
                      theme={"dark"}
                      onChange={(value, viewUpdate) => {
                        setCss(value);
                      }}
                    />
                  </div>
                </div>

                {/* js */}
                <div className="w-full h-full flex flex-col items-start justify-start">
                  <div className="w-full px-4 py-2 border-t-2 border-yellow-400 flex items-center justify-between bg-secondary">
                    <div className="flex items-center gap-3 border-t-gray-800">
                      <FaJs className="text-xl text-yellow-400" />
                      <p className="font-semibold text-yellow-400">JS</p>
                    </div>
                    <div className="flex items-center gap-5 px-4 cursor-pointer">
                      <FcSettings className="text-md" />
                      <FaChevronDown className="text-md text-primaryText" />
                    </div>
                  </div>
                  <div className="w-full p-1 overflow-auto">
                    <CodeMirror
                      value={js}
                      height="600px"
                      extensions={[javascript({ jsx: true })]}
                      theme={"dark"}
                      onChange={(value, viewUpdate) => {
                        setJs(value);
                      }}
                    />
                  </div>
                </div>
              </SplitPane>
            </SplitPane>

            {/* bottom horizontal split */}
            <div
              className="bg-black w-full h-full"
              style={{ overflow: "hidden" }}
            >
              <iframe
                title="Result"
                srcDoc={output}
                style={{ border: "none", width: "100%", height: "100%" }}
              />
            </div>
          </SplitPane>
        </div>
      </div>
    </>
  );
};

export default NewProject;
