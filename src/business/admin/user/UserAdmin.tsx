import React from 'react';
import Style from "./UserAdmin.module.css";

function UserAdmin() {
  return (
    <div className={Style.Main}>
      <header className={Style.Header}>
      
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={Style.Link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default UserAdmin;
