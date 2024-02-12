import { Form, Input, Row, Select } from "antd";
import { dummyStateCityZip } from "./address-information.dummy";
import {
  AddressInformationProps,
  IAddressInformationForm,
  IStateData,
} from "./address-information.interface";
import { useEffect, useState } from "react";

const AddressInformation = ({
  onPrevious,
  onNext,
}: AddressInformationProps) => {
  const [form] = Form.useForm<IAddressInformationForm>();
  const formValues = Form.useWatch([], form);
  const [selectedCity, setSelectedCity] = useState<number>(-1);
  const [selectedStates, setSelectedStates] = useState<IStateData[]>();
  const [selectedZip, setSelectedZip] = useState<string[]>();
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(true);

  useEffect(() => {
    const localValues = JSON.parse(
      localStorage.getItem("addressInformation") as string
    );
    if (!localValues) return;

    setSelectedCity(Number(localValues.city));
    setSelectedStates(
      dummyStateCityZip[Number(localValues.city)].cities as IStateData[]
    );
    setSelectedZip(
      dummyStateCityZip[Number(localValues.city)].cities[
        Number(localValues.state)
      ].zip
    );

    form.setFieldsValue(localValues);
  }, []);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((currentValues) => {
        setIsNextBtnDisabled(!Object.values(currentValues).length);
      })
      .catch(() => {
        setIsNextBtnDisabled(true);
      });

    const formValues = form.getFieldsValue();

    if (formValues.city) {
      setSelectedCity(Number(formValues.city));
      setSelectedStates(
        dummyStateCityZip[Number(formValues.city)].cities as IStateData[]
      );
    }

    if (formValues.state) {
      setSelectedZip(
        dummyStateCityZip[Number(formValues.city)].cities[
          Number(formValues.state)
        ].zip
      );
    }
    saveToLocalStorage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);

  const saveToLocalStorage = () => {
    const values = form.getFieldsValue();
    const jsonValues = JSON.stringify(values, (_, value) => {
      if (value === undefined) {
        return "";
      }
      return value;
    });

    localStorage.setItem("addressInformation", jsonValues);
  };

  const onClickNext = () => {
    saveToLocalStorage();
    onNext();
  };

  const cityOptions = dummyStateCityZip.map((item, idx) => ({
    label: item.name,
    value: String(idx),
  }));

  return (
    <Form
      layout="vertical"
      form={form}
      className="w-full"
      size="large"
      autoCorrect="off"
      autoComplete="off"
    >
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
        />
      </Form.Item>

      <Form.Item label="State" name="state" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder="Select your state"
          options={selectedStates?.map((item, idx) => ({
            label: item.name,
            value: String(idx),
          }))}
          disabled={selectedCity === -1}
        />
      </Form.Item>

      <Form.Item label="ZIP Code" name="zip" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder="Select your zip code"
          options={selectedZip?.map((item, idx) => ({
            label: item,
            value: String(idx),
          }))}
          disabled={selectedStates === undefined || selectedZip === undefined}
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
