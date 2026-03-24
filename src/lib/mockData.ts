import { Heart, Brain, Skull, Baby, Wind, Stethoscope, Activity, AlertTriangle } from "lucide-react";

export interface Hospital {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  status: 'Open' | 'Crowded' | 'Full';
  waitTime: number; // minutes
  distance: number; // km
  eta: number; // minutes
  specialties: string[];
  equipment: {
    icu: number; // available beds
    oxygen: boolean;
    dialysis: boolean;
    ventilator: boolean;
    trauma: boolean;
  };
  rating: number;
  reviews: number;
  crowdLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
}

export interface Condition {
  id: string;
  name: string;
  severity: 'Critical' | 'Severe' | 'Moderate' | 'Mild';
  requiredSpecialties: string[];
  icon: any;
  color: string;
}

// Mock User Location (Jodhpur for demo purposes)
export const USER_LOCATION = {
  lat: 26.2389,
  lng: 73.0243
};

export const CONDITIONS: Condition[] = [
  { id: 'cardiac', name: 'Cardiac Arrest', severity: 'Critical', requiredSpecialties: ['Cardiology'], icon: Heart, color: 'text-red-500' },
  { id: 'trauma', name: 'Severe Trauma', severity: 'Critical', requiredSpecialties: ['Trauma Surgery', 'Orthopedics'], icon: Skull, color: 'text-orange-600' },
  { id: 'respiratory', name: 'Respiratory Failure', severity: 'Critical', requiredSpecialties: ['Pulmonology'], icon: Wind, color: 'text-blue-500' },
  { id: 'stroke', name: 'Stroke / Neuro', severity: 'Critical', requiredSpecialties: ['Neurology'], icon: Brain, color: 'text-purple-500' },
  { id: 'pediatric', name: 'Pediatric Emergency', severity: 'Severe', requiredSpecialties: ['Pediatrics'], icon: Baby, color: 'text-pink-500' },
  { id: 'poisoning', name: 'Poisoning', severity: 'Severe', requiredSpecialties: ['Toxicology'], icon: AlertTriangle, color: 'text-yellow-500' },
  { id: 'infection', name: 'Severe Infection', severity: 'Moderate', requiredSpecialties: ['Infectious Disease'], icon: Activity, color: 'text-green-500' },
  { id: 'general', name: 'General / Other', severity: 'Moderate', requiredSpecialties: ['General Medicine'], icon: Stethoscope, color: 'text-gray-500' },
];

export const HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: 'AIIMS Jodhpur',
    lat: 26.2405,
    lng: 73.0048,
    address: 'Basni Phase 2, Jodhpur, Rajasthan',
    phone: '0291 274 0741',
    status: 'Open',
    waitTime: 25,
    distance: 3.2,
    eta: 12,
    specialties: ['Cardiology', 'Trauma Surgery', 'Neurology', 'Oncology', 'Pediatrics'],
    equipment: { icu: 45, oxygen: true, dialysis: true, ventilator: true, trauma: true },
    rating: 4.8,
    reviews: 3500,
    crowdLevel: 'Moderate'
  },
  {
    id: 'h2',
    name: 'MDM Hospital',
    lat: 26.2736,
    lng: 73.0163,
    address: 'Shastri Nagar, Jodhpur, Rajasthan',
    phone: '0291 243 4376',
    status: 'Crowded',
    waitTime: 50,
    distance: 4.5,
    eta: 18,
    specialties: ['Trauma Surgery', 'Orthopedics', 'General Medicine'],
    equipment: { icu: 20, oxygen: true, dialysis: true, ventilator: true, trauma: true },
    rating: 4.1,
    reviews: 2100,
    crowdLevel: 'High'
  },
  {
    id: 'h3',
    name: 'Umaid Hospital',
    lat: 26.2800,
    lng: 73.0300,
    address: 'Siwanchi Gate, Jodhpur, Rajasthan',
    phone: '0291 262 4433',
    status: 'Open',
    waitTime: 15,
    distance: 5.1,
    eta: 22,
    specialties: ['Pediatrics', 'Gynecology', 'Neonatology'],
    equipment: { icu: 15, oxygen: true, dialysis: false, ventilator: true, trauma: false },
    rating: 4.5,
    reviews: 1800,
    crowdLevel: 'Low'
  },
  {
    id: 'h4',
    name: 'Medipulse Hospital',
    lat: 26.2420,
    lng: 73.0010,
    address: 'Basni, Jodhpur, Rajasthan',
    phone: '0291 274 0100',
    status: 'Open',
    waitTime: 10,
    distance: 3.5,
    eta: 14,
    specialties: ['Cardiology', 'Neurology', 'Orthopedics'],
    equipment: { icu: 30, oxygen: true, dialysis: true, ventilator: true, trauma: true },
    rating: 4.7,
    reviews: 1200,
    crowdLevel: 'Low'
  },
  {
    id: 'h5',
    name: 'Goyal Hospital',
    lat: 26.2650,
    lng: 73.0100,
    address: 'Residency Road, Jodhpur, Rajasthan',
    phone: '0291 243 2141',
    status: 'Open',
    waitTime: 20,
    distance: 4.0,
    eta: 16,
    specialties: ['General Medicine', 'Surgery', 'ENT'],
    equipment: { icu: 10, oxygen: true, dialysis: true, ventilator: true, trauma: false },
    rating: 4.3,
    reviews: 950,
    crowdLevel: 'Moderate'
  },
    {
    id: 'h6',
    name: 'Mahatma Gandhi Hospital',
    lat: 26.2900,
    lng: 73.0250,
    address: 'Jalori Gate, Jodhpur, Rajasthan',
    phone: '0291 263 5678',
    status: 'Full',
    waitTime: 90,
    distance: 6.2,
    eta: 30,
    specialties: ['General Medicine', 'Emergency'],
    equipment: { icu: 5, oxygen: true, dialysis: false, ventilator: false, trauma: false },
    rating: 3.8,
    reviews: 2500,
    crowdLevel: 'Critical'
  }
];
