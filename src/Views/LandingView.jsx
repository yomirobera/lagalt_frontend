import Filtering from "../components/Filter/Filtering"
import LandingPage from "../components/LandingPage/LandingPage"
import ProjectList from "../components/projectList/ProjectList"

const LandingView = () => {
    return (
        <>
            <h2>Welcome</h2>  
            <Filtering/>
            <ProjectList/>
            
        </>
        
    )
        
}

export default LandingView