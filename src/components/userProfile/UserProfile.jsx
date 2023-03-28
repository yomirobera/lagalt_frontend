import React from 'react';
import { useParams, Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import withAuth from '../../hoc/withAuth';
import keycloak from '../keycloak/keycloak';
import { apiUrl } from '../../api/user';
import { Card,Divider, Col, Row,Tag,Button,Space, Avatar,Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './UserProfile.css';

import musicImg from "../../assets/img/musicImg.png";
import github  from "../../assets/svg/github.svg";
import linkedin from "../../assets/svg/linkedin.svg";


const UserProfile = () => {

const { id } = useParams();
const [userInfo, setUserInfo] = useState(null);
const { Text } = Typography;
//keycloak.tokenParsed.sub
useEffect(() => {
    // Make an API call to get the project data
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(data => setUserInfo(data))
        .catch(error => console.log(error));
    }, [id]);

if (!userInfo) {
    return <div>Loading...</div>;
    }

return (
    <div className='userProfileInfo'>
      <div className='cardContainer'>
          {/* <img src={github} alt={`avatar`}/> */}
          <Space wrap size={70}><Avatar size={180} icon={<UserOutlined />}/></Space>
          <h1>{userInfo.f_name} {userInfo.l_name}</h1> 
          <Divider />     
          <Text>{userInfo.description} </Text>
          <Divider />
          <ul className='userProfilSkills'>
            <li><strong>Ferdigheter : </strong></li>
                {userInfo.skills.map(skill => (
                    <li key={skill}>{skill}</li>
                ))}
          </ul>
          <Divider />
          <div className="userProfileLinks">
            <a href={`https://github.com/${userInfo.github}`}>{<img src={github} alt={`github`}/>}</a>
            <a href={`https://www.linkedin.com/in/${userInfo.linkedin}`}>{<img src={linkedin} alt={`linkedIn`}/>}</a>
          </div>
      </div>
  </div>
  );
};

export default UserProfile;