import React from 'react';

const Buttons = ({
  tool,
  setTool,
}: {
  tool: string;
  setTool: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex gap-2 text-center text-pink-700 bg-green-500 z-10 mb-4 mx-auto">
      <button
        onClick={() => setTool('select')}
        className={`border px-2 ${
          tool === 'select' ? 'text-blue-800 bg-white ' : ''
        }`}
      >
        Select
      </button>
      <button
        onClick={() => setTool('rectangle')}
        className={`border px-2 ${
          tool === 'rectangle' ? 'bg-white text-black' : ''
        }`}
      >
        Rectangle
      </button>
      <button
        onClick={() => setTool('circle')}
        className={`border px-2 ${
          tool === 'circle' ? 'bg-white text-black' : ''
        }`}
      >
        Circle
      </button>
      <button
        onClick={() => setTool('text')}
        className={`border px-2 ${
          tool === 'text' ? 'bg-white text-black' : ''
        }`}
      >
        Text
      </button>
      <button
        onClick={() => setTool('line')}
        className={`border px-2 ${
          tool === 'line' ? 'bg-white text-black' : ''
        }`}
      >
        Line
      </button>
    </div>
  );
};

export default Buttons;
