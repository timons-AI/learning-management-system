import Image from "next/image";

export const Logo = () => {
    return ( 
            <Image 
                src="/next.svg" 
                width={130} 
                height={130}
                alt="logo"
             />
     );
}