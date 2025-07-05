// ContextMenu.jsx
const ContextMenu = ({ x, y, target, onAction }) => {
  const handleClick = (action) => {
    if (typeof onAction === "function") {
      onAction(action, target);
    }
  };

  const options =
    target !== "desktop"
      ? [
          { label: "Create File", action: "create-file" },
          { label: "Create Folder", action: "create-folder" },
          { label: "Change Wallpaper", action: "change-wallpaper" },
        ]
      : [
          { label: "Rename", action: "rename" },
          { label: "Delete", action: "delete" },
        ];

  return (
    <div
      className="absolute bg-[#1e1e1e] text-white shadow-md rounded w-48 z-[99999] border border-gray-700"
      style={{ top: y, left: x }}
    >
      {options.map((opt, index) => (
        <button
          key={index}
          onClick={() => handleClick(opt.action)}
          className="w-full text-left px-4 py-2 hover:bg-gray-700"
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default ContextMenu;
