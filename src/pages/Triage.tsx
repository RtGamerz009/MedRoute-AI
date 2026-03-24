import { useState } from "react";
import Layout from "@/components/Layout";
import EmergencyTypeSelector from "@/components/EmergencyTypeSelector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Search, Mic, ArrowRight } from "lucide-react";
import { Condition } from "@/lib/mockData";

export default function Triage() {
  const [_, setLocation] = useLocation();
  const [selected, setSelected] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelect = (condition: Condition) => {
    setSelected(condition.id);
    // Simulate slight delay for "Processing" feel then nav
    setTimeout(() => {
      setLocation(`/results?condition=${condition.id}`);
    }, 400);
  };

  return (
    <Layout>
      <div className="p-4 space-y-6 pb-24">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-display">What's the emergency?</h1>
          <p className="text-muted-foreground text-sm">Select a condition to find the best equipped hospital nearby.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Type symptoms (e.g., chest pain)..." 
            className="pl-9 pr-12 h-12 text-lg shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute right-2 top-2">
            <Button size="icon" variant="ghost" className="h-8 w-8 text-accent">
              <Mic size={18} />
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Common Conditions</h3>
          <EmergencyTypeSelector onSelect={handleSelect} selectedId={selected} />
        </div>

        <div className="fixed bottom-20 left-4 right-4 z-40">
           {selected && (
             <Button 
               className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/20 animate-in slide-in-from-bottom-4"
               onClick={() => setLocation(`/results?condition=${selected}`)}
             >
               Find Hospitals <ArrowRight className="ml-2" />
             </Button>
           )}
        </div>
      </div>
    </Layout>
  );
}
