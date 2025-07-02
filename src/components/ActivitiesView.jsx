import { useStore } from "../store/useStore";

const ActivitiesView = () => {
  const desktops = useStore((s) => s.desktops);
  const switchDesktop = useStore((s) => s.switchDesktop);
  const exitActivitiesMode = useStore((s) => s.exitActivitiesMode);

  const handleDesktopClick = (index) => {
    switchDesktop(index);
    exitActivitiesMode();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999]">
      {desktops.map((desktop, index) => (
        <div
          key={index}
          className="relative bg-white w-60 h-40 m-4 rounded shadow-lg text-center cursor-pointer hover:scale-105 hover:ring-4 hover:ring-blue-500 transition-transform"
          onClick={() => handleDesktopClick(index)}
        >
          <div className="absolute top-2 left-2 bg-gray-200 text-xs px-2 py-1 rounded">
            Desktop {index + 1}
          </div>
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-gray-700">{desktop.length} Window(s)</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivitiesView;
