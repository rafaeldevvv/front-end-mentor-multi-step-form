import * as React from "react";
import { FC, useState } from "react";

import CustomCheckbox from "./CustomCheckbox";
import Price from "./Price";
import Section from "./Section";

import { IAddon, IFormData } from "../interfaces";
import { ID } from "../types";
import getPrice from "../utils/getPrice";
import getIdFrom from "../utils/getIdFrom";

interface IAddonComponent {
  addon: IAddon;
  checked: boolean;
  onChange: (addonId: ID) => void;
  isYearlyBillingEnabled: boolean;
}
const Addon: FC<IAddonComponent> = ({
  addon,
  checked,
  onChange,
  isYearlyBillingEnabled,
}) => {
  const [isCheckboxFocused, setIsCheckboxFocused] = useState(false);
  const addonId = getIdFrom(addon.name, "_", "addon_");

  let labelClassName = "flex align-center space-between radio-label";
  if (checked) labelClassName += " selected";
  if (isCheckboxFocused) labelClassName += " focused";

  return (
    <label htmlFor={addonId} className={labelClassName}>
      <div className="flex align-center gap-1">
        <CustomCheckbox
          checked={checked}
          id={addonId}
          onChange={() => {
            onChange(addon.id);
          }}
          onChangeFocus={setIsCheckboxFocused}
        />
        <div className="addon-text">
          <p className="addon-name bold marine-blue-text">{addon.name}</p>
          <p className="addon-desc">{addon.desc}</p>
        </div>
      </div>
      <Price
        price={getPrice(addon, isYearlyBillingEnabled)}
        className="addon-price"
        yearly={isYearlyBillingEnabled}
      />
    </label>
  );
};

interface IFormStep3 {
  formData: IFormData;
  addons: IAddon[];
  onToggleAddon: (addonId: ID) => void;
}

const FormStep3: FC<IFormStep3> = ({ addons, onToggleAddon, formData }) => {
  const { selectedAddonsIds, isYearlyBillingEnabled } = formData;

  return (
    <Section
      heading="Pick add-ons"
      description="Add-ons help enhance your gaming experience"
    >
      <fieldset name="addons">
        <legend className="addons">Add-ons</legend>
        <ul className="addons-list">
          {addons.map((addon) => {
            return (
              <li key={addon.name} className="radio-label-wrapper">
                <Addon
                  addon={addon}
                  onChange={onToggleAddon}
                  checked={selectedAddonsIds.indexOf(addon.id) !== -1}
                  isYearlyBillingEnabled={isYearlyBillingEnabled}
                />
              </li>
            );
          })}
        </ul>
      </fieldset>
    </Section>
  );
};

export default FormStep3;
