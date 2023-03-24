import { useEffect, useState, useCallback } from 'react';
import withAuth from '../../hoc/withAuth';
import keycloak from '../keycloak/keycloak';
import { apiUrl } from '../../api/user';
import './Profile.css';
import YourProjects from '../editProject/YourProjects';
import {Tag, Button} from 'antd';
import { useNavigate } from "react-router-dom";


const YourProfile = () => {
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
            setSkills(fetchedUser.skills);
            
          } catch (error) {
            // Handle error
          }
        }, [keycloak]);
      
        useEffect(() => {
          fetchUser();
        }, [fetchUser]);

        let navigate = useNavigate(); 
        const routeChange = (path) =>{ 
          navigate(path);}

            console.log(typeof skills)
    return ( 
        <div>

            <h2 className='min-profil'>Min profil</h2>
            <p>{firstName} {lastName}</p>
            <p>{description}</p>
    
            <ul className='Skills'>
            <h3 className='ferdigheterTittel'>Mine ferdigheter</h3>
            { <Tag className='ferdigheter' style={{ borderRadius: 20, margin: '5px' }}></Tag> && skills.map((skill, index) => (
             <li key={index}>{skill}</li>
                ))}
            </ul>
    
            <YourProjects/>
            <Button type="primary" htmlType="submit"
             onClick={() => {routeChange('/Profile')}}>ENDRE PROFIL
            </Button>
            
        </div>

    )
        
}

export default withAuth(YourProfile);