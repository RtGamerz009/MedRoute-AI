import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Hospital, USER_LOCATION } from '@/lib/mockData';
import { useEffect } from 'react';
import L from 'leaflet';
import { MapPin, Navigation } from 'lucide-react';

// Fix for default Leaflet icons in React
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: iconMarker,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

// Custom Hospital Icon
const HospitalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom User Icon
const UserIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 14, { duration: 1.5 });
  }, [center, map]);
  return null;
}

interface MapComponentProps {
  hospitals: Hospital[];
  selectedHospital?: Hospital | null;
  onSelectHospital: (hospital: Hospital) => void;
  showRoute?: boolean;
}

export default function MapComponent({ hospitals, selectedHospital, onSelectHospital, showRoute = false }: MapComponentProps) {
  const center: [number, number] = selectedHospital 
    ? [selectedHospital.lat, selectedHospital.lng] 
    : [USER_LOCATION.lat, USER_LOCATION.lng];

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={true} 
        className="w-full h-full rounded-none md:rounded-xl z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        <MapUpdater center={center} />

        {/* User Marker */}
        <Marker position={[USER_LOCATION.lat, USER_LOCATION.lng]} icon={UserIcon}>
          <Popup className="font-sans">
            <div className="text-center p-2">
              <p className="font-bold text-accent">Your Location</p>
              <p className="text-xs text-muted-foreground">Accuracy: High</p>
            </div>
          </Popup>
        </Marker>

        {/* Hospital Markers */}
        {hospitals.map((hospital) => (
          <Marker 
            key={hospital.id} 
            position={[hospital.lat, hospital.lng]} 
            icon={HospitalIcon}
            eventHandlers={{
              click: () => onSelectHospital(hospital),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[150px]">
                <h3 className="font-bold text-sm text-foreground">{hospital.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    hospital.status === 'Open' ? 'bg-green-100 text-green-700' : 
                    hospital.status === 'Crowded' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {hospital.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{hospital.waitTime}m wait</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Route Line */}
        {showRoute && selectedHospital && (
          <Polyline 
            positions={[
              [USER_LOCATION.lat, USER_LOCATION.lng],
              [selectedHospital.lat, selectedHospital.lng]
            ]}
            pathOptions={{ color: '#3B82F6', weight: 4, dashArray: '10, 10', opacity: 0.7 }}
          />
        )}
      </MapContainer>
      
      {/* Map Overlay Gradient */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white/90 to-transparent pointer-events-none z-[400] md:rounded-t-xl" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/90 to-transparent pointer-events-none z-[400] md:rounded-b-xl" />
    </div>
  );
}
