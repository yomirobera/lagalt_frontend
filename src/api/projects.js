const API_URL = "http://localhost:8080/api/v1/project";

const getProjects = async () => {

    try {
      const response = await fetch(API_URL);
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
        body: JSON.stringify({
          ...newProject,
          img_url: newProject.img_url, // update the img_url field
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error adding project: ${error.message}`);
    }
  };

  const updateProject = async (projectId, updatedProject) => {
    try {
      const response = await fetch(`${API_URL}/${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error updating project: ${error.message}`);
    }
  };
  
  export { getProjects, addProject, updateProject, API_URL };