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
  let confstats = []

  edges.forEach(function(b) {
    bowls.push({
      'id':b.node.id,
      'name':b.node.name,
      'slug':b.node.fields.slug,
      'season': b.node.seasons.filter( season => season.year === pageContext.season)[0]
    })    
  });

  const BowlGames = bowls
  .sort(function(a, b) { return new Date(a.season.date) - new Date(b.season.date);})
  .map(bowl => 
    <div className="season" key={bowl.id}>
      <h2 className="bowl-name"><Link to={bowl.slug} >{bowl.season.name}</Link></h2>
      <BowlGame game={bowl.season} />
    </div>
  )

  bowls.forEach(function(b) {
    if(!confstats.find( ({ conf }) => conf === b.season.team1_conf )){
      confstats.push({
        conf: b.season.team1_conf,
        wins: 0,
        losses: 0,
        ties: 0
      })
    }
    if(!confstats.find( ({ conf }) => conf === b.season.team2_conf )){
      confstats.push({
        conf: b.season.team2_conf,
        wins: 0,
        losses: 0,
        ties: 0
      })
    }

    const team1 = confstats.find( ({ conf }) => conf === b.season.team1_conf )
    const team2 = confstats.find( ({ conf }) => conf === b.season.team2_conf )
    
    if(Number(b.season.team1_score) > Number(b.season.team2_score)){
      team1.wins++
      team2.losses++
    }
    else if(Number(b.season.team1_score) < Number(b.season.team2_score)){
      team1.losses++
      team2.wins++
    }
    else if(Number(b.season.team1_score) === Number(b.season.team2_score)){
      team1.ties++
      team2.ties++
    }
  })



  const ConfRecord = confstats
  .sort((a, b) => a.conf.localeCompare(b.conf) )
  .map( 
    conf => <tr>
      <td>{conf.conf}</td>
      <td>{conf.wins}</td>
      <td>{conf.losses}</td>
      <td>{conf.ties}</td>
      <td>{(Number(conf.wins)*100/(Number(conf.wins) + Number(conf.losses))).toFixed(1)}%</td>
    </tr>
  )

  return <Layout>
    <SEO title= {pageContext.season + ' Season'}/>
    <h1>{pageContext.season} Season</h1>
    <h2>Conference Records</h2>
    <table className="conference-records">
      <thead><tr><th>Conference</th><th>Wins</th><th>Loses</th><th>Ties</th><th>Percentage</th></tr></thead>
      <tbody>{ ConfRecord }</tbody>
    </table>
    <h2>Game Results</h2>
    <div className="bowls">{ BowlGames }</div>
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