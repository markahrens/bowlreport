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
      <div>{seasons
      .sort().reverse()
      .map( season => 
        <div><Link to={'/seasons/'+season}>{season}</Link></div>
        )}
      </div>
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