type ArrowProps = {
  flip?: boolean;
  className?: string;
};

export default function Arrow({ flip = false, className }: ArrowProps) {
  return (
    <svg
      viewBox="0 0 19 11"
      width="19"
      height="11"
      className={`${flip ? "-scale-x-100" : ""} ${className ?? ""}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 10.5L18.5 5.5L13.5 0.5M18.5 5.5H0.5"
        stroke="#4A0A05"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
