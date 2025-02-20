import { useState, useEffect } from "react";

const loadComponent = async (name) => {
  try {
    const component = await import(`./${name}`);
    return component.default;
  } catch (error) {
    console.error("Error loading component:", error);
    return () => <></>; // Return an empty fallback component
  }
};

const DynamicCard = ({ templateName, ...props }) => {
  const [Component, setComponent] = useState(() => () => <></>); // Default empty component

  useEffect(() => {
    loadComponent(templateName).then((LoadedComponent) => {
      setComponent(() => LoadedComponent);
    });
  }, [templateName]); // Reload component if templateName changes

  return <Component {...props} />;
};

export default DynamicCard;
