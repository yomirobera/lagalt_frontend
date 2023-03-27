import { useEffect, useState, useCallback } from 'react';
import withAuth from '../../hoc/withAuth';
import keycloak from '../keycloak/keycloak';
import { apiUrl } from '../../api/user';
import './Profile.css';
import { useNavigate } from "react-router-dom";
import { Form, Input, Tag, Button } from 'antd';
import { createSkill } from '../../api/skill';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);

  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    try {
      // Update token and get user ID
      await keycloak.updateToken(5);
      const userId = keycloak.tokenParsed.sub;

      // Fetch user data with token in Authorization header
      const response = await fetch(`${apiUrl}/${userId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch user. Status code: ${response.status}`);
      }

      const fetchedUser = await response.json();
      setUser(fetchedUser);
      setFirstName(fetchedUser.f_name);
      setLastName(fetchedUser.l_name);
      setDescription(fetchedUser.description);
      setSkills(fetchedUser.skills)
    } catch (error) {
      // Handle error
    }
  }, [keycloak]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === 'f_name') {
      setFirstName(value);
    } else if (name === 'l_name') {
      setLastName(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'skills') {
      setSkills(value);
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("id: ", keycloak.tokenParsed.sub)
    console.log("fname: ", firstName)
    console.log("lname:", lastName)
    console.log("desc: ", description)
    console.log(event.target.hidden.checked)
    try {
      for await (const skill of skills) {
        await createSkill(skill);
      }
      const response = await fetch(`${apiUrl}/${keycloak.tokenParsed.sub}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: keycloak.tokenParsed.sub,
          f_name: firstName,
          l_name: lastName,
          description: description,
          skills: skills,
          hidden: event.target.hidden.checked
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to update user. Status code: ${response.status}`);
      }


      setUser(response);
      alert('User updated successfully');
    } catch (error) {
      alert(`Failed to update user: ${error.message}`);
    }
  };

  return (
    <div className="profile-form-container">
      {user ? (
        <div className="form-container">
          <h3>Din profil</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Fornavn:
              <input type="text" name="f_name" value={firstName} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              Etternavn:
              <input type="text" name="l_name" value={lastName} onChange={handleInputChange} />
            </label>
            <br />
            <label>
            Beskrivelse:
            <Input.TextArea rows={4} name="description" value={description} onChange={handleInputChange} />
            </label>
            <br />
            <label>
            Ferdigheter:
            <div className="skill-tags">
            {skills.map((skill, index) => (
            <Tag key={index} closable onClose={() => setSkills(skills.filter((s, i) => i !== index))}>
            {skill}
            </Tag>
            ))}
            </div>
            <Input placeholder="Legg til en ferdighet og trykk Enter" onPressEnter={(event) => {
            event.preventDefault();
            const newSkill = event.target.value;
            if (newSkill !== '') {
            setSkills([...skills, newSkill]);
            event.target.value = '';
            }
            }} />
            </label>
            <br />
            <label>
            Skjul profil for andre brukere:
            <input type="checkbox" name="hidden" />
            </label>
            <br />
            <button type="primary" htmlType="submit">OPPDATER PROFIL</button>
            <br/>
            <button className='tilbakeBtn' onClick={()=>navigate(-1)} style={{left:"43%"}}>Tilbake</button>
            </form>
            </div>
            ) : (
            <div>Laster inn profil...</div>
            )}
            </div>
    );
};

export default withAuth(Profile);