import { Form, Input, Button } from "antd";
import { useEffect } from "react";
import { useLf } from "../LfContext";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const EdgeForm = ({ data, onClose }) => {
  const [form] = Form.useForm();
  const { lfInstance } = useLf();

  const onFinish = (values) => {
    lfInstance.current.setProperties(data.id, values);
    lfInstance.current.updateText(data.id, values.name);
    onClose();
  };
  useEffect(() => {
    if (data) {
      const properties = data.properties;
      form.setFieldsValue(properties);
    } else {
      form.resetFields();
    }
  }, [data]);
  return (
    <Form form={form} {...layout} onFinish={onFinish}>
      <Form.Item name="name" label="名称" rules={[{ required: true }]}>
        <Input maxLength={50} allowClear />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          确定
        </Button>
      </Form.Item>
    </Form>
  );
};
