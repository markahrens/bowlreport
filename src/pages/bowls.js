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
      <div>{edges
      .map( edge => 
        <div><Link to={edge.node.fields.slug}>{edge.node.name}</Link></div>
        )}
      </div>
    </Layout>
}
    
  
  
  export default BowlsPage
  

export const query = graphql`
query BowlsList {
	allBowlsJson{
    edges{
      node{
        name
        fields{
            slug
        }
      }
    }
  }
}
`