type Props = {
  size?: number;
  color?: string;
  tilt?: number;
};

export function Bucket({ size = 28, color = 'var(--zlut)', tilt = -8 }: Props) {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 100 70"
      style={{ transform: `rotate(${tilt}deg)` }}
      aria-hidden="true"
    >
      <path d="M 8 8 L 92 14 L 84 50 L 16 46 Z" fill={color} />
      <path
        d="M 16 46 L 20 60 L 26 50 L 32 62 L 38 51 L 44 63 L 50 51 L 56 63 L 62 51 L 68 62 L 74 50 L 80 60 L 84 50 Z"
        fill={color}
      />
      <circle cx="50" cy="14" r="5" fill="var(--black)" />
      <circle cx="50" cy="14" r="2" fill={color} />
    </svg>
  );
}
