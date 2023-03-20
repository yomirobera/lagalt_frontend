import { useEffect, useState } from 'react';
import { getUser } from '../../api/user';
import withAuth from '../../hoc/withAuth';
import keycloak from '../keycloak/keycloak';


const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Update token and get user ID
        await keycloak.updateToken(5);
        const userId = keycloak.tokenParsed.sub;

        // Fetch user data with token in Authorization header
        const response = await fetch(`/api/v1/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${keycloak.token}`
          }
        });
        /* console.log(response.type);
        console.log(response.status);
        console.log(await response.text()); */
        const fetchedUser = await response.json();
        setUser(fetchedUser);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>Logged-in User Information</h2>
          <p>First Name: {user.f_name}</p>
          <p>Last Name: {user.l_name}</p>
          <p>Description: {user.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default withAuth(Profile);