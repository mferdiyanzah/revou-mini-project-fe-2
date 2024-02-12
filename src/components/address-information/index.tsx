import { Form, Input, Row, Select } from "antd";
import { dummyStateCityZip } from "./address-information.dummy";
import { AddressInformationProps } from "./address-information.interface";
import { useEffect, useState } from "react";

const AddressInformation = ({
  onPrevious,
  onNext,
}: AddressInformationProps) => {
  const [form] = Form.useForm();
  const formValues = Form.useWatch([], form);
  const [selectedCityState, setSelectedCityState] = useState({
    city: -1,
    state: -1,
  });
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(true);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((currentValues) => {
        setIsNextBtnDisabled(!Object.values(currentValues).length);
      })
      .catch(() => {
        setIsNextBtnDisabled(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);

  const onClickNext = () => {
    const values = form.getFieldsValue();
    localStorage.setItem("addressInformation", JSON.stringify(values));
    onNext();
  };

  const cityOptions = dummyStateCityZip.map((item, idx) => ({
    label: item.name,
    value: idx,
  }));

  return (
    <Form layout="vertical" form={form} size="large" autoCorrect="off">
      <Form.Item
        label="Street Address"
        name="address"
        rules={[{ required: true }]}
      >
        <Input placeholder="Enter your street address" />
      </Form.Item>

      <Form.Item label="City" name="city" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder="Select your city"
          options={cityOptions}
          onChange={(value) => setSelectedCityState({ city: value, state: -1 })}
        />
      </Form.Item>

      <Form.Item label="State" name="state" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder="Select your state"
          options={dummyStateCityZip[selectedCityState.city]?.cities.map(
            (item, idx) => ({
              label: item.name,
              value: idx,
            })
          )}
          onChange={(value) =>
            setSelectedCityState({ ...selectedCityState, state: value })
          }
          disabled={selectedCityState.city === -1}
        />
      </Form.Item>

      <Form.Item label="ZIP Code" name="zip" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder="Select your zip code"
          options={dummyStateCityZip[selectedCityState.city]?.cities[
            selectedCityState.state
          ]?.zip.map((item, idx) => ({
            label: item,
            value: idx,
          }))}
          disabled={
            selectedCityState.city === -1 || selectedCityState.state === -1
          }
        />
      </Form.Item>

      <Row justify="space-between">
        <button
          className="px-5 py-2 text-white rounded-md text-sm bg-blue-900"
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          className={` px-5 py-2 text-white rounded-md text-sm ${
            isNextBtnDisabled ? "cursor-not-allowed bg-gray-200" : "bg-blue-900"
          }`}
          onClick={onClickNext}
          disabled={isNextBtnDisabled}
        >
          Next
        </button>
      </Row>
    </Form>
  );
};

export default AddressInformation;
