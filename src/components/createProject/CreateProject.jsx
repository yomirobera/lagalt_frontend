import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { addProject } from '../../api/projects';
import withAuth from '../../hoc/withAuth';

//Defining form layout
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};

// Button layout
const tailLayout = {
  wrapperCol: { offset: 4, span: 8 },
};

//Defining CreateProject component
const CreateProject = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await addProject(values); //Add project
      form.resetFields();
      alert('Project added successfully');
    } catch (error) {
      console.error(error);
      alert(`Error adding project: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="add-project"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input project title!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input project description!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Project
        </Button>
      </Form.Item>
    </Form>
  );
};

export default  withAuth(CreateProject);
