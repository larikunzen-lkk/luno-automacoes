import { Check } from "lucide-react";

interface FormStepperProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export function FormStepper({ currentStep, totalSteps, labels }: FormStepperProps) {
  return (
    <div
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Etapa ${currentStep} de ${totalSteps}: ${labels[currentStep - 1]}`}
      className="w-full"
    >
      {/* Progress bar */}
      <div className="h-1.5 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          aria-hidden="true"
        />
      </div>

      {/* Step dots */}
      <ol className="flex justify-between" aria-hidden="true">
        {labels.map((label, i) => {
          const step = i + 1;
          const done = step < currentStep;
          const active = step === currentStep;

          return (
            <li key={label} className="flex flex-col items-center gap-1.5">
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold border-2 transition-all duration-300 ${
                  done
                    ? "bg-primary border-primary text-white"
                    : active
                    ? "bg-white border-primary text-primary"
                    : "bg-white border-gray-200 text-gray-400"
                }`}
              >
                {done ? <Check className="w-4 h-4" /> : step}
              </span>
              <span
                className={`text-xs hidden sm:block ${
                  active ? "text-primary font-semibold" : done ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
