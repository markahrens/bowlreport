import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from '../components/seo'
import moment from 'moment'

export default ({ data }) => {
    const bowl = data.allBowlsJson.edges[0].node
  return (
    <Layout>
        <SEO title={bowl.name} />
        <h1>{bowl.name}</h1>
        <div className="bowls">{bowl.seasons
        .sort(function(a, b) { return b.year - a.year;})
        .map( season => 
            <div className="season">
              <div className="scores">
                <div>
                  <span className="team">{season.winner} <span className="rank">{season.winner_rank}</span> </span>
                  <span className="score">{season.winner_score}</span>
                </div>
                <div>
                  <span className="team">{season.loser} <span className="rank">{season.loser_rank}</span> </span>
                  <span className="score">{season.loser_score}</span>
                </div>
              </div>
              <div className="details">
                <div className="date">{moment(season.date).format('MMMM D, YYYY')}</div>
                <div className="attendance">{season.attendance}</div>
                <div className="sponsor">{season.sponsor}</div>
              </div>
            </div>
            )}
        </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    allBowlsJson(
        filter: {
            fields: { slug: { eq: $slug } }
        }
      ) {
        edges{
            node{
              name
              seasons{
                year
                sponsor
                date
                attendance
                winner 
                winner_score
                winner_conf
                winner_rank
                loser
                loser_score
                loser_conf
                loser_rank
              }
            }
        }
    }
}
`
