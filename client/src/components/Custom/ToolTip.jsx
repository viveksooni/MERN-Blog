export const ToolTip = ({ text, children }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <span className="absolute left-1/2 bottom-full -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800  text-white text-xs rounded-md px-2 py-1">
        {text}
      </span>
    </div>
  );
};
