import React from "react";
import {Link} from "react-router-dom";

function Footer() {
  return (
    <div className="h-footer bg-primary-100 text-white p-8 xl:px-0">
      <div className="flex max-w-7xl mx-auto">
        <div className="flex-1">
          <span className="font-bold">Navigation</span>
          <ul className="list-disc mt-2">
            <li>
              <Link to="/">Main page</Link>
            </li>
            <li>
              <Link to="/products">Products Checker</Link>
            </li>
            <li>
              <Link to="/search">Search changes Checker</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
