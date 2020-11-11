import React from "react";

const Header = ({ setAuth }) => {
  const logout = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div>
      <h1 className="display-1 text-center">Project List</h1>
      <button
        className="btn btn-danger"
        style={{ position: "absolute", right: 0, top: 0 }}
        onClick={(e) => logout(e)}
      >
        Log out
      </button>
    </div>
  );
};

export default Header;
