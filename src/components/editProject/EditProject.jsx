import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import withAuth from '../../hoc/withAuth';
import { updateProject } from '../../api/projects';

const { Option } = Select;  

const EditProject = ({ project }) => {  // Component function taking in project as prop
  const [title, setTitle] = useState(project.title);  
  const [description, setDescription] = useState(project.description);  
  const [category, setCategory] = useState(project.category);  
  const [imageUrl, setImageUrl] = useState(project.imageUrl);  

  const handleTitleChange = (event) => {  // Handler function for title change
    setTitle(event.target.value);  // Update title state value
  };

  const handleDescriptionChange = (event) => {  // Handler function for description change
    setDescription(event.target.value);  // Update description state value
  };

  const handleCategoryChange = (value) => {  // Handler function for category change
    setCategory(value);  // Update category state value
  };

  const handleImageChange = (event) => {  // Handler function for image change
    const file = event.target.files[0];  
    const reader = new FileReader(); 
    reader.onload = (event) => { 
      setImageUrl(event.target.result);  // Update imageUrl state value with image data URL
    };
    reader.readAsDataURL(file);  // Read file as data URL
  };

  const handleSubmit = async (event) => {  // Handler function for form submission
    event.preventDefault();  // Prevent default form submission behavior
    console.log("Submitting form..")

    const updatedProject = {  // Create updated project object with new values
      ...project,  
      title,  
      description,  
      category,  
      imageUrl,  
    };
  
    try {
      const response = await updateProject(project.id, updatedProject);  // Call API function to update project
      console.log("Project updated YAY!")
      // Handle successful response
    } catch (error) {
      console.error("Error:", error);  // Log error message to console
    }
  };

  return (
    <Form onSubmit={handleSubmit} initialValues={{title: project.title, description: project.description, category: project.category}}>
      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title of the project!' }]}>
        <Input onChange={handleTitleChange} />
      </Form.Item>
      <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the description of the project!' }]}>
        <Input.TextArea onChange={handleDescriptionChange} />
      </Form.Item>
      <Form.Item label="Creative field" name="category" rules={[{ required: true, message: 'Please select the creative field!' }]}>
        <Select onChange={handleCategoryChange}>
          <Option value="Musikk">Musikk</Option>
          <Option value="Film">Film</Option>
          <Option value="Spillutvikling">Spillutvikling</Option>
          <Option value="Webutvikling">Webutvikling</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Image" name="image">
        {imageUrl && <img src={imageUrl} alt="Project" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  );
};
export default withAuth(EditProject);