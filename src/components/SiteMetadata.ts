import { graphql, useStaticQuery } from 'gatsby'

interface SiteMetaData {
  title: string
  description: string
  copyright: {
    name: string
    startYear: number
  }
  sns: {
    facebook: string
    twitter: string
    github: string
  }
}

const useSiteMetadata = (): SiteMetaData => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
            copyright {
              name
              startYear
            }
            sns {
              facebook
              twitter
              github
            }
          }
        }
      }
    `
  )
  return site.siteMetadata
}

export default useSiteMetadata
