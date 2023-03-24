import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Tag } from 'antd';
import withAuth from '../../hoc/withAuth';
import { updateProject } from '../../api/projects';
import { useLocation, useParams } from "react-router-dom";
import { API_URL } from '../../api/projects';



const { Option } = Select;
const EditProject = () => {  // Component function taking in project as prop
  // const location = useLocation();   
  const { projectId } = useParams()
  // let project = state;
  const [project, setProject] = useState(null);
  console.log(`${API_URL}/${projectId}`)
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [img_url, setImg_url] = useState();
  const [status, setStatus] = useState();
  const [tags, setTags] = useState ([]);
  const [skillsRequired, setSkillsRequired] = useState ([]);
    
  useEffect(() => {
      // Make an API call to get the project data
      fetch(`${API_URL}/${projectId}`)
        .then(response => response.json())
        .then(data => setProject(data))
        .catch(error => console.log("ERROR: ",error));
    }, []);

  console.log("JAAAAAAAAAA",project)
  if(project != null){
    // setTitle(project.title)
    // setDescription(project.description)
    // setCategory(project.category)
    // setImg_url(project.img_url)
    // setStatus(project.status)
    // setTags(project.tags)
    // setSkillsRequired(project.skillsRequired)
    const handleTitleChange = (event) => {  // Handler function for title change
      setTitle(event.target.value);  // Update title state value
    };
    const handleStatusChange = (value) => {  // Handler function for status change
      setStatus(value);  // Update status state value
    };
    const handleDescriptionChange = (event) => {  // Handler function for description change
      setDescription(event.target.value);  // Update description state value
    };
    const handleCategoryChange = (value) => {  // Handler function for category change
      setCategory(value);  // Update category state value
    };
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
    const handleSubmit = async (event) => {  // Handler function for form submission
      console.log("Submitting form..")
      alert(`img_url ${img_url}`);
      alert(`skillsRequired ${skillsRequired}`);
      const updatedProject = {  // Create updated project object with new values
        ...project,
        title,
        description,
        category,
        status,
        img_url,
        tags,
        skillsRequired
      };
      console.log(updatedProject);
      try {
        const response = await updateProject(project.id, updatedProject);  // Call API function to update project
        console.log("Project updated YAY!")
        alert("Project updated YAY!");
        // Handle successful response
      } catch (error) {
        alert(error);
        console.error("Error:", error);  // Log error message to console
      }
    };
    return (
      <Form onFinish={handleSubmit} initialValues={{title: project.title, status: project.status, description: project.description, category: project.category}}>
        <Form.Item label="Navn på prosjektet" name="title" rules={[{ required: true, message: 'Please input the title of the project!' }]}>
          <Input onChange={handleTitleChange} />
        </Form.Item>
        <Form.Item label="Progresjon" name="status">
          <Select onChange={handleStatusChange}>
            <Option value="Ikke påbegynt">Ikke påbegynt</Option>
            <Option value="I startfasen">I startfasen</Option>
            <Option value="Underveis">Underveis</Option>
            <Option value="I avslutningsfasen">I avslutningsfasen</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Beskrivelse" name="description" rules={[{ required: true, message: 'Please input the description of the project!' }]}>
          <Input.TextArea onChange={handleDescriptionChange} />
        </Form.Item>
        <Form.Item label="Kategori" name="category" rules={[{ required: true, message: 'Please select the creative field!' }]}>
          <Select onChange={handleCategoryChange}>
            <Option value="Musikk">Musikk</Option>
            <Option value="Film">Film</Option>
            <Option value="Spillutvikling">Spillutvikling</Option>
            <Option value="Webutvikling">Webutvikling</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Image" name="image">
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Item>
        <Form.Item
          label="Legg til eller fjern ferdigheter som er ønsket i prosjektet"
          name="skills"
          >
          <Input
            placeholder="Endre ferdigheter (atskilt med komma)"
            value={skillsRequired.join(",")}
            onChange={(e) => setSkillsRequired(e.target.value.split(",").map(tag => tag.trim()))}
          />
          {skillsRequired.map((tag, index) => (
            <Tag key={index} closable onClose={() => {
              const newTags = [...skillsRequired];
              newTags.splice(index, 1);
              setSkillsRequired(newTags);
            }}>{tag}</Tag>
          ))}
        </Form.Item>
        <Form.Item
          label="Legg til eller fjern tags som beskriver prosjektet"
          name="tags"
          >
          <Input
            placeholder="Endre tags (atskilt med komma)"
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
        <Form.Item>
          <Button type="primary" htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    );
  }

};
export default withAuth(EditProject);