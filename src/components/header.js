import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({  siteTitle }) => {
  return <div className="header">
    <div className="content">
      <div className="site-title">
        <Link to="/" >{siteTitle}</Link>
      </div>
      <ul className="nav">
        <li><Link to="seasons">Seasons</Link></li>
        <li><Link to="bowls">Bowls</Link></li>
      </ul>
    </div>
  </div>
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header