import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

interface LoginDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogDetailsCard = ({ isOpen, onOpenChange }: LoginDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Button className="cursor-pointer" variant="default" size="lg" asChild>
        <DialogTrigger>Adicionar mais informações</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDetailsCard;
