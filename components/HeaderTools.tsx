import React from 'react';
import Buttons from '@/components/Buttons';

const HeaderTools = ({
  tool,
  setTool,
}: {
  tool: string;
  setTool: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="absolute w-full ">
      <div className="w-fit  bg-slate-200 mx-auto bg-opacity-50 rounded-md backdrop-blur-md shadow-lg px-2  py-1">
        {/* <h1 className="text-center text-black">Canvas</h1> */}
        <div className="b rounded-md px-2 py-1">
          <Buttons tool={tool} setTool={setTool} />
        </div>
      </div>

    </div>
  );
};

export default HeaderTools;
