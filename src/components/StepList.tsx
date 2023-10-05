import * as React from "react";
import { FC } from "react";

interface IStepList {
  currentStep: number;
}

const StepList: FC<IStepList> = ({ currentStep }) => {
  const steps = ["Your info", "Select plan", "Add-ons", "Summary"];

  return (
    <ol className="step-list">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive =
          currentStep === stepNumber || (currentStep === 5 && stepNumber === 4);
        return (
          <li key={step}>
            <div className={`step-list-step ${isActive ? "active" : ""}`}>
              <div className="step-number-wrapper" aria-hidden="true">
                <span className="step-number">{stepNumber}</span>
              </div>
              <div className="step-list-desc">
                <p>Step {stepNumber}</p>
                <p className="step-name">{step}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default StepList;
