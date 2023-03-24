import React, { useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import { apiUrl_apply } from '../../api/user';
import { Card, Col, Row,Tag,Button} from 'antd';
import './applyToProject.css';
import keycloak from '../keycloak/keycloak';
import musicImg from "../../assets/img/musicImg.png";


const ApplyForm =  (props) => {

    const [motivationLetter, setMotivationLetter] = useState('');
    const userId = keycloak.tokenParsed.sub;
    console.log('projectId',props.projectId, 'userId',userId)
    const handleMotivationLetterChange = (event) => {
        setMotivationLetter(event.target.value);
      };

    const handleSubmit = async (event) => {
       event.preventDefault();
       console.log(motivationLetter)
       console.log(userId)
       console.log("project: ",props.projectId)

        try {
            const response = await fetch (apiUrl_apply , {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                         },
                body: JSON.stringify({
                        motivation:motivationLetter,
                        user: userId,
                        project: props.projectId.id,
                    })
            })
            if (!response.ok){
                throw new Error('Error: Could not create application ')
            }
            const data = await response.json()
            return [null,data]
        }
    

    catch (error) {
          return [error.message,[]]

    }
}

return (
    <form onSubmit={handleSubmit}>
      <label>
        Motivation Letter:
        <textarea value={motivationLetter} onChange={handleMotivationLetterChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ApplyForm;






