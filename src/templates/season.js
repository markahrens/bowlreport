import React from 'react'
import { Link,graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import BowlGame from '../components/bowlgame'

const SeasonPage = ({
  data: {
    allBowlsJson: { edges },
  },
  pageContext
}) => {
  let bowls = []
  edges.forEach(function(b) {
    bowls.push({
      'id':b.node.id,
      'name':b.node.name,
      'slug':b.node.fields.slug,
      'season': b.node.seasons.filter( season => season.year === pageContext.season)[0]
    })    
  });
  const BowlResults = bowls
  .sort(function(a, b) { return new Date(a.season.date) - new Date(b.season.date);})
  .map(bowl => 
    <div className="season" key={bowl.id}>
      <h2 className="bowl-name"><Link to={bowl.slug} >{bowl.season.name}</Link></h2>
      <BowlGame game={bowl.season} />
    </div>
  )

  return <Layout>
    <SEO title= {pageContext.season + ' Season'}/>
    <h1>{pageContext.season} Season</h1>
    <div className="bowls">{ BowlResults }</div>
  </Layout>
}

export default SeasonPage

export const query = graphql`
query SeasonBowlsList($season: Int!) {
	allBowlsJson(
    filter: {
      seasons:{elemMatch:{year:{eq:$season}}}
    }
  ){
    edges{
      node{
        name
        id
        fields{
          slug
        }
        seasons{
          name
          year
          sponsor
          date
          attendance
          team1 
          team1_score
          team1_conf
          team1_rank
          team2
          team2_score
          team2_conf
          team2_rank
        }
      }
    }
  }
}
`