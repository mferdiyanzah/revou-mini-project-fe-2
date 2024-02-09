import { Steps } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import "./App.css";
import PersonalInformation from "./components/personal-information.tsx";

function App() {
  const [form] = useForm();

  const steps = [
    {
      title: "Personal Information",
      content: <PersonalInformation form={form} />,
    },
    {
      title: "Address Information",
      content: "Step 2 content",
    },
    {
      title: "Account Information",
      content: "Step 3 content",
    },
  ];

  const [current, setCurrent] = useState(0);

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <main className=" w-7/12 my-0 mx-auto h-screen items-center gap-2 flex justify-center p-10">
      <section className="w-1/3 pr-4 gap-4 border-r border-gray-400 h-4/6 grid grid-rows-2">
        <div className="flex justify-center flex-col">
          <h1 className="text-6xl font-bold m-0 text-blue-900">SINAU</h1>
          <h3 className="mb-4 text-xl">Register</h3>
          <p className="text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum
            magnam excepturi sit quas, ratione magni, autem fuga cum saepe.
          </p>
        </div>

        <Steps direction="vertical" current={current} items={items} />
      </section>

      <section className="w-2/3 pl-10">
        {steps[current].content}

        <div>
          <button
            onClick={prev}
            className="mr-4 bg-blue-900 px-5 py-2 text-white rounded-md text-sm"
            disabled={current === 0}
          >
            Prev
          </button>
          {current < steps.length - 1 && (
            <button
              className=" bg-blue-900 px-5 py-2 text-white rounded-md text-sm"
              onClick={next}
            >
              Next
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
