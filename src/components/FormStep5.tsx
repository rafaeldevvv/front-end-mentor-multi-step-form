import * as React from "react";
import Section from "./Section";

const FormStep5 = () => {
  return (
    <Section labelledBy="thank-you-heading" className="thank-you">
      <img
        src="assets/images/icon-thank-you.svg"
        alt="checkmark"
        className="icon-thank-you"
      />
      <h2 id="thank-you-heading" className="thank-you-heading">
        Thank you!
      </h2>
      <p className="thank-you-message">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </Section>
  );
};

export default FormStep5;
