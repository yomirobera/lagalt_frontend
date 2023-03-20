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