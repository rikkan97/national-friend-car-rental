interface TransmissionIconProps {
  className?: string;
  size?: number;
}

export function TransmissionIcon({ className = "", size = 18 }: TransmissionIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Gear shift H-pattern */}
      <line x1="5" y1="12" x2="19" y2="12" />
      <line x1="5" y1="5" x2="5" y2="19" />
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="19" y1="5" x2="19" y2="19" />
      <circle cx="5" cy="5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="19" cy="5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="19" cy="19" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}