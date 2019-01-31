import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Link,graphql } from 'gatsby'


const BowlsPage = ({ data: {
    allBowlsJson: { edges },
  } }) => {
    return <Layout>
      <SEO title="Bowls" />
      <h1>Bowls</h1>
      <ul className="listing">{edges
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
	allBowlsJson(sort:{fields:name, order:ASC}){
    edges{
      node{
        name
        id
        fields{
            slug
        }
      }
    }
  }
}
`