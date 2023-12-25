import { Button } from "@/components/ui/button";
import { ArrowRightCircle, ChevronRightSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Olympus - Your Learning Platform!
        </h1>
        <p className="text-lg mb-8">
          Explore a world of knowledge and unlock your potential with Olympus.
        </p>
        <Link href="/browse">
          <Button className="bg-white text-purple-500 hover:bg-purple-500 hover:text-white py-2 px-4 rounded-full shadow">
            Take a look <ArrowRightCircle className="inline-block ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
