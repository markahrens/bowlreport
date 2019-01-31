import React from 'react'
import { Link,graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import moment from 'moment'

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
      <h2 className="bowl-name"><Link to={bowl.slug} >{bowl.name}</Link></h2>
        <div >
          <div className="scores">
            <div>
              <span className="team">{bowl.season.team1} <span className="rank">{bowl.season.team1_rank}</span> </span>
              <span className="score">{bowl.season.team1_score}</span>
            </div>
            <div>
              <span className="team">{bowl.season.team2} <span className="rank">{bowl.season.team2_rank}</span> </span>
              <span className="score">{bowl.season.team2_score}</span>
            </div>
          </div>
          <div className="details">
            <div className="date">{moment(bowl.season.date).format('MMMM D, YYYY')}</div>
            <div className="attendance">{bowl.season.attendance}</div>
            <div className="sponsor">{bowl.season.sponsor}</div>
          </div>
        </div>
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