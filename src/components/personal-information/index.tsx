import { DatePicker, Form, Input, Row } from "antd";
import {
  IPersonalInformationForm,
  PersonalInformationProps,
} from "./personal-information.interface";
import { useEffect, useState } from "react";
import {
  dateConfig,
  emailConfig,
  fullNameConfig,
} from "./personal-information.config";
import dayjs from "dayjs";

const PersonalInformation = ({ onNext }: PersonalInformationProps) => {
  const [form] = Form.useForm<IPersonalInformationForm>();
  const formValues = Form.useWatch([], form);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((currentValues) => {
        setIsBtnDisabled(!Object.values(currentValues).length);
      })
      .catch(() => {
        setIsBtnDisabled(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);

  const onClickNext = () => {
    const values = form.getFieldsValue();
    values.dob = dayjs(values.dob).format("DD MMMM YYYY");
    localStorage.setItem("personalInformation", JSON.stringify(values));
    onNext();
  };

  return (
    <Form layout="vertical" form={form} autoComplete="off" size="large">
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
        />
      </Form.Item>

      <Row justify="end">
        <button
          className={` px-5 py-2 text-white rounded-md text-sm ${
            isBtnDisabled ? "cursor-not-allowed bg-gray-200" : "bg-blue-900"
          }`}
          onClick={onClickNext}
          disabled={isBtnDisabled}
        >
          Next
        </button>
      </Row>
    </Form>
  );
};

export default PersonalInformation;
