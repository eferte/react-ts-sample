import React, { useEffect } from "react";
import Style from "./Home.module.css";
import { FaBeer } from "react-icons/fa";
import NotificationService from "_common/component/notification/NotificationService";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    NotificationService.info("Welcome");
  }, []);
  const showSuccess = () => {
    NotificationService.success("Success message !");
  };
  const showError = () => {
    NotificationService.error("Error message !");
  };
  return (
    <div className={Style.Main}>
      <section className="section">
        <div className="container">
          <div className="notification center">
              <span className=" center">
                HOME <FaBeer className="desktop-only ml5" />
              </span>
              <Link className="ml10" to="/about">About</Link>
          
              <button className="button ml20" onClick={showSuccess}>
                Show Success
              </button>
              <button className="button ml5" onClick={showError}>
                Show Error
              </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
