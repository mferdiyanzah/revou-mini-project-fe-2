import { Steps } from "antd";
import { useState } from "react";
import PersonalInformation from "../components/personal-information";
import AddressInformation from "../components/address-information/index.tsx";
import AccountInformation from "../components/account-information/index.tsx";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Personal Information",
    "Address Information",
    "Account Information",
  ];

  const items = steps.map((item, idx) => ({
    key: idx,
    title: item,
  }));

  const onNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const onPrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <section className="w-1/3 pr-4 gap-4 border-r border-gray-400 h-4/6 grid grid-rows-2">
        <div className="flex justify-center flex-col">
          <h1 className="text-6xl font-bold m-0 text-blue-900">SINAU</h1>
          <h3 className="mb-4 text-xl">Register</h3>
          <p className="text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum
            magnam excepturi sit quas, ratione magni, autem fuga cum saepe.
          </p>
        </div>

        <Steps direction="vertical" current={currentStep} items={items} />
      </section>

      <div className="w-2/3 pl-10">
        {currentStep === 0 && <PersonalInformation onNext={onNext} />}

        {currentStep === 1 && (
          <AddressInformation onPrevious={onPrev} onNext={onNext} />
        )}

        {currentStep === 2 && <AccountInformation onPrevious={onPrev} />}
      </div>
    </>
  );
};

export default Register;
