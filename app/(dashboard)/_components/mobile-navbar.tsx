"use client";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <Button
        onClick={onOpen}
        className=" block md:hidden mr-2"
        variant="ghost"
        size="sm"
      >
        <Menu className=" h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        {/* <SheetTrigger className=" md:hidden pr-4 hover:opacity-75 transition">
          <Menu />
        </SheetTrigger> */}
        <SheetContent side="left" className=" p-0 bg-white">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
