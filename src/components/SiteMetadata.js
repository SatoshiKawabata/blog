import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
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
