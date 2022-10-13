import React from "react";
import ToggleThemeContainer from "../toggleThemeBtns";

const Footer = () => {
  return (
    <footer className="h-10 flex justify-between px-2 container mx-auto">
      <div className="text-light">
        @ 2019-Present,{" "}
        <a
          href="https://gauzy.co"
          target="_blank"
          className="text-primary"
          rel="noreferrer"
        >
          Gauzy
        </a>{" "}
        by{" "}
        <a
          href="https://ever.co"
          target="_blank"
          className="text-primary"
          rel="noreferrer"
        >
          Ever Co. LTD.
        </a>{" "}
        All rights reserved.
      </div>
      <div className="flex">
        <div className="flex space-x-2 px-4">
          <ToggleThemeContainer />
        </div>
        <div className="flex space-x-4">
          <a
            href="https://demo.gauzy.co/#/pages/legal/terms"
            target="_blank"
            className="text-primary"
            rel="noreferrer"
          >
            Terms Of Service
          </a>
          <a
            href="https://demo.gauzy.co/#/pages/legal/privacy"
            target="_blank"
            className="text-primary"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
