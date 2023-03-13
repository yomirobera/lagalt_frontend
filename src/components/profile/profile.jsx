import { Button, Card } from "antd";
import withAuth from "../../hoc/withAuth";
import keycloak from "../keycloak/keycloak";

const Profile = () => (
    <Card
    title= { keycloak.tokenParsed.name} 
    bordered={false}
    style={{
      width: 300,
      padding: 30,
    }}
  >
    <p>Name: { keycloak.tokenParsed.name}</p>
    <p>Username: { keycloak.tokenParsed.preferred_username}</p>
    
    <p>Sub: { keycloak.tokenParsed.sub }</p>
    <Button>Edit</Button>
  </Card>
);

 export default withAuth(Profile);