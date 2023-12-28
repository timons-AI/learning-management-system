import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TokenForm } from "./token-form";

export function TokenModal({ courseId: couseId }: { courseId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          Enroll with Token
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enroll with token</DialogTitle>
          <DialogDescription>
            The token details are provided by your institution or instructor.
          </DialogDescription>
        </DialogHeader>
        <TokenForm courseId={couseId} />
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
