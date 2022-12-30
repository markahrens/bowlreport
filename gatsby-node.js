/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const _ = require(`lodash`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type == 'BowlsJson' || node.internal.type == 'ActiveJson' || node.internal.type == 'RetiredJson') {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions
	const bowlTemplate = path.resolve("src/templates/bowl.js")
  const retiredBowlTemplate = path.resolve("src/templates/retiredbowl.js")
  const seasonTemplate = path.resolve("src/templates/season.js")

  return graphql(`
    {
      allBowlsJson {
        edges {
          node {
            fields {
              slug
            }
            seasons {
              year
            }
          }
        }
      },
      allRetiredJson {
        edges {
          node {
            fields {
              slug
            }
            seasons {
              year
            }
          }
        }
      }
    }
  `).then(result => {

		const bowls = result.data.allBowlsJson.edges

    bowls.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: bowlTemplate,
        context: {
          slug: node.fields.slug,
        },
      })
		})

    const retiredbowls = result.data.allRetiredJson.edges

    retiredbowls.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: retiredBowlTemplate,
        context: {
          slug: node.fields.slug,
        },
      })
		})
		
    let seasons = []
    _.each(bowls, edge => {
				_.each(edge.node.seasons, season => {
					seasons = seasons.concat(season.year)
				});
    })
		seasons = _.uniq(seasons)
		
		seasons.forEach(season => {
      createPage({
        path: `/seasons/${season}/`,
        component: seasonTemplate,
        context: {
          season,
        },
      })
		})
		
		createPage({
			path: `/`,
			component: seasonTemplate,
			context: {
				season:2022,
			},
    })
  
  })
}
