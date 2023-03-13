const apiUrl = "http://localhost:8080/api/v1/project"

export const getProjects = async () => {
    try{
        const response = await fetch(`${apiUrl}/projects`);
        if(!response.ok){
            throw new Error("No projects found");
        }
        const data = await response.json();
        return [null,data]

    }catch(error){
        return[error.message, []];
    }
}