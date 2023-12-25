import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      <Image src="/logo.svg" width={150} height={150} alt="logo" />
      {/* <h1 className=" hidden md:block text-center mt-5 text-xl font-bold text-gray-800">
        OLYMPUS
      </h1> */}
    </div>
  );
};
