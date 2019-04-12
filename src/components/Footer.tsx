import React from 'react'
import { Link } from 'gatsby'

import Copyright from './Copyright'
const facebook = require('../img/social/facebook.svg')
const twitter = require('../img/social/twitter.svg')
const github = require("../img/github-icon.svg")
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
