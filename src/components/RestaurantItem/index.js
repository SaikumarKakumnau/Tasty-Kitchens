import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import KitchenContext from '../../context/KitchenContext'
import './index.css'

const RestaurantItem = props => {
  const {restaurantDetails} = props
  const {id, imgUrl, name, cuisine, userRating} = restaurantDetails
  const {rating, reviews} = userRating

  return (
    <KitchenContext.Consumer>
      {value => {
        const {activeTheme} = value
        const itemHeading = activeTheme === 'light' ? ' #183b56' : '#f1f1f1'
        const itemPara = activeTheme === 'light' ? '#64748b' : '#94a3b8'

        return (
          <Link to={`/restaurant/${id}`} className="restaurant-links">
            <li className="restaurant-list-item" testid="restaurant-item">
              <img src={imgUrl} alt="restaurant" className="restaurant-img" />
              <div className="restaurant-list-details">
                <h1
                  className="restaurant-heading"
                  style={{color: `${itemHeading}`}}
                >
                  {name}
                </h1>
                <p
                  className="restaurant-cuisine"
                  style={{color: `${itemPara}`}}
                >
                  {cuisine}
                </p>
                <div className="rating-container">
                  <AiFillStar color="#FFCC00" />
                  <p className="rating" style={{color: `${itemPara}`}}>
                    {rating}
                  </p>
                  <p className="reviews">({reviews} ratings)</p>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </KitchenContext.Consumer>
  )
}

export default RestaurantItem
