import { useEffect, useState, useCallback } from 'react';
import withAuth from '../../hoc/withAuth';
import keycloak from '../keycloak/keycloak';
import { apiUrl } from '../../api/user';
import './yourProfile.css';
import YourProjects from '../editProject/YourProjects';
import {Tag,Space,Card,Avatar, Typography, Divider, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";


const YourProfile = () => {
        const [user, setUser] = useState(null);
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [description, setDescription] = useState('');
        const [skills, setSkills] = useState([]);
        const { Text } = Typography;
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
     <>
        <div className='myProfile'>
          {/* <h2 className='min-profil'>Min profil</h2> */}
          <div className='wraperCard'>
            <Space wrap size={36}><Avatar size={140} icon={<UserOutlined />} /></Space>
            <Typography.Title level={3}>{firstName} {lastName}</Typography.Title>
            <Divider />
            <Typography.Paragraph>{description}
            </Typography.Paragraph>
            <Divider />
            <Typography.Paragraph>
              <strong>Mine ferdigheter</strong>
              <ul className='Skills'>
                {<Tag className='ferdigheter' style={{ borderRadius: 20, margin: '5px' }}></Tag> && skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </Typography.Paragraph>
             <Divider/>
             <YourProjects/>
             { <Button className='editProfilbtn' type="primary" htmlType="submit" onClick={() => {routeChange('/Profile')}}>
              ENDRE PROFIL
              </Button>
             }
          </div>
        </div>
     </>
      
    )
        
}

export default withAuth(YourProfile);