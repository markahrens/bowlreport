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
                  <span className="team">{season.team1} <span className="rank">{season.team1_rank}</span> </span>
                  <span className="score">{season.team1_score}</span>
                </div>
                <div>
                  <span className="team">{season.team2} <span className="rank">{season.team2_rank}</span> </span>
                  <span className="score">{season.team2_score}</span>
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
