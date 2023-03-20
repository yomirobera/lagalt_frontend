import { useEffect, useState, useCallback } from 'react';
import { getUser } from '../../api/user';
import withAuth from '../../hoc/withAuth';
import keycloak from '../keycloak/keycloak';
import { apiUrl } from '../../api/user';



const Profile = () => {
  const [user, setUser] = useState(null);

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
    } catch (error) {
      console.error(error);
      console.log("FAIL")
      // Handle error
    }
  }, [keycloak]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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