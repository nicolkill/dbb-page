import React from "react";
import {PropTypes} from "prop-types";

function Element({ orientation, iconName, title, subtitle, description }) {
  const isRight = orientation === "right"

  return (
    <div className={"mt-6 sm:mt-0" + (!isRight | " sm:mb-12")}>
      <div className="flex flex-col sm:flex-row items-center">
        <div className={"flex w-full mx-auto items-center " + (isRight ? "justify-start" : "justify-end")}>
          <div className={"w-full sm:w-1/2 " + (isRight ? "sm:pr-8" : "sm:pl-8")}>
            <div className="p-4 bg-white rounded shadow">
              <p className="text-md">{title}</p>
              <p className="text-xs">{subtitle}</p>
              <div className="pt-4 text-xs">
                {description}
              </div>
              <div>

              </div>
            </div>
          </div>
        </div>
        <div
          className="rounded-full bg-blue-500 border-white border-4 w-8 h-8 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">
          <span className="material-icons text-white text-xs">{iconName}</span>
        </div>
      </div>
    </div>
  );
}

Element.propTypes = {
  orientation: PropTypes.oneOf(["left", "right"]),
  iconName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  tags: PropTypes.arrayOf(PropTypes.string),
};

Element.defaultProps = {
  orientation: "left",
};


export default Element;
