const SKILL_API_URL = "http://localhost:8080/api/v1/skill";

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

  export { createSkill, SKILL_API_URL };