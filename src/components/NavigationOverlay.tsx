import { Hospital } from "@/lib/mockData";
import { Navigation, Clock, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface NavigationOverlayProps {
  hospital: Hospital;
  onCancel: () => void;
}

export default function NavigationOverlay({ hospital, onCancel }: NavigationOverlayProps) {
  return (
    <div className="absolute top-0 left-0 w-full p-4 z-[500] pointer-events-none">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-primary text-white rounded-xl shadow-xl overflow-hidden pointer-events-auto"
      >
        <div className="p-4 bg-primary-foreground/10 flex items-start justify-between">
          <div className="flex gap-3">
             <div className="mt-1">
               <Navigation className="w-8 h-8 fill-white" />
             </div>
             <div>
               <p className="text-white/80 text-xs font-bold uppercase tracking-wider">Navigating to</p>
               <h3 className="font-bold text-lg leading-tight">{hospital.name}</h3>
               <p className="text-sm mt-1 opacity-90">{hospital.address}</p>
             </div>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 -mr-2 -mt-2" onClick={onCancel}>
            <X size={20} />
          </Button>
        </div>
        
        <div className="bg-white text-foreground p-4 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div>
               <span className="text-2xl font-bold font-display text-green-600">{hospital.eta}</span>
               <span className="text-xs font-bold text-muted-foreground uppercase ml-1">min</span>
             </div>
             <div className="h-8 w-px bg-border"></div>
             <div>
               <span className="text-2xl font-bold font-display">{hospital.distance}</span>
               <span className="text-xs font-bold text-muted-foreground uppercase ml-1">km</span>
             </div>
           </div>
           
           <div className="text-right">
             <p className="text-xs font-bold text-muted-foreground uppercase">Arrival</p>
             <p className="font-bold">12:45 PM</p>
           </div>
        </div>
      </motion.div>
      
      {/* Mock Turn Directions */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg inline-flex items-center gap-3 pointer-events-auto border-l-4 border-accent max-w-[80%]"
      >
        <div className="bg-accent/10 p-2 rounded-full">
           <MapPin className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="font-bold text-sm">Turn right in 200m</p>
          <p className="text-xs text-muted-foreground">onto Broadway Ave</p>
        </div>
      </motion.div>
    </div>
  );
}
