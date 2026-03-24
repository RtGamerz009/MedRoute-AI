import { motion } from "framer-motion";
import { CONDITIONS, Condition } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface EmergencyTypeSelectorProps {
  onSelect: (condition: Condition) => void;
  selectedId?: string;
}

export default function EmergencyTypeSelector({ onSelect, selectedId }: EmergencyTypeSelectorProps) {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex gap-2 px-1">
        {CONDITIONS.map((condition, index) => {
          const Icon = condition.icon;
          const isSelected = selectedId === condition.id;
          
          return (
            <motion.button
              key={condition.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(condition)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap shadow-sm h-12 flex-shrink-0",
                isSelected 
                  ? "bg-primary text-white border-primary shadow-md" 
                  : "bg-white text-foreground border-border hover:bg-accent/5 hover:border-accent/30"
              )}
            >
              <div className={cn(
                "p-1 rounded-full",
                isSelected ? "bg-white/20 text-white" : "bg-muted text-muted-foreground",
                !isSelected && condition.color
              )}>
                <Icon size={16} />
              </div>
              
              <span className="font-semibold text-sm">
                {condition.name}
              </span>
              
              {condition.severity === 'Critical' && (
                <span className="flex h-2 w-2 relative ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className={cn("relative inline-flex rounded-full h-2 w-2", isSelected ? "bg-white" : "bg-red-500")}></span>
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
