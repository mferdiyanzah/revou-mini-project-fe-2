import React from "react";
import { AddressInformationProps } from "./address-information.interface";
import { Form, Input, Select } from "antd";
import { dummyStateCityZip } from "./address-information.dummy";

const AddressInformation = ({
  onPrevious,
  onNext,
}: AddressInformationProps) => {
  const [form] = Form.useForm();

  return (
    <Form layout="vertical" form={form}>
      <Form.Item label="Street Address" name="address" required>
        <Input placeholder="Enter your street address" />
      </Form.Item>

      <Form.Item label="City" name="city" required>
        <Select
          placeholder="Select your city"
          options={dummyStateCityZip.map((item) => ({
            label: item.name,
            value: item.name,
          }))}
        />
      </Form.Item>

      <Form.Item label="State" name="state" required>
        <Input placeholder="Enter your state" />
      </Form.Item>

      <Form.Item label="ZIP Code" name="zip" required>
        <Input placeholder="Enter your zip code" />
      </Form.Item>

      <div className="flex justify-between">
        <button
          className="px-5 py-2 text-white rounded-md text-sm bg-blue-900"
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          className="px-5 py-2 text-white rounded-md text-sm bg-blue-900"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </Form>
  );
};

export default AddressInformation;
