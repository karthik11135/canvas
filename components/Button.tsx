import React from 'react';

const Button = ({
  children,
  btnName,
  tool,
  setTool,
}: {
  children: React.ReactNode;
  btnName: string;
  tool: string;
  setTool: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <button
      onClick={() => setTool(btnName)}
      className={` hover:bg-secondary  px-2 py-1 transition rounded-md ${
        tool === btnName ? 'bg-secondary hover:bg-opacity-100' : 'hover:bg-opacity-25'
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
