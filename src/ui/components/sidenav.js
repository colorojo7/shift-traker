import { PowerIcon } from "@heroicons/react/24/outline";
import NavLinks from "./nav-links";
import { UseUserContext } from "@/context/userContext";
import { redirect } from "next/navigation";

export default function SideNav() {
  const { logOut, userData } = UseUserContext();

  const handleLogOut = async () => {
    try {
      await logOut();
      redirect("/dashboard");
    } catch (e) {
      console.log("handleLogOut Error", e);
    }
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
     
      <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40">
        <div className="w-32 text-white md:w-40 font-black">{userData?.fullName ? (userData?.fullName).toUpperCase() : "LABOUR CONNECT"}</div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

        <button
          onClick={handleLogOut}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </div>
    </div>
  );
}
