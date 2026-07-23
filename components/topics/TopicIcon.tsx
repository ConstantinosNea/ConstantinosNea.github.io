import {
  ShieldCheck,
  Brain,
  Thermometer,
  Wind,
  Building2,
  Scale,
  Smartphone,
  Cpu,
  Landmark,
  MapPin,
  Leaf,
  Users,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Brain,
  Thermometer,
  Wind,
  Building2,
  Scale,
  Smartphone,
  Cpu,
  Landmark,
  MapPin,
  Leaf,
  Users,
};

export function TopicIcon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  const Icon = ICONS[name] ?? ShieldCheck;
  return <Icon size={size} className={className} />;
}
