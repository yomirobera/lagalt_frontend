import keycloak from "../components/keycloak/keycloak";

const apiUrl = "http://localhost:8080/api/v1/users";

export const getUser = async (userId, accessToken) => {
  try {
    const response = await fetch(`${apiUrl}/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const user = await response.json();
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const addUsers = async () => {
  
  console.log("WAY1")

  console.log("WAY")
  try {
    console.log("REGISTER")
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      
        id: keycloak.tokenParsed.sub,
        f_name: keycloak.f_name,
        l_name: keycloak.l_name
      }),
    });
    console.log(response.text())
    //const data = await response.json();
    console.log("WORKS")
    //return data;
  } catch (error) {
    console.log(error)
    console.log("FAIL")
    alert("YIKES")
    throw new Error(`Error adding project: ${error.message}`);
  }
};

export {addUsers, apiUrl}