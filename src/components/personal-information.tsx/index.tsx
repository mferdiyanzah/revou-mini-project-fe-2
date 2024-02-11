import { DatePicker, Form, Input } from "antd";
import {
  IPersonalInformationForm,
  PersonalInformationProps,
} from "./personal-information.interface";
import { useState } from "react";
import {
  dateConfig,
  emailConfig,
  fullNameConfig,
} from "./personal-information.config";
import dayjs from "dayjs";

const PersonalInformation = ({ onNext }: PersonalInformationProps) => {
  const [form] = Form.useForm<IPersonalInformationForm>();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const onFormChange = () => {
    const values = form.getFieldsValue();
    const checkIfEmpty = Boolean(
      !values.fullName || !values.email || !values.dob
    );
    console.log(checkIfEmpty, values);
    setIsBtnDisabled(checkIfEmpty);
  };

  const onClickNext = () => {
    onNext();
    const values = form.getFieldsValue();
    values.dob = dayjs(values.dob).format("DD MMMM YYYY");
    localStorage.setItem("personalInformation", JSON.stringify(values));
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onChange={onFormChange}
      autoComplete="off"
    >
      <Form.Item label="Full Name" name="fullName" required {...fullNameConfig}>
        <Input placeholder="Enter your full name" />
      </Form.Item>

      <Form.Item label="Email" name="email" required {...emailConfig}>
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item label="Date of Birth" name="dob" required {...dateConfig}>
        <DatePicker
          placeholder="Select your date of birth"
          format={"DD MMMM YYYY"}
          allowClear
          className="w-full"
          onChange={onFormChange}
        />
      </Form.Item>
      <div className="flex justify-end">
        <button
          className={` px-5 py-2 text-white rounded-md text-sm ${
            isBtnDisabled ? "cursor-not-allowed bg-gray-200" : "bg-blue-900"
          }`}
          onClick={onClickNext}
          disabled={isBtnDisabled}
        >
          Next
        </button>
      </div>
    </Form>
  );
};

export default PersonalInformation;
