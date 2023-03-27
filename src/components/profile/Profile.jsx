import React from "react";
import { useEffect, useState, useCallback } from 'react';
import withAuth from '../../hoc/withAuth';
import keycloak from '../keycloak/keycloak';
import { apiUrl } from '../../api/user';
import {  Tag} from 'antd';
import './Profile.css';
import { createSkill } from '../../api/skill';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  
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
    console.log("id: ",keycloak.tokenParsed.sub)
    console.log("fname: ",firstName)
    console.log("lname:", lastName)
    console.log("desc: ",description)
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
    <div className="profile-form">
      {user ? (
        <div className="form-container">
            <div className="card-header">
               <h3>Din profil</h3>
            </div>
            <div className="card-body">
                <form name=" Edit-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>
                        *Fornavn:
                        <input type="text" name="f_name" value={firstName} onChange={handleInputChange} />
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        *Etternavn:
                        <input type="text" name="l_name" value={lastName} onChange={handleInputChange} />
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                      Fortell litt mer om deg selv:
                        <textarea name="description" value={description} onChange={handleInputChange} />
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                          Legg til eller fjern ferdigheter som er ønsket i prosjektet:
                          <input
                            placeholder="Endre ferdigheter (atskilt med komma)"
                            value={skills.join(",")}
                            onChange={(e) => setSkills(e.target.value.split(",").map(tag => tag.trim()))}
                          />
                          {skills.map((tag, index) => (
                            <Tag key={index} closable onClose={() => {
                              const newTags = [...skills];
                              newTags.splice(index, 1);
                              setSkills(newTags);
                            }}>{tag}</Tag>
                          ))}
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input type="checkbox" name="hidden"/>
                        <span className="checkbox-text">
                          Jeg ønsker at ferdighetene mine skal holdes private, 
                          og kun skal deles med prosjekteier hvis jeg søker om å delta på et prosjekt.
                        </span>
                      </label>
                   </div>
                    <div className="form-group">
                      <button type="submit" className="btn-primary">Lagre Endringer</button>
                    </div>
                 </form>
              </div>
           </div>
      ) : (
  <p>Loading...</p>
)}    
</div>
);
};
export default withAuth(Profile);