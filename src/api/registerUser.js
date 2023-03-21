import keycloak from "../components/keycloak/keycloak";

const apiUrl = "http://localhost:8080/api/v1/users";

export const registerUser = async (userData) => {
  try {
    // Get access token from Keycloak
    await keycloak.updateToken(5);
    const accessToken = keycloak.token;

    // Send user data to API
    const response = await fetch(apiUrl, {
      method: "POST", 
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed to register user. Status code: ${response.status}`);
    }

    const registeredUser = await response.json();
    return registeredUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};
