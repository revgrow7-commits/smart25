import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBudget } from "@/contexts/BudgetContext";
import { useState } from "react";
import BudgetModal from "./BudgetModal";

const BudgetIndicator = () => {
  const { itemCount } = useBudget();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (itemCount === 0) return null;

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-xl btn-primary hover:scale-110 transition-transform"
        size="icon"
      >
        <ShoppingCart className="h-6 w-6" />
        <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center bg-destructive text-destructive-foreground p-0">
          {itemCount}
        </Badge>
      </Button>
      <BudgetModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default BudgetIndicator;
