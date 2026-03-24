import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import MapComponent from "@/components/MapComponent";
import HospitalCard from "@/components/HospitalCard";
import NavigationOverlay from "@/components/NavigationOverlay"; // Import added
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HOSPITALS, Hospital, CONDITIONS } from "@/lib/mockData";
import { useLocation, useSearch } from "wouter";
import { List, Map as MapIcon, ArrowLeft, Filter, RefreshCw } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

export default function Results() {
  const [location, setLocation] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  const conditionId = searchParams.get("condition");
  const condition = CONDITIONS.find(c => c.id === conditionId);

  const [view, setView] = useState<'list' | 'map'>('list');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [sortedHospitals, setSortedHospitals] = useState<Hospital[]>(HOSPITALS);
  const [isCalculating, setIsCalculating] = useState(true);

  // If map view is active and a hospital is selected, showing navigation mode
  const isNavigating = view === 'map' && selectedHospital;

  useEffect(() => {
    // Simulate AI Calculation - drastically reduced for performance feel
    const timer = setTimeout(() => {
      // Simple logic: If cardiac, prioritize hospitals with Cardiac specialty
      let sorted = [...HOSPITALS];
      if (condition) {
        sorted = sorted.sort((a, b) => {
          const aHasSpec = a.specialties.some(s => condition.requiredSpecialties.includes(s));
          const bHasSpec = b.specialties.some(s => condition.requiredSpecialties.includes(s));
          if (aHasSpec && !bHasSpec) return -1;
          if (!aHasSpec && bHasSpec) return 1;
          return a.eta - b.eta; // Then by ETA
        });
      } else {
        sorted.sort((a, b) => a.eta - b.eta);
      }
      setSortedHospitals(sorted);
      setIsCalculating(false);
    }, 600); // 600ms is fast enough to feel "working" but not annoying
    return () => clearTimeout(timer);
  }, [condition]);

  const handleNavigate = (hospital: Hospital) => {
     setSelectedHospital(hospital);
     setView('map');
  };

  if (isCalculating) {
    return (
      <Layout>
        <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
            <RefreshCw className="absolute inset-0 m-auto text-primary animate-pulse" size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-display animate-pulse">Analyzing Real-time Data...</h2>
            <p className="text-muted-foreground text-sm">Checking ICU availability, specialist schedules, and traffic conditions.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col h-full relative">
        {/* Header - Hide in Navigation Mode */}
        {!isNavigating && (
          <div className="p-4 bg-background z-10 sticky top-0 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setLocation('/')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-bold text-lg leading-none">Best Matches</h1>
                {condition && <span className="text-xs text-muted-foreground">For {condition.name}</span>}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Tabs value={view} onValueChange={(v) => setView(v as 'list' | 'map')} className="h-9">
                <TabsList className="h-9">
                  <TabsTrigger value="list" className="px-3"><List size={14} /></TabsTrigger>
                  <TabsTrigger value="map" className="px-3"><MapIcon size={14} /></TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-hidden relative">
          {view === 'list' && (
            <div className="p-4 space-y-4 overflow-y-auto h-full pb-20">
              <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                <span>{sortedHospitals.length} hospitals found</span>
                <button className="flex items-center gap-1 text-accent font-medium"><Filter size={12} /> Filter</button>
              </div>
              
              {sortedHospitals.map((hospital, idx) => (
                <div key={hospital.id} className="animate-in slide-in-from-bottom-4 fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                  {idx === 0 && (
                    <div className="mb-2 inline-block px-2 py-0.5 rounded-md bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider border border-green-200">
                      Top Recommendation
                    </div>
                  )}
                  <HospitalCard 
                    hospital={hospital} 
                    onNavigate={handleNavigate} 
                  />
                </div>
              ))}
            </div>
          )}

          {view === 'map' && (
            <div className="h-full w-full relative">
              <MapComponent 
                hospitals={sortedHospitals} 
                selectedHospital={selectedHospital}
                onSelectHospital={(h) => setSelectedHospital(h)}
                showRoute={!!selectedHospital}
              />
              
              {/* Navigation Overlay */}
              {selectedHospital && (
                <NavigationOverlay 
                  hospital={selectedHospital} 
                  onCancel={() => setSelectedHospital(null)} 
                />
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
