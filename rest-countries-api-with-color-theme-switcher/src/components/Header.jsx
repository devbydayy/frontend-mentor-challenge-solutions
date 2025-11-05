import React from "react";

export default function Header({ theme, setTheme }) {
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <h1 className="logo">Where in the world?</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          <i className="fa-regular fa-moon"></i>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </header>
  );
}
