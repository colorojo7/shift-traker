import { MaxWidthWrapper } from "../ui/components/MaxWithWrapper";
import Link from "next/link";
import { buttonStyle } from "@/ui/classNames";

export default function Home() {

     
  return (
      
        <MaxWidthWrapper>
              Mi HOME PAGE app HOME
            <Link href="/dashboard"  className={buttonStyle}>
                  Dashboard 
            </Link>
        </MaxWidthWrapper>

       
    
  );
}
