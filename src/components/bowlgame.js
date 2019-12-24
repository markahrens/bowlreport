import React from 'react'
import moment from 'moment'

const BowlGame = ({ game }) => {
    return <div className="game">
        <div className="scores">
            <div>
              <span className="team">{game.team1} <span className="rank">{game.team1_rank}</span> </span>
              <span className="score">{game.team1_score}</span>
            </div>
            <div>
              <span className="team">{game.team2} <span className="rank">{game.team2_rank}</span> </span>
              <span className="score">{game.team2_score}</span>
            </div>
          </div>
          <div className="details">
            <div className="date">{moment(game.date).format('MMMM D, YYYY')}</div>
            <div className="attendance">{game.attendance}</div>
            <div className="sponsor">{game.sponsor}</div>
          </div>
    </div>
          
}

BowlGame.defaultProps = {
    game: {},
}

export default BowlGame