import { Link, useLocation } from "wouter";
import { Home, Map as MapIcon, Settings, AlertCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/triage", icon: AlertCircle, label: "Triage" },
    { href: "/results", icon: MapIcon, label: "Map" },
    { href: "/admin", icon: Settings, label: "Admin" },
  ];

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-background md:border-x md:shadow-2xl overflow-hidden relative">
      {/* Header */}
      <header className="flex-none h-14 border-b bg-white/80 backdrop-blur-md flex items-center justify-between px-4 z-50 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
            <span className="font-display text-lg">+</span>
          </div>
          <h1 className="font-display text-xl font-bold tracking-tight text-primary">
            MED<span className="text-foreground">ROUTE</span> <span className="text-xs bg-accent text-white px-1 rounded ml-1 align-top mt-1 inline-block">AI</span>
          </h1>
        </div>
        
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-600 font-bold text-xs border border-red-100 hover:bg-red-100 transition-colors shadow-sm animate-pulse">
          <Phone className="w-3.5 h-3.5 fill-current" />
          <span>Ambulance Call !</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-secondary/30 relative scroll-smooth pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="flex-none h-16 bg-white border-t flex items-center justify-around px-2 pb-safe z-50 absolute bottom-0 w-full">
        {navItems.map((item) => {
          const isActive = location === item.href || (location === '/' && item.href === '/'); // Handle root active state logic if needed, simplify here
          // Better active logic:
          const active = location === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex flex-col items-center justify-center w-16 h-full space-y-1 transition-all duration-200 active:scale-95 cursor-pointer",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}>
                <div className={cn(
                  "p-1.5 rounded-full transition-all",
                  active ? "bg-primary/10" : "bg-transparent"
                )}>
                  <item.icon strokeWidth={active ? 2.5 : 2} size={20} />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
