import { Card } from "antd";
import React from "react";
import AddProject from "../components/createProject/CreateProject";
import YourProjects from "../components/editProject/YourProjects";

const LandingView = () => {
    return (
        <Card title="Add Project">
            <AddProject/>
        </Card>
        
    );
        
};

export default LandingView;