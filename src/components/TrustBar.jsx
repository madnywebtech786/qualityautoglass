import { MapPin, Clock, DollarSign, Award, Shield } from "lucide-react";

const ICON_MAP = { MapPin, Clock, DollarSign, Award, Shield };

const BADGES = [
  { label: "Local Calgary Specialists", icon: "MapPin" },
  { label: "Fast Service & Honest Pricing", icon: "Clock" },
  { label: "Free Estimates Available", icon: "DollarSign" },
  { label: "Quality Materials & Expert Install", icon: "Award" },
  { label: "Trusted Since 2018", icon: "Shield" },
  { label: "Local Calgary Specialists", icon: "MapPin" },
  { label: "Fast Service & Honest Pricing", icon: "Clock" },
  { label: "Free Estimates Available", icon: "DollarSign" },
  { label: "Quality Materials & Expert Install", icon: "Award" },
  { label: "Trusted Since 2018", icon: "Shield" },
];

function BadgeItem({ badge }) {
  const Icon = ICON_MAP[badge.icon];
  return (
    <div className="flex items-center gap-2.5 shrink-0 px-5">
      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--color-brand-primary)]/10 shrink-0">
        {Icon && (
          <Icon
            size={14}
            strokeWidth={2.5}
            className="text-[var(--color-brand-primary)]"
          />
        )}
      </span>
      <span className="text-[13px] font-600 text-[var(--color-text-secondary)] whitespace-nowrap tracking-wide">
        {badge.label}
      </span>
      <span className="ml-4 w-1.5 h-1.5 rounded-full bg-[var(--color-border-strong)] shrink-0" />
    </div>
  );
}

export default function TrustBar() {
  return (
    <section className="bg-[var(--color-surface-alt)] border-y border-[var(--color-border)] py-4 overflow-hidden">
      <div className="flex animate-scroll-x">
        {BADGES.map((badge, i) => (
          <BadgeItem key={i} badge={badge} />
        ))}
      </div>
    </section>
  );
}
