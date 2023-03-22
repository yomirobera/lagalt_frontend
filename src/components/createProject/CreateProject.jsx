import React, { useState } from 'react';
import { Form, Input, Button, Select, Tag } from 'antd';

import withAuth from '../../hoc/withAuth';
import { addProject } from '../../api/projects';
import './CreateProject.css'

const { Option } = Select;

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
  const [img_url, setImg_url] = useState(null);
  const [tags, setTags] = useState ([]);
  const [status, setStatus] = useState (null);

  //Defining an async function 
  const onFinish = async (values) => {
    setLoading(true);
    try {
      await addProject({ //gets addproject function from the api with project data
        ...values,
        owner: 1, // replace with actual owner ID
        img_url: img_url,
        tags: tags,
        status: status
        
      });
      form.resetFields(); //Reset the form fields
      alert(`Project added successfully. Image: ${img_url}`);
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

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) { // Check if files are present
      const reader = new FileReader();
      reader.onload = () => {
        setImg_url(reader.result); // Set the state to the selected file
      };
      reader.readAsDataURL(event.target.files[0]); // Read the selected file as a data URL
    } else {
      setImg_url(null); // If no file is selected, set the state to null
    }
  };

  const handleStatusChange = (value) => {  // Handler function for status change
    setStatus(value);  // Update status state value
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
        label="Navn på prosjektet"
        name="title"
        rules={[{ required: true, message: 'Skriv inn prosjekttittel!' }]}
      >
        <Input
         placeholder="Utvikle plante-app"
         />
      </Form.Item>

      <Form.Item
        label="Beskrivelse av prosjektet"
        name="description"
        rules={[{ required: true, message: 'Vennligst skriv inn prosjektbeskrivelse!' }]}
      >
        <Input.TextArea 
        placeholder="Hva går prosjektet ut på? Hvem står bak prosjektet?"
        />
      </Form.Item>

      <Form.Item
        label="Legg til tags som beskriver prosjektet"
        name="tags"
        >
        <Input
          placeholder="Skriv inn ferdigheter atskilt med komma"
          value={tags.join(",")}
          onChange={(e) => setTags(e.target.value.split(","))}
        />
        {tags.map((tag, index) => (
          <Tag key={index} closable onClose={() => {
            const newTags = [...tags];
            newTags.splice(index, 1);
            setTags(newTags);
          }}>{tag}</Tag>
        ))}
      </Form.Item>

      <Form.Item label="Kreativt felt:" name="category">
        <Select>
          <Select.Option value="Musikk">Musikk</Select.Option>
          <Select.Option value="Film">Film</Select.Option>
          <Select.Option value="Spillutvikling">Spillutvikling</Select.Option>
          <Select.Option value="Webutvikling">Webutvikling</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Progresjon" name="status">
        <Select onChange={handleStatusChange}>
          <Option value="Ikke påbegynt">Ikke påbegynt</Option>
          <Option value="I startfasen">I startfasen</Option>
          <Option value="Underveis">Underveis</Option>
          <Option value="I avslutningsfasen">I avslutningsfasen</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Image" name="image">
        <Input type="file" accept="image/*" onChange={handleImageChange} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          OPPRETT NYTT PROSJEKT
        </Button>
      </Form.Item>
    </Form>
  );
};

export default withAuth(CreateProject);
