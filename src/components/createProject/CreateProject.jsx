import React, { useState } from 'react';
import { Form, Input, Button, Upload, Select } from 'antd';

import withAuth from '../../hoc/withAuth';
import { addProject } from '../../api/projects';

//Defining layout for the form components
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};

//Defining the layout for the submit button component
const tailLayout = {
  wrapperCol: { offset: 4, span: 8 },
};

//Creating the createproject functional component
const CreateProject = () => {

    //UseState hook
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  //Defining an async function 
  const onFinish = async (values) => {
    setLoading(true);
    try {
      await addProject({ //gets addproject function from the api with project data
        ...values,
        status: 'done', // default status
        owner: 1, // replace with actual owner ID
        img_url: imageUrl
      });
      form.resetFields(); //Reset the form fields
      alert(`Project added successfully. Image: ${imageUrl}`);
    } catch (error) {
      console.error(error); //Logs any errors to the console
      alert(`Error adding project: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  //Defining a function if a form submission fails
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  //Defining a function for handling image changes when an image is uploaded

  const handleImageChange = (info) => {
    const reader = new FileReader(); // creates a new filereader instance
    reader.onload = () => {
      const base64Url = reader.result;
      setImageUrl(base64Url);
    };
    reader.readAsDataURL(info.file.originFileObj); // reads the contents of the uploaded file as a binary data array
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

      <Form.Item label="Creative field:" name="category">
        <Select>
          <Select.Option value="Musikk">Musikk</Select.Option>
          <Select.Option value="Film">Film</Select.Option>
          <Select.Option value="Spillutvikling">Spillutvikling</Select.Option>
          <Select.Option value="Webutvikling">Webutvikling</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Image">
        <Upload
          name="avatar"
          accept="image/*"
          showUploadList={false}
          onChange={handleImageChange}
        >
          {imageUrl ? (
            <div style={{marginBottom: '16px'}}>
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            </div>
          ) : (
            <Button>Upload</Button>
          )}
        </Upload>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Project
        </Button>
      </Form.Item>
    </Form>
  );
};

export default withAuth(CreateProject);
