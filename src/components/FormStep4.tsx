import * as React from "react";
import { FC } from "react";
import { IAddon, IFormData, IPlan } from "../interfaces";
import getPrice from "../utils/getPrice";
import Price from "./Price";
import Section from "./Section";

interface IFormStep4 {
  formData: IFormData;
  plans: IPlan[];
  addons: IAddon[];
  onChangeStep: (step: number) => void;
}

const FormStep4: FC<IFormStep4> = ({
  formData,
  plans,
  addons,
  onChangeStep,
}) => {
  const { selectedPlanId, selectedAddonsIds, isYearlyBillingEnabled } =
    formData;

  const selectedPlan = plans.find((p) => p.id === selectedPlanId)!;

  const selectedAddons = addons.filter((a) =>
    selectedAddonsIds.some((id) => id === a.id)
  );

  const planPrice = getPrice(selectedPlan, isYearlyBillingEnabled);

  const addonsPricesSum = selectedAddons.reduce(
    (count, addon) => getPrice(addon, isYearlyBillingEnabled) + count,
    0
  );

  const total = planPrice + addonsPricesSum;

  return (
    <Section
      heading="Finishing up"
      description="Double-check everything looks OK before confirming."
    >
      <div className="card">
        <p className="flex space-between align-center">
          <span>
            <span className="bold marine-blue-text selected-plan-name">
              {selectedPlan.name} (
              {isYearlyBillingEnabled ? "Yearly" : "Monthly"})
            </span>{" "}
            <button
              className="change-plan-button"
              title="Go back to step 2"
              onClick={() => onChangeStep(2)}
            >
              Change
            </button>
          </span>
          <Price
            price={planPrice}
            yearly={isYearlyBillingEnabled}
            className="selected-plan-price bolder marine-blue-text"
          />
        </p>
        {selectedAddons.length > 0 && (
          <>
            <hr className="line" />
            <ul className="selected-addons-list">
              {/* ########## Continue here ########## */}
              {selectedAddons.map((sa) => {
                const price = getPrice(sa, isYearlyBillingEnabled);
                return (
                  <li
                    key={sa.id}
                    className="selected-addon flex space-between align-center"
                  >
                    <span className="selected-addon-name">{sa.name}</span>
                    <span className="selected-addon-price marine-blue-text">
                      +<Price price={price} yearly={isYearlyBillingEnabled} />
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>

      <p className="flex space-between total-price-wrapper align-center">
        <span>Total (per {isYearlyBillingEnabled ? "year" : "month"})</span>
        <span className="bolder purplish-blue-text total-price">
          +<Price price={total} yearly={isYearlyBillingEnabled} />
        </span>
      </p>
    </Section>
  );
};

export default FormStep4;
