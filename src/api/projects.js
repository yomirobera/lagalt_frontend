const API_URL = "http://localhost:8080/api/v1/project";
const SKILL_API_URL = "http://localhost:8080/api/v1/skill";
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

      return response;
    } catch (error) {
      throw new Error(`Error adding project: ${error.message}`);
    }
  };
  const updateProject = async (projectId, updatedProject) => {
    try {
      for await (const skill of updatedProject.skillsRequired) {
        await createSkill(skill);
      }
      const response = await fetch(`${API_URL}/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      });
      //const data = await response.json();
      return response;
    } catch (error) {
      throw new Error(`Error updating project: ${error.message}`);
    }
  };
  const createSkill = async (skill) => {
    try {
      // Retrieve all skills from the API
      const getResponse = await fetch(SKILL_API_URL);
      const skills = await getResponse.json();
      // Check if the skill already exists in the API
      const existingSkill = skills.find((s) => s.title === skill);
      console.log(existingSkill);
      if (existingSkill) {
        // The skill already exists, so return it
        return existingSkill;
      } else {
        // If the skill doesn't exist, make a POST request to create it
        console.log(skill);
        const postResponse = await fetch(SKILL_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: skill }),
        });
        return postResponse;
      }
    } catch (error) {
      throw new Error(`Error creating skill: ${error.message}`);
    }
  };
  export { getProjects, addProject, updateProject, API_URL };