import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <div className="h-full md:border-r flex flex-col overflow-y-auto bg-white md:shadow-sm">
      <div className="flex flex-col w-full pt-3">
        <SidebarRoutes />
      </div>
    </div>
  );
};
