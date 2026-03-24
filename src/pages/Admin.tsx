import { useState } from "react";
import Layout from "@/components/Layout";
import { HOSPITALS } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Activity, Users, Bed, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Admin() {
  const [hospitals, setHospitals] = useState(HOSPITALS);
  const [editMode, setEditMode] = useState<string | null>(null);

  const handleStatusToggle = (id: string) => {
    setHospitals(prev => prev.map(h => {
      if (h.id === id) {
        const nextStatus = h.status === 'Open' ? 'Crowded' : h.status === 'Crowded' ? 'Full' : 'Open';
        return { ...h, status: nextStatus };
      }
      return h;
    }));
    toast({ title: "Status Updated", description: "Hospital availability synced to realtime network." });
  };

  const handleCrowdChange = (id: string) => {
    setHospitals(prev => prev.map(h => {
       if (h.id === id) {
        const levels: any[] = ['Low', 'Moderate', 'High', 'Critical'];
        const currentIdx = levels.indexOf(h.crowdLevel);
        const nextLevel = levels[(currentIdx + 1) % levels.length];
        return { ...h, crowdLevel: nextLevel };
       }
       return h;
    }));
  };

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
           <h1 className="text-2xl font-bold font-display">Hospital Admin</h1>
           <Badge variant="outline" className="bg-white">
             <Activity className="w-3 h-3 mr-1 text-green-500 animate-pulse" />
             Live Network
           </Badge>
        </div>

        <div className="grid gap-4">
          {hospitals.map(hospital => (
            <Card key={hospital.id} className="overflow-hidden">
              <CardHeader className="p-4 bg-muted/20 border-b flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">{hospital.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{hospital.address}</p>
                </div>
                <Badge variant={hospital.status === 'Open' ? 'default' : 'destructive'}>
                  {hospital.status}
                </Badge>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <Label>Crowd Level</Label>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-32"
                    onClick={() => handleCrowdChange(hospital.id)}
                  >
                    {hospital.crowdLevel}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <Label>Status Override</Label>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-32" 
                    onClick={() => handleStatusToggle(hospital.id)}
                  >
                    Change Status
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">ICU Beds</Label>
                    <Input type="number" defaultValue={hospital.equipment.icu} className="h-8" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Wait Time (min)</Label>
                    <Input type="number" defaultValue={hospital.waitTime} className="h-8" />
                  </div>
                </div>

                <Button className="w-full" size="sm" onClick={() => toast({ title: "Updated", description: "Capacity metrics updated." })}>
                  <Save className="w-4 h-4 mr-2" />
                  Update Capacity
                </Button>

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
