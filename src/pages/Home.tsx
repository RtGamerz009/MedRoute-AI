import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { AlertTriangle, MapPin, Search, Mic } from "lucide-react";
import MapComponent from "@/components/MapComponent";
import { HOSPITALS } from "@/lib/mockData";
import { motion } from "framer-motion";
import EmergencyTypeSelector from "@/components/EmergencyTypeSelector";

export default function Home() {
  const [_, setLocation] = useLocation();

  return (
    <Layout>
      <div className="flex flex-col h-full bg-background">
        
        {/* Floating Header Space */}
        <div className="p-4 pb-2 z-10">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-end"
          >
            <div>
              <h2 className="text-xl font-bold text-foreground">Emergency Assistance</h2>
              <p className="text-muted-foreground text-xs">Tap a category for instant routing</p>
            </div>
          </motion.div>
        </div>

        {/* Auto-Suggestion Chips (Horizontal Scroll) */}
        <div className="px-3 pb-4 z-20">
          <EmergencyTypeSelector onSelect={(condition) => setLocation(`/results?condition=${condition.id}`)} />
        </div>

        {/* Map Preview Area - Takes up remaining space */}
        <div className="flex-1 relative bg-muted overflow-hidden shadow-inner border-t z-0">
           <MapComponent 
             hospitals={HOSPITALS} 
             onSelectHospital={() => {}} 
             showRoute={false}
           />
           
           {/* Gradient overlay for bottom button area */}
           <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-[100]" />
        </div>

        {/* Emergency Button - Fixed Bottom Center - Ergonomic Position */}
        <div className="absolute bottom-20 left-0 w-full flex flex-col items-center justify-end pb-6 px-6 pointer-events-none z-[200]">
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            animate={{ 
              backgroundColor: ["#ef4444", "#ffffff", "#ef4444"], // Red -> White -> Red
              color: ["#ffffff", "#ef4444", "#ffffff"],
              boxShadow: [
                "0 0 0 0px rgba(239, 68, 68, 0.4)", 
                "0 0 0 20px rgba(239, 68, 68, 0)",
                "0 0 0 0px rgba(239, 68, 68, 0.4)"
              ]
            }}
            transition={{ 
              duration: 0.6, 
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
            onClick={() => setLocation("/triage")}
            className="pointer-events-auto w-24 h-24 rounded-full shadow-2xl shadow-red-500/50 border-4 border-red-500/30 flex flex-col items-center justify-center gap-1 group relative overflow-hidden"
          >
            <AlertTriangle size={36} className="fill-current" />
            <span className="text-[10px] font-bold uppercase tracking-widest">SOS</span>
          </motion.button>
          
          <p className="text-xs font-bold text-red-500/80 mt-3 bg-white/90 px-3 py-1 rounded-full shadow-sm backdrop-blur">
             Tap for Emergency Mode
          </p>
        </div>
      </div>
    </Layout>
  );
}
