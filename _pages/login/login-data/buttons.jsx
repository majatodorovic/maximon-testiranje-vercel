"use client";
export const Buttons = ({ handleOpen, buttons, setData }) => {
  return (
    <div className={`flex flex-col sm:flex-row items-center gap-5 mt-5`}>
      <button
        name={buttons?.first?.name}
        onClick={({ target: { name } }) => {
          handleOpen(name);
        }}
        className={`w-full bg-gray-100 hover:bg-gray-200/80 text-black font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#04b400] sm:text-sm shadow border`}
      >
        {buttons?.first?.text}
      </button>
      <button
        name={buttons?.second?.name}
        onClick={({ target: { name } }) => {
          handleOpen(name);
        }}
        className={`w-full bg-gray-100 hover:bg-gray-200/80 text-black font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#04b400] sm:text-sm shadow border`}
      >
        {buttons?.second?.text}
      </button>
    </div>
  );
};
