import React from 'react';
import { RiRectangleLine } from 'react-icons/ri';
import { FaArrowPointer } from 'react-icons/fa6';
import { FaRegCircle } from 'react-icons/fa';
import { GoHorizontalRule } from 'react-icons/go';
import { IoText } from 'react-icons/io5';
import Button from './Button';
const Buttons = ({
  tool,
  setTool,
}: {
  tool: string;
  setTool: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex gap-3 text-center ">
      <Button tool={tool} setTool={setTool} btnName="select">
        <FaArrowPointer
          size={18}
          color={tool === 'select' ? 'white' : 'black'}
        />
      </Button>
      <Button tool={tool} setTool={setTool} btnName="rectangle">
        <RiRectangleLine
          size={18}
          color={tool === 'rectangle' ? 'white' : 'black'}
        />
      </Button>
      <Button tool={tool} setTool={setTool} btnName="circle">
        <FaRegCircle size={18} color={tool === 'circle' ? 'white' : 'black'} />
      </Button>
      <Button tool={tool} setTool={setTool} btnName="line">
        <GoHorizontalRule
          size={18}
          color={tool === 'line' ? 'white' : 'black'}
        />
      </Button>
      <Button tool={tool} setTool={setTool} btnName="text">
        <IoText size={18} color={tool === 'text' ? 'white' : 'black'} />
      </Button>
    </div>
  );
};

export default Buttons;
