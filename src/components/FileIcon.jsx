import { Rnd } from "react-rnd";

const FileIcon = ({ file, onRightClick }) => {
  return (
    <Rnd
      default={{ x: 100, y: 100, width: 120, height: 100 }}
      bounds="parent"
      className="bg-[#1a1a1a] border border-white/20 rounded shadow-md flex items-center justify-center text-sm"
      onContextMenu={onRightClick}
    >
      📄 {file.name}
    </Rnd>
  );
};

export default FileIcon;
