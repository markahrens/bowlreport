import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { Link,graphql } from 'gatsby'


const BowlsPage = ({ data }) => {
    const activeBowls = data.allBowlsJson.edges;
    const retiredBowls = data.allRetiredJson.edges;
  
    return <Layout>
      <Seo title="Bowls" />
      <h1>Bowls</h1>
      <h2>Active</h2>
      <ul className="listing">{activeBowls
      .map( edge => 
        <li key={edge.node.id} >
          <Link to={edge.node.fields.slug}>{edge.node.name}</Link>
        </li>
        )}
      </ul>
      <h2>Retired</h2>
      <ul className="listing">{retiredBowls
      .map( edge => 
        <li key={edge.node.id} >
          <Link to={edge.node.fields.slug}>{edge.node.name}</Link>
        </li>
        )}
      </ul>
    </Layout>
}
    
  
  
  export default BowlsPage
  

export const query = graphql`
query BowlsList {
  allBowlsJson(sort: {name: ASC}) {
    edges {
      node {
        name
        id
        fields {
          slug
        }
      }
    }
  },
  allRetiredJson(sort: {name: ASC}) {
    edges {
      node {
        name
        id
        fields {
          slug
        }
      }
    }
  }
}
`