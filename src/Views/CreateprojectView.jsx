import { Card } from "antd";
import React from "react";
import AddProject from "../components/createProject/CreateProject";

const LandingView = () => {
    return (
        <Card title="Add Project">
            <h2>Add / Start new project</h2>  
            <AddProject/>
            
        </Card>
        
    );
        
};

export default LandingView;