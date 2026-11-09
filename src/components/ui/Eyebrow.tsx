type Props = {
  index?: string;
  children: React.ReactNode;
  className?: string;
  /** Colors the index number. Defaults to brand blue. */
  accent?: "blue" | "fog" | "ink";
};

/** Section eyebrow with a part-number style index, like "01 / FLEET". */
export function Eyebrow({ index, children, className = "", accent = "blue" }: Props) {
  const accentCls = accent === "blue" ? "text-thunder-bright" : accent === "ink" ? "text-ink" : "text-fog";
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      {index && (
        <>
          <span className={accentCls}>{index}</span>
          <span aria-hidden className="h-px w-8 bg-current opacity-40" />
        </>
      )}
      <span>{children}</span>
    </p>
  );
}

export function HazardStripe({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`hazard h-[6px] w-full ${className}`} />;
}
