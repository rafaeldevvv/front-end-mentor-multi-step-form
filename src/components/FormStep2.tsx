import * as React from "react";
import { FC } from "react";

import { Plans } from "../types";
import { IPlan, IFormData, IInputChange } from "../interfaces";

import ButtonSwitch from "./ButtonSwitch";
import Price from "./Price";
import Section from "./Section";

import getPrice from "../utils/getPrice";

const { useState } = React;

interface IFormStep2 {
  formData: IFormData;
  onChangePlan: (event: IInputChange) => void;
  onToggleYearlyBilling: (boolean: boolean) => void;
  plans: Array<IPlan>;
}

interface IPlanComponent {
  plan: IPlan;
  isYearlyBillingEnabled: boolean;
  selected: boolean;
  focused: boolean;
  onSelect: (event: IInputChange) => void;
  onFocus: (planName: Plans | null) => void;
}

const Plan: FC<IPlanComponent> = ({
  plan,
  isYearlyBillingEnabled,
  selected,
  focused,
  onSelect,
  onFocus,
}) => {
  let planClassName = "radio-label flex gap-1 align-start plan";
  if (selected) planClassName += " selected";
  if (focused) planClassName += " focused";

  return (
    <label htmlFor={plan.name} className={planClassName}>
      <input
        type="radio"
        name="selectedPlanId"
        value={plan.id}
        checked={selected}
        id={plan.name}
        className="sr-only"
        onChange={(e) => {
          if (e.target.checked)
            onSelect({ name: "selectedPlanId", value: plan.id });
        }}
        onFocus={() => onFocus(plan.name)}
        onBlur={() => onFocus(null)}
      />
      <img
        className="plan-icon"
        src={plan.icon}
        alt={plan.name + " icon"}
        aria-hidden="true"
      />
      <div className="plan-content">
        <p className="plan-name bold marine-blue-text">{plan.name}</p>
        <Price
          yearly={isYearlyBillingEnabled}
          price={getPrice(plan, isYearlyBillingEnabled)}
          className="plan-price"
        />
        {isYearlyBillingEnabled && (
          <p className="marine-blue-text months-free">2 months free</p>
        )}
      </div>
    </label>
  );
};

const FormStep2: FC<IFormStep2> = ({
  formData,
  onChangePlan,
  onToggleYearlyBilling,
  plans,
}) => {
  const { isYearlyBillingEnabled, selectedPlanId } = formData;

  const [focusedPlan, setFocusedPlan] = useState<Plans | null>(null);

  return (
    <Section
      heading="Select your plan"
      description="You have the option of monthly or yearly billing."
    >
      <fieldset name="plan">
        <legend>Plans</legend>
        <ul className="plans-list">
          {plans.map((plan) => {
            return (
              <li key={plan.name} className="radio-label-wrapper plan-wrapper">
                <Plan
                  selected={plan.id === selectedPlanId}
                  focused={plan.name === focusedPlan}
                  isYearlyBillingEnabled={isYearlyBillingEnabled}
                  plan={plan}
                  onSelect={onChangePlan}
                  onFocus={(planName) => setFocusedPlan(planName)}
                />
              </li>
            );
          })}
        </ul>
      </fieldset>
      <ButtonSwitch
        textOn="Yearly"
        textOff="Monthly"
        id="yearly-billing-switch"
        srLabel="Yearly billing"
        onToggle={onToggleYearlyBilling}
        checked={isYearlyBillingEnabled}
      />
    </Section>
  );
};

export default FormStep2;
