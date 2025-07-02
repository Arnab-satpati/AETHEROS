const DesktopIcon = ({ label, icon, onDoubleClick }) => {
  return (
    <div onDoubleClick={onDoubleClick} className="flex flex-col items-center text-white cursor-pointer w-16">
      <img src={icon} alt={label} className="w-10 h-10" />
      <span className="text-sm text-center mt-1">{label}</span>
    </div>
  );
};

export default DesktopIcon;
