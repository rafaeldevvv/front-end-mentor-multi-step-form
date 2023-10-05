import * as React from "react";
import { FC } from "react";

interface IButtonSwitch {
  checked: boolean;
  id: string;
  onToggle: (boolean: boolean) => void;
  srLabel: string;
  textOff: string;
  textOn: string;
}
const ButtonSwitch: FC<IButtonSwitch> = ({
  checked,
  id,
  onToggle,
  srLabel,
  textOff,
  textOn,
}) => {
  return (
    <>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        id={id}
        onClick={() => {
          onToggle(!checked);
        }}
        aria-label={srLabel}
      >
        <span className="off" aria-hidden="true">
          {textOff}
        </span>
        <span className="switch">
          <span className="switch-ball"></span>
        </span>
        <span className="on" aria-hidden="true">
          {textOn}
        </span>
      </button>
    </>
  );
};

export default ButtonSwitch;
