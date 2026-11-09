"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { usePlanner, type PlannerState } from "@/components/providers/PlannerProvider";
import { useShop } from "@/components/providers/ShopProvider";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { validateEmail, validateName, validatePhone, validateYear } from "@/lib/validate";
import { BuildSheetView } from "./BuildSheet";
import { StepInfo, StepPurpose, StepUpgrades, StepVehicle, StepWhere, type StepErrors } from "./Steps";

const STEPS = [
  { title: "What are we outfitting?", short: "Vehicle", Body: StepVehicle },
  { title: "What's it for?", short: "Purpose", Body: StepPurpose },
  { title: "Pick your upgrades.", short: "Upgrades", Body: StepUpgrades },
  { title: "Where and when?", short: "Shop", Body: StepWhere },
  { title: "Your info.", short: "Contact", Body: StepInfo },
];
const SHEET = STEPS.length;

function validate(step: number, s: PlannerState): StepErrors {
  const e: StepErrors = {};
  if (step === 0 && !s.vehicle) e.vehicle = "Pick a vehicle to continue.";
  if (step === 1) {
    if (!s.purpose) e.purpose = "Tell us what the build is for.";
    if (s.vehicle === "fleet") {
      if (!s.fleetSize) e.fleetSize = "How many vehicles are in the fleet?";
      if (!s.sector) e.sector = "Pick the closest sector.";
    }
  }
  if (step === 2 && s.upgrades.length === 0) e.upgrades = "Pick at least one upgrade, or choose \"Not sure yet\".";
  if (step === 3) {
    if (!s.location) e.location = "Choose the shop you'd like to work with.";
    if (!s.timeline) e.timeline = "When do you need it?";
  }
  if (step === 4) {
    e.name = validateName(s.contact.name);
    e.phone = validatePhone(s.contact.phone);
    e.email = validateEmail(s.contact.email);
    e.year = validateYear(s.contact.year);
  }
  return Object.fromEntries(Object.entries(e).filter(([, v]) => v));
}

const buildNumber = () => `TT-${new Date().getFullYear()}${String(Math.floor(1000 + Math.random() * 9000))}`;

export default function BuildPlanner() {
  const { isOpen, closePlanner, state, update } = usePlanner();
  const { shop, chosen } = useShop();
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<StepErrors>({});
  const [showErrors, setShowErrors] = useState(false);

  useFocusTrap(dialogRef, isOpen, closePlanner, headingRef);

  const step = Math.min(state.step, SHEET);

  // Default the shop to the visitor's chosen one.
  useEffect(() => {
    if (isOpen && !state.location && chosen) update({ location: shop.slug });
  }, [isOpen, state.location, chosen, shop.slug, update]);

  // Live re-validation once the visitor has tried to move on.
  useEffect(() => {
    if (showErrors) setErrors(validate(step, state));
  }, [state, step, showErrors]);

  const goTo = useCallback(
    (next: number) => {
      setShowErrors(false);
      setErrors({});
      update({ step: next });
      requestAnimationFrame(() => {
        bodyRef.current?.scrollTo({ top: 0 });
        headingRef.current?.focus({ preventScroll: true });
      });
    },
    [update],
  );

  const next = () => {
    const e = validate(step, state);
    if (Object.keys(e).length) {
      setErrors(e);
      setShowErrors(true);
      // Move focus to the first invalid field.
      requestAnimationFrame(() => {
        const bad = dialogRef.current?.querySelector<HTMLElement>('[aria-invalid="true"], .field-error');
        bad?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
        if (bad?.matches("input,textarea")) bad.focus();
      });
      return;
    }
    if (step === SHEET - 1) {
      update({ buildNumber: state.buildNumber ?? buildNumber(), submitted: false, step: SHEET });
      requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
      bodyRef.current?.scrollTo({ top: 0 });
      return;
    }
    goTo(step + 1);
  };

  const Body = step < SHEET ? STEPS[step].Body : null;
  const title = step < SHEET ? STEPS[step].title : "Your build sheet.";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 print:hidden">
          <motion.div
            className="absolute inset-0 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closePlanner}
            aria-hidden
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="planner-title"
            className="absolute inset-0 flex flex-col bg-asphalt md:inset-y-0 md:left-auto md:right-0 md:w-[min(760px,92vw)] md:border-l md:border-hairline"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="shrink-0 border-b border-hairline px-5 pb-4 pt-4 sm:px-8 sm:pt-6">
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow text-fog">
                  <span className="text-chalk">Start My Build</span>
                  <span aria-hidden className="mx-2.5">·</span>
                  {step < SHEET ? `Step ${step + 1} of ${SHEET}` : "Complete"}
                </p>
                <button
                  type="button"
                  onClick={closePlanner}
                  className="grid size-11 place-items-center rounded-[4px] border border-chalk/25 hover:border-chalk/60"
                  aria-label="Close build planner"
                >
                  <X size={20} strokeWidth={1.5} aria-hidden />
                </button>
              </div>
              {/* Segmented progress: the active segment carries the hazard stripe */}
              <ol className="mt-4 grid grid-cols-5 gap-1.5" aria-label="Progress">
                {STEPS.map((s, i) => {
                  const done = i < step;
                  const current = i === step;
                  return (
                    <li key={s.short} aria-current={current ? "step" : undefined}>
                      <button
                        type="button"
                        disabled={!done}
                        onClick={() => done && goTo(i)}
                        className="block w-full text-left disabled:cursor-default"
                        aria-label={`${s.short}${done ? ", completed. Go back to this step" : current ? ", current step" : ""}`}
                      >
                        <span className={`block h-[6px] rounded-[1px] ${current ? "hazard" : done ? "bg-chalk" : "bg-hairline"}`} />
                        <span className={`eyebrow mt-2 hidden !text-[10px] sm:block ${current || done ? "text-chalk" : "text-fog"}`}>
                          {s.short}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Body */}
            <div ref={bodyRef} className="flex-1 overflow-y-auto overscroll-contain px-5 py-7 sm:px-8 sm:py-9">
              <h2 id="planner-title" ref={headingRef} tabIndex={-1} className="display h-md mb-7 outline-none">
                {title}
              </h2>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {Body ? <Body errors={showErrors ? errors : {}} /> : <BuildSheetView />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            {step < SHEET && (
              <div className="shrink-0 border-t border-hairline bg-steel px-5 py-4 pb-[max(16px,env(safe-area-inset-bottom))] sm:px-8">
                {showErrors && Object.keys(errors).length > 0 && (
                  <p className="mb-3 text-[14px] text-[#ff9b92]" role="alert">
                    {Object.values(errors)[0]}
                  </p>
                )}
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => goTo(step - 1)}
                    disabled={step === 0}
                    className="btn btn-ghost disabled:invisible"
                  >
                    <ArrowLeft size={16} strokeWidth={1.75} aria-hidden /> Back
                  </button>
                  <button type="button" onClick={next} className="btn btn-signal flex-1 sm:flex-none">
                    {step === SHEET - 1 ? "Create My Build Sheet" : "Next"}
                    <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
                  </button>
                </div>
              </div>
            )}
            {step === SHEET && (
              <div className="shrink-0 border-t border-hairline bg-steel px-5 py-3 sm:px-8">
                <button type="button" onClick={() => goTo(SHEET - 1)} className="link-arrow text-fog hover:text-chalk">
                  <ArrowLeft size={16} aria-hidden /> Edit my answers
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
