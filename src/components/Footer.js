import React from 'react'
import { Link } from 'gatsby'

import logo from '../img/logo.svg'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import vimeo from '../img/social/vimeo.svg'
import github from "../img/github-icon.svg";

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="has-text-centered has-background-black has-text-white-ter social">
          <a
            href="https://github.com/SatoshiKawabata/blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={github}
              alt="Github"
              style={{ width: '1em', height: '1em' }}
              />
          </a>
          <a title="twitter" href="https://twitter.com">
            <img
              className="fas fa-lg"
              src={twitter}
              alt="Twitter"
              style={{ width: '1em', height: '1em' }}
            />
          </a>.
        </div>
        <div
          className="content has-text-centered"
          style={{ paddingBottom: "24px" }}
        >
          ©kwst all right reserves
        </div>
      </footer>
    )
  }
}

export default Footer
