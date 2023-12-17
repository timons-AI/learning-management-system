import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" h-full">
      <div className=" h-[80px] inset-y-0 w-full fixed  z-50">
        <Navbar />
      </div>
      <div className=" hidden md:flex mt-[80px] h-full w-64 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className=" md:pl-64 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
