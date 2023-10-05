import * as React from "react";
import { FC, useState } from "react";

interface ICustomCheckbox {
  checked: boolean,
  id: string,
  onChange: (boolean: boolean) => void;
  onChangeFocus: (boolean: boolean) => void;
}

const CustomCheckbox: FC<ICustomCheckbox> = ({
  checked,
  id,
  onChange,
  onChangeFocus
}) => {
  const [isFocused, setIsFocused]= useState(false);
  let customCheckBoxClassName = "custom-checkbox";
  if (checked) customCheckBoxClassName += " checked";
  if (isFocused) customCheckBoxClassName += " focused";

  return (
    <div>
      <input
        className="sr-only"
        type="checkbox"
        checked={checked}
        id={id}
        onChange={(e) => onChange(e.target.checked)}
        onFocus={() => onChangeFocus(true)}
        onBlur={() => onChangeFocus(false)}
      />
      <span
        className={customCheckBoxClassName}
        aria-hidden="true"
      />
    </div>
  );
};

export default CustomCheckbox;
