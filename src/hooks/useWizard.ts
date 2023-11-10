import { useMemo, useState } from "react";

export const useWizard = ({ steps, defaultStep = 0 }: { steps: string[]; defaultStep?: number }) => {
  const [currentStep, setCurrentStep] = useState<number>(defaultStep);

  const total = useMemo(() => steps.length, [steps.length]);

  const next = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const back = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const setStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  return {
    steps,
    current: currentStep,
    next,
    back,
    setStep,
    total: total,
    isLast: currentStep === total - 1
  };
};
