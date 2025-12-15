interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo({
  className = "",
  width = 180,
  height = 40,
}: LogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 180 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Text "En" - usa currentColor para adaptarse al dark mode */}
      <text
        x="0"
        y="28"
        fontSize="26"
        fontWeight="600"
        fill="currentColor"
        fontFamily="Poppins, Nunito, Inter, system-ui, sans-serif"
      >
        En
      </text>

      {/* Text "Casa" en naranja - siempre naranja */}
      <text
        x="32"
        y="28"
        fontSize="26"
        fontWeight="800"
        fill="#FF6A3D"
        fontFamily="Poppins, Nunito, Inter, system-ui, sans-serif"
      >
        Casa
      </text>
    </svg>
  );
}


