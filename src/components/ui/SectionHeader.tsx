import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

type Props = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Huge outlined numeral behind the heading. */
  numeral?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  id?: string;
  className?: string;
  /** Optional element aligned to the right of the heading on desktop. */
  aside?: React.ReactNode;
};

export function SectionHeader({
  index,
  eyebrow,
  title,
  lede,
  numeral,
  tone = "dark",
  align = "left",
  id,
  className = "",
  aside,
}: Props) {
  const center = align === "center";
  return (
    <div className={`relative ${tone === "light" ? "on-light" : ""} ${className}`}>
      {numeral && (
        <span
          aria-hidden
          className={`outline-numeral absolute -top-10 text-[9rem] lg:-top-20 lg:text-[16rem] ${
            center ? "left-1/2 -translate-x-1/2" : "-left-2 lg:-left-6"
          }`}
        >
          {numeral}
        </span>
      )}
      <div className={`relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between ${center ? "items-center text-center lg:flex-col lg:items-center" : ""}`}>
        <div className={center ? "flex flex-col items-center" : ""}>
          <Reveal>
            <Eyebrow index={index} accent={tone === "light" ? "ink" : "blue"} className={tone === "light" ? "text-ink-muted" : "text-fog"}>
              {eyebrow}
            </Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <h2 id={id} className={`display h-lg mt-5 max-w-[18ch] ${tone === "light" ? "text-ink" : "text-chalk"}`}>
              {title}
            </h2>
          </Reveal>
          {lede && (
            <Reveal i={2}>
              <p className={`lede mt-6 ${tone === "light" ? "text-ink-muted" : "text-fog"} ${center ? "mx-auto" : ""}`}>{lede}</p>
            </Reveal>
          )}
        </div>
        {aside && <Reveal i={2}>{aside}</Reveal>}
      </div>
    </div>
  );
}
