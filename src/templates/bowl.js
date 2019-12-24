import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from '../components/seo'
import BowlGame from '../components/bowlgame'

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
              <BowlGame game={season} />
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
