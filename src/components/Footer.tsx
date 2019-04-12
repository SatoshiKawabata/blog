import React from 'react'
import { Link } from 'gatsby'

import Copyright from './Copyright'
import facebook from '../img/social/facebook.svg'
import twitter from '../img/social/twitter.svg'
import github from "../img/github-icon.svg"
import useSiteMetadata from './SiteMetadata'

const Footer = () => {
  const { copyright, sns } = useSiteMetadata();
  return (
    <footer className="footer has-background-black has-text-white-ter">
      <div className="has-text-centered has-background-black has-text-white-ter social">
        <a
          href={sns.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={github}
            alt="Github"
            style={{ width: '1em', height: '1em' }}
            />
        </a>
        <a title="twitter" href={sns.twitter}>
          <img
            className="fas fa-lg"
            src={twitter}
            alt="Twitter"
            style={{ width: '1em', height: '1em' }}
          />
        </a>
        <a title="facebook" href={sns.facebook}>
          <img
            className="fas fa-lg"
            src={facebook}
            alt="Facebook"
            style={{ width: '1em', height: '1em' }}
          />
        </a>
      </div>
      <div
        className="content has-text-centered"
        style={{ paddingBottom: "24px" }}
      >
        <Copyright name={copyright.name} startYear={copyright.startYear} />
      </div>
    </footer>
  )
}

export default Footer
