import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <h1>About Bowl Report</h1>
    <p>Bowl games are unique tradition in all sports. Bowls give teams something to play for even after national and league championships are no longer an option. They also allow fans one last time to see some players wear their team's uniforms.</p>
    <p>While you can find information about bowl results on sites like ESPN or Wikipedia, no site had the general statistics in a way that I wanted to see. I decided to wrangle up the data I was interested in, then collect it on a relatively simple site.</p>
    <p>This site uses a static site generator called <a href="https://www.gatsbyjs.com">Gatsby</a> to create the pages and make things speedy. All of the data for the site can be found at <a href="https://github.com/markahrens/bowlreport">https://github.com/markahrens/bowlreport</a>. If you find something wrong or want to help, feel free to let me know there.</p>
  </Layout>
)

export default AboutPage