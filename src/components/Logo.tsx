export function Logo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/Icon-imbitasyon.svg"
      alt="Imbitasyon"
      className={className}
      width={360}
      height={360}
      style={dark ? { filter: "invert(1) brightness(2)" } : undefined}
    />
  );
}

export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/text-imbitasyon.svg"
        alt="Imbitasyon"
        className="w-full max-w-[280px] sm:max-w-[360px] h-auto"
        width={887}
        height={363}
      />
    </div>
  );
}
