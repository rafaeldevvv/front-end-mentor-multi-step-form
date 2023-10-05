import * as React from "react";
import { useState, useEffect, useRef } from "react";
import StepList from "./components/StepList";
import Footer from "./components/Footer";
import Form from "./components/Form";

import { IAddon, IPlan } from "./interfaces";

export default function App() {
  const [step, setStep] = useState(1);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // for content to be read out on load
    setTimeout(() => {
      headingRef.current!.focus();
    }, 1000)
  }, []);

  function handleNextStep() {
    setStep((s) => Math.min(s + 1, 5));
  }

  function handleGoBack() {
    setStep((s) => Math.max(s - 1, 1));
  }

  const plans: Array<IPlan> = [
    {
      name: "arcade",
      monthlyPrice: 9,
      icon: "assets/images/icon-arcade.svg",
      yearlyPrice: 90,
      id: 0,
    },
    {
      name: "advanced",
      monthlyPrice: 12,
      icon: "assets/images/icon-advanced.svg",
      yearlyPrice: 120,
      id: 1,
    },
    {
      name: "pro",
      monthlyPrice: 15,
      icon: "assets/images/icon-pro.svg",
      yearlyPrice: 150,
      id: 2,
    },
  ];

  const addons: IAddon[] = [
    {
      name: "Online service",
      desc: "Access to multiplayer games",
      monthlyPrice: 1,
      yearlyPrice: 10,
      id: 0,
    },
    {
      name: "Larger storage",
      desc: "Extra 1TB of cloud save",
      monthlyPrice: 2,
      yearlyPrice: 20,
      id: 1,
    },
    {
      name: "Customizable Profile",
      desc: "Custom theme on your profile ",
      monthlyPrice: 2,
      yearlyPrice: 20,
      id: 2,
    },
  ];

  return (
    <>
      <main className="no-focus-ring" aria-live="polite">
        <h1 className="sr-only" ref={headingRef} tabIndex={-1}>Multi-step form</h1>
        <div className="content-wrapper">
          <section className="form-navigation" aria-label="Steps">
            <StepList currentStep={step} />
          </section>
          <Form
            step={step}
            onNextStep={handleNextStep}
            onGoBack={handleGoBack}
            onChangeStep={setStep}
            addons={addons}
            plans={plans}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
