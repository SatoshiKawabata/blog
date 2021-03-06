import React from "react";
import { Link } from "gatsby";

const Navbar: React.StatelessComponent<React.Props<{}>> = () => {
  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo">
            <span style={{fontSize: '2rem', fontFamily: 'monaco', fontWeight: 700, color: "rgb(255, 68, 0)"}}>blog.kwst.site</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
