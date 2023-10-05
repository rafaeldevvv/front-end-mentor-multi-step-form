import * as React from "react";
import { FC } from "react";

import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormStep4 from "./FormStep4";
import FormStep5 from "./FormStep5";

import { ID } from "../types";
import { IError, IPlan, IFormData, IInputChange, IAddon } from "../interfaces";
import { alertSrAssertively } from "../utils/alert";
import checkErrors from "../utils/checkErrors";

const { useState } = React;

const Buttons = (props: {
  step: number;
  onNextStep: () => void;
  onGoBack: () => void;
}) => {
  const { step, onGoBack, onNextStep } = props;

  const isLastStep = step === 4;

  let nextBtnClassName = "btn";
  if (isLastStep) nextBtnClassName += " confirm-btn";
  else nextBtnClassName += " next-step-btn";

  return (
    <div className="buttons">
      {step > 1 ? (
        <button type="button" onClick={onGoBack} className="btn go-back-btn">
          Go back
        </button>
      ) : (
        <span />
      )}
      <button
        type={isLastStep ? "button" : "submit"}
        className={nextBtnClassName}
        onClick={onNextStep}
      >
        {isLastStep ? "Confirm" : "Next step"}
      </button>
    </div>
  );
};

interface IFormStep {
  step: number;
  formData: IFormData;
  errors: Array<IError>;
  addons: Array<IAddon>;
  plans: Array<IPlan>;
  onChange: (event: IInputChange) => void;
  onToggleYearlyBilling: (boolean: boolean) => void;
  onToggleAddon: (addonId: ID) => void;
  onChangeStep: (step: number) => void;
}

const FormStep: FC<IFormStep> = ({
  step,
  formData,
  errors,
  addons,
  plans,
  onChange,
  onToggleYearlyBilling,
  onChangeStep,
  onToggleAddon,
}) => {
  let currentStep;
  switch (step) {
    case 1: {
      currentStep = (
        <FormStep1 formData={formData} onChange={onChange} errors={errors} />
      );
      break;
    }
    case 2: {
      currentStep = (
        <FormStep2
          formData={formData}
          onChangePlan={onChange}
          onToggleYearlyBilling={onToggleYearlyBilling}
          plans={plans}
        />
      );
      break;
    }
    case 3: {
      currentStep = (
        <FormStep3
          addons={addons}
          onToggleAddon={onToggleAddon}
          formData={formData}
        />
      );
      break;
    }
    case 4: {
      currentStep = (
        <FormStep4
          plans={plans}
          addons={addons}
          formData={formData}
          onChangeStep={onChangeStep}
        />
      );
      break;
    }
    case 5: {
      currentStep = <FormStep5 />;
      break;
    }
  }
  return currentStep;
};

interface IForm {
  step: number;
  onNextStep: () => void;
  onGoBack: () => void;
  onChangeStep: (step: number) => void;
  plans: Array<IPlan>;
  addons: Array<IAddon>;
}

let firstMounted = false;

const Form: FC<IForm> = ({
  step,
  onNextStep,
  onGoBack,
  onChangeStep,
  plans,
  addons,
}) => {
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    phoneNumber: "",
    selectedPlanId: 0,
    isYearlyBillingEnabled: false,
    selectedAddonsIds: [],
  });
  const [errors, setErrors] = useState<IError[]>([]);

  const handleNextClick = () => {
    if (step === 1) {
      const errors = checkErrors(formData);

      if (errors.length === 0) {
        onNextStep();
      }
      setErrors(errors);
    } else {
      onNextStep();
    }
  };

  const handleChange = (event: IInputChange) => {
    const { name, value } = event;
    setFormData((prevFormData) =>
      name ? { ...prevFormData, [name]: value } : prevFormData
    );
  };

  const handleAddonToggle = (addonId: ID) => {
    const index = formData.selectedAddonsIds.indexOf(addonId);
    let nextAddonsIds = [...formData.selectedAddonsIds];

    if (index === -1) {
      nextAddonsIds.push(addonId);
    } else {
      nextAddonsIds = nextAddonsIds.filter((a) => a !== addonId);
    }

    setFormData((formData) => ({
      ...formData,
      selectedAddonsIds: nextAddonsIds,
    }));
  };

  const handleYearlyToggle = (boolean: boolean) => {
    const billing = boolean ? "yearly" : "monthly";
    alertSrAssertively(
      `${billing} billing is now enabled. Check the new prices.`
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      isYearlyBillingEnabled: boolean,
    }));
  };

  return (
    <form
      className="form"
      onSubmit={(e) => e.preventDefault()}
      aria-atomic="true"
    >
      <div className="steps-wrapper">
        <FormStep
          step={step}
          onChange={handleChange}
          onChangeStep={onChangeStep}
          addons={addons}
          plans={plans}
          formData={formData}
          errors={errors}
          onToggleAddon={handleAddonToggle}
          onToggleYearlyBilling={handleYearlyToggle}
        />
      </div>
      {step < 5 && (
        <Buttons step={step} onNextStep={handleNextClick} onGoBack={onGoBack} />
      )}
    </form>
  );
};

export default Form;
export { FormStep, Buttons };
