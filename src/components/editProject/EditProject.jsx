import withAuth from "../../hoc/withAuth";
import keycloak from "../keycloak/keycloak";
import { Card } from 'antd';

const EditProject = () => (
    <Card
    title= { keycloak.tokenParsed.name} 
    bordered={false}
    style={{
      width: 300,
      padding: 30,
    }}
  >
    <h2>Testing</h2>
  </Card>
);

 export default withAuth(EditProject);