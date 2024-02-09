import { DatePicker, Form, FormInstance, Input } from "antd";

interface PersonalInformationProps {
  form: FormInstance;
}

const PersonalInformation = ({ form }: PersonalInformationProps) => {
  return (
    <Form layout="vertical" form={form}>
      <Form.Item label="Full Name" name="fullName" required>
        <Input placeholder="Enter your full name" />
      </Form.Item>

      <Form.Item label="Email" name="email" required>
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item label="Date of Birth" name="dob" required>
        <DatePicker
          placeholder="Select your date of birth"
          format={"DD MMMM YYYY"}
          allowClear
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default PersonalInformation;
