import { createSkill } from "./skill";

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
      for await (const skill of newProject.skillsRequired) {
        await createSkill(skill);
      }
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newProject,
        }),
      });

      return response;
    } catch (error) {
      throw new Error(`Error adding project: ${error.message}`);
    }
  };
  
  const updateProject = async (projectId, updatedProject) => {
    console.log("a");
    console.log(updatedProject)
    try {
      for await (const skill of updatedProject.skillsRequired) {
        await createSkill(skill);
      }
      console.log("b");
      const response = await fetch(`${API_URL}/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      });
      //const data = await response.json();
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(`Error updating project: ${error.message}`);
    }
  };

  export { getProjects, addProject, updateProject, API_URL };