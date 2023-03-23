import { Form, Input } from 'antd';
import { useState, useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../api/projects';
import withAuth from '../../hoc/withAuth';


const ViewProject = () => {

const {id} = useParams();
const [ViewYourProject, setViewYourProject] = useState(null);

useEffect(() => {
    // Make an API call to get the project data
    fetch(`${API_URL}/${id}`)
      .then(response => response.json())
      .then(data => setViewYourProject(data))
      .catch(error => console.log(error));
  }, [id]);
//const project = useSelector(state => state.projects.data.find(project => project.id === id));
//find(project => project.id === id));
console.log(ViewYourProject);

    return (
        <>
           <div>
            {ViewYourProject && (
                <Form.Item
                 label="Vil du bli med på prosjektet? skriv et kort motivasjonsbrev"
                 name="title"
                 rules={[{ required: true, message: 'Skriv inn motivasjonsbrev!' }]}
                >
                <Input
                 placeholder="Utvikle plante-app"
                />
                </Form.Item>
            )}
           </div>
        </>
    )
        
}

export default withAuth(ViewProject); 