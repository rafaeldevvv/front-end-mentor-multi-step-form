import * as React from "react";
import { FC, PropsWithChildren } from "react";
import getIdFrom from "../utils/getIdFrom";

type TSection = {
  heading?: string;
  description?: string;
  className?: string;
  labelledBy?: string;
};

const Section: FC<PropsWithChildren<TSection>> = ({
  children,
  heading,
  description,
  className = "",
  labelledBy,
}) => {
  let id = labelledBy;
  if (heading) id = getIdFrom(heading);

  return (
    <section
      aria-labelledby={id}
      className={className}
    >
      {heading && <h2 id={id}>{heading}</h2>}
      {description && <p>{description}</p>}
      {children}
    </section>
  );
};

export default Section;
