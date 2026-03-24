import { Hospital } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Clock, Navigation, Phone, ShieldCheck, Activity, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface HospitalCardProps {
  hospital: Hospital;
  onNavigate: (hospital: Hospital) => void;
  variant?: 'compact' | 'detailed';
  className?: string;
}

export default function HospitalCard({ hospital, onNavigate, variant = 'detailed', className }: HospitalCardProps) {
  // Logic to calculate a score based on wait time and distance (simplified)
  const score = Math.max(0, 100 - (hospital.waitTime * 1.5) - (hospital.distance * 5));
  let scoreColor = "text-green-500";
  if (score < 70) scoreColor = "text-yellow-500";
  if (score < 40) scoreColor = "text-red-500";

  return (
    <Card className={cn("overflow-hidden border-l-4 transition-all duration-300", 
      hospital.status === 'Open' ? "border-l-green-500" : 
      hospital.status === 'Crowded' ? "border-l-yellow-500" : "border-l-red-500",
      className
    )}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg leading-tight">{hospital.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center mt-1">
              <Navigation className="w-3 h-3 mr-1" /> {hospital.distance} km away
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className={cn("font-display text-2xl font-bold", scoreColor)}>
              {Math.round(score)}
            </span>
            <span className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Match Score</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="flex items-center gap-4 text-sm mb-3">
          <div className="flex items-center text-muted-foreground">
            <Clock className="w-4 h-4 mr-1.5 text-accent" />
            <span className="font-medium text-foreground">{hospital.waitTime} min</span> wait
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="w-4 h-4 mr-1.5 text-accent" />
            <span className={cn("font-medium", 
              hospital.crowdLevel === 'Low' ? 'text-green-600' : 
              hospital.crowdLevel === 'High' ? 'text-orange-600' : 'text-red-600'
            )}>{hospital.crowdLevel}</span> crowd
          </div>
        </div>

        {variant === 'detailed' && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {hospital.equipment.icu > 0 && (
              <Badge variant="secondary" className="text-[10px] px-1.5 h-5 bg-blue-50 text-blue-700 border-blue-200">
                ICU: {hospital.equipment.icu}
              </Badge>
            )}
            {hospital.equipment.oxygen && (
              <Badge variant="secondary" className="text-[10px] px-1.5 h-5 bg-cyan-50 text-cyan-700 border-cyan-200">
                Oxygen
              </Badge>
            )}
            {hospital.equipment.trauma && (
              <Badge variant="secondary" className="text-[10px] px-1.5 h-5 bg-red-50 text-red-700 border-red-200">
                Trauma Lvl 1
              </Badge>
            )}
            {hospital.specialties.slice(0, 2).map(s => (
              <Badge key={s} variant="outline" className="text-[10px] px-1.5 h-5">
                {s}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-3 bg-muted/20 flex gap-2">
        <Button 
          className="flex-1 bg-primary hover:bg-primary/90 text-white shadow-md shadow-red-200" 
          onClick={() => onNavigate(hospital)}
        >
          <Navigation className="w-4 h-4 mr-2" />
          Navigate ({hospital.eta} min)
        </Button>
        {variant === 'detailed' && (
          <Button variant="outline" size="icon" className="border-accent/20 text-accent hover:bg-accent/10">
            <Phone className="w-4 h-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
