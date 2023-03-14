const API_URL = "https://jsonplaceholder.typicode.com/posts";

const getProjects = async () => {

    try {
      const response = await fetch("API_URL");
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching projects: ${error.message}`);
    }
  };

  
  const addProject = async (newProject) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error adding project: ${error.message}`);
    }
  };
    
  export { getProjects, addProject, API_URL };