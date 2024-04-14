import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { buttonOutlinedStyle } from "@/ui/classNames";

export default function NotFound() {
  return (
    // <div className="flex h-full flex-col px-3 py-4 md:px-2">
    //   <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40">
    //     <div className="w-full text-white ">BACK to DASHBOARD</div>
    //   </div>
    // </div>
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex flex-wrap h-36 w-full items-end rounded-lg bg-blue-500 p-3 ">
          <div className="w-full text-white font-black text-3xl text-center ">PAGE NOT FOUND</div>
          <div className="w-full text-white text-center ">
            Could not find the request resource
          </div>
        </div>
        <Link
            href="/dashboard"
            className={buttonOutlinedStyle}
            >
            
                <p>
                    Back to dashboard
                </p>
                <ArrowRightIcon className="ml-auto h-5 w-5 text-blue-500" />
                
        </Link>
      </div>
    </main>
  );
}
