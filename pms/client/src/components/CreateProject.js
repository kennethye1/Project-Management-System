import React, { useState, useContext } from "react";
import ProjectAPI from "../api/ProjectAPI";
import { ProjectContext } from "../context/ProjectContext";

const CreateProject = () => {
  const { createProject } = useContext(ProjectContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await ProjectAPI.post("/", {
        name,
        description,
      });
      createProject(response.data.data.project);
      console.log(response);
    } catch (error) {
      console.error(error, error.stack);
    }
  };
  return (
    <div className="m-5">
      <form action="">
        <div className="form-row align-items-center justify-content-center">
          <div className="col-sm-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="form-control"
              required="required"
            />
          </div>
          <div className="col-sm-6">
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Description"
              className="form-control"
            />
          </div>
          <button
            onClick={handleCreate}
            type="submit"
            className="btn btn-primary ml-2"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
