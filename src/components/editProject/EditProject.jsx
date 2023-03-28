import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, Tag } from 'antd';
import withAuth from '../../hoc/withAuth';
import { updateProject } from '../../api/projects';
import axios from 'axios';
import { useParams } from 'react-router';
import './editProject.css';
const { Option } = Select;
const EditProject = () => {  // Component function taking in project as propz
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [img_url, setImg_url] = useState('');
  const [status, setStatus] = useState('');
  const [tags, setTags] = useState ([]);
  const [skillsRequired, setSkillsRequired] = useState ([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
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
  useEffect(() => {
    axios.get(`https://superproapiavkennylu.azurewebsites.net/api/v1/project/${projectId}`)
      .then(response => {
        setProject(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCategory(response.data.category);
        setImg_url(response.data.img_url);
        setStatus(response.data.status);
        setTags(response.data.tags);
        setSkillsRequired(response.data.skillsRequired);
        setIsLoading(false);
        console.log(title);
        console.log(status);
        console.log(description);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, [projectId]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const onFinish = async (values) => {
    const projectData = {
      ...values,
      id: project.id,
      title: title,
      description: description,
      category: category,
      img_url: img_url,
      status: status,
      skillsRequired: skillsRequired,
      tags: tags
    };
    updateProject(project.id, projectData)
      .then(response => {
        console.log(response);
        // Redirect to project page
      })
      .catch(error => {
        console.log(error);
      });
      alert("Prosjektet er oppdatert");
  };
  console.log(`description: ${description}`)
    console.log(`tags: ${tags}`)
    console.log(`skillsReq: ${skillsRequired}`)
  return (
    <div className='form-cont'>
        <Form className='RedigerForm' onFinish={onFinish} initialValues={{title: title, status: status, description:
          description, category: category, img_url: img_url, tags: tags, skillsRequired: skillsRequired}}>
            <b> Navn på prosjektet</b>
          <Form.Item  name="title" rules={[{ required: true, message: 'Please input the title of the project!' }]}>
            <Input onChange={handleTitleChange} />
          </Form.Item>
          <b>Progresjon</b>
          <Form.Item name="status">
            <Select onChange={handleStatusChange}>
              <Option value="Ikke påbegynt">Ikke påbegynt</Option>
              <Option value="I startfasen">I startfasen</Option>
              <Option value="Underveis">Underveis</Option>
              <Option value="I avslutningsfasen">I avslutningsfasen</Option>
            </Select>
          </Form.Item>
          <b>Beskrivelse</b>
          <Form.Item name="description" rules={[{ required: true, message: 'Please input the description of the project!' }]}>
            <Input.TextArea onChange={handleDescriptionChange} />
          </Form.Item>
          <b> Kategori</b>
          <Form.Item name="category" rules={[{ required: true, message: 'Please select the creative field!' }]}>
            <Select onChange={handleCategoryChange}>
              <Option value="Musikk">Musikk</Option>
              <Option value="Film">Film</Option>
              <Option value="Spillutvikling">Spillutvikling</Option>
              <Option value="Webutvikling">Webutvikling</Option>
            </Select>
          </Form.Item>
          <b>Bilde</b>
          <Form.Item name="image">
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </Form.Item>
          <b>Legg til eller fjern ferdigheter som er ønsket i prosjektet</b>
          <Form.Item
            name="skillsRequired"
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
          <b>Legg til eller fjern tags som beskriver prosjektet</b>
          <Form.Item
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
          <Button type="primary" htmlType="submit" style={{margin: "8%", width: "100%"}}>Lagre endringer</Button>
          <Button onClick={()=>navigate(-2)} style={{display: "block"}}>Tilbake</Button>
        </Form>
    </div>
  );
};
export default withAuth(EditProject);