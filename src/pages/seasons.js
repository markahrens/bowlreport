import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Link,graphql } from 'gatsby'


const SeasonsPage = ({ data: {
    allBowlsJson: { edges },
  } }) => {
    const _ = require(`lodash`)
    let seasons = []
    _.each(edges, edge => {
        _.each(edge.node.seasons, season => {
            seasons = seasons.concat(season.year)
        });
    })
    seasons = _.uniq(seasons)
    return <Layout>
      <SEO title="Seasons" />
      <h1>Seasons</h1>
      <ul className="listing">{seasons
      .sort().reverse()
      .map( season => 
        <li>
          <Link to={'/seasons/'+season}>{season}</Link>
        </li>
        )}
      </ul>
    </Layout>
}
    
  
  
  export default SeasonsPage
  

export const query = graphql`
query SeasonsList {
	allBowlsJson{
    edges{
      node{
        seasons{
          year
        }
      }
    }
  }
}
`