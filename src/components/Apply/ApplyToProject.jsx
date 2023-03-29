import React, { useState,useEffect } from 'react';
import { useParams, Link} from 'react-router-dom';
import { apiUrl_apply } from '../../api/user';
import { Card, Col, Row,Tag,Button} from 'antd';
import './applyToProject.css';
import keycloak from '../keycloak/keycloak';
import musicImg from "../../assets/img/musicImg.png";


const ApplyForm =  (props) => {
  const [motivationLetter, setMotivationLetter] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); 

  useEffect(() => {
    if (isSubmitted && isChecked) {
      setMotivationLetter('');
   
    }
  }, [isSubmitted]);



    if (keycloak.authenticated){

      const userId = keycloak.tokenParsed.sub;
      console.log('projectId',props.projectId, 'userId',userId)
      const handleMotivationLetterChange = (event) => {
          setMotivationLetter(event.target.value);
        };
  
      const handleSubmit = async (event) => {
         event.preventDefault();
         setIsSubmitted(true); // set state to true if the user submits
         if (isChecked) { //check if the checkbox is selected for terms agrement
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
     
    
    } else{ }
    setIsChecked(false);
  }

  return (
    <div className='applyForm'>
      <form onSubmit={handleSubmit}>
        <label>
          <span style={{fontSize: "12px", fontWeight: "bold", fontFamily: "'Times New Roman', Times, serif", color:"#000"}}>
            Vil du bli med på dette Prosjektet? Skriv et kort motivasjonbrev
          </span>
          <textarea  style={{ height: "100px" }} placeholder="Hva var det som vekket interessen din med dette prosjektet? Har du vært med på lignende prosjekter før? Hva motiveres du av?" 
                 value={motivationLetter} onChange={handleMotivationLetterChange} />
        </label>
        <br/>
        <div className='motivForm'>
          <label>
            <input className='formCheckbox' type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
             Jeg samtykker at eier av prosjektet kan se profillinformasjonen min, og at dette inkluderer ferdighetene mine
          </label>
        </div>
        <br/>
        {/* set control if user is submited but not agreed to terms (not selected checkbox) then give red error message */}
        {isSubmitted && !isChecked  && <div className='greenMessage' style={{ color: 'red' }}>Du må gi samtykker først før du sender brevet!</div>}
        {isChecked && isSubmitted && <div className='redMessage' style={{ color: 'green' }}>Takk for at du sendte inn skjemaet!</div>}
        
        <button type="submit">SØK OM Å BLI MED PÅ PROSJEKTET</button>
      </form>
     
   </div>
  );
 }
}

export default ApplyForm;






