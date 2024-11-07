'use client';
import React from 'react';

import Buttons from '@/components/Buttons';
import { VscDebugStart } from 'react-icons/vsc';
import { FaRegCircleStop } from 'react-icons/fa6';
import useScreenRecorder from '@/record/recordScreen';
import { MdOutlineFileDownload } from 'react-icons/md';

const HeaderTools = ({
  tool,
  setTool,
}: {
  tool: string;
  setTool: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { startRecording, stopRecording, downloadRecording, isRecording } =
    useScreenRecorder();

  return (
    <div className="absolute w-full justify-center  flex mt-2">
      <div className="w-fit flex gap-5 bg-secondary  mx-auto rounded-md backdrop-blur-md shadow-lg px-2  py-1">
        {/* {isRecording<h1 className="text-center text-black">Canvas</h1>} */}
        <div className="rounded-md bg-slate-50 px-2 py-1">
          <Buttons tool={tool} setTool={setTool} />
        </div>
        <div className="rounded-md bg-slate-50 items-center flex gap-4 px-2 py-1">
          {isRecording && (
            <div className="bg-red-500 animate-ping rounded-full h-[10px] w-[10px]"></div>
          )}
          {!isRecording && (
            <VscDebugStart
              onClick={startRecording}
              size={18}
              color={'black'}
              className="cursor-pointer transition hover:-translate-y-0.5"
            />
          )}
          {isRecording && (
            <FaRegCircleStop
              className="cursor-pointer"
              onClick={stopRecording}
              size={18}
              color="black"
            />
          )}
          <h2 className="text-black cursor-pointer" onClick={downloadRecording}>
            <MdOutlineFileDownload color={'black'} size={18} />
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HeaderTools;
