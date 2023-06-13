import './index.css'

const AppointmentItem = props => {
  const {appointmentsList, onChangeStarStatus} = props
  const {titleInput, dateInput, isStarred, id} = appointmentsList
  const changeStar = () => {
    onChangeStarStatus(id)
  }

  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li>
      <div className="title-star-container">
        <p className="title">{titleInput}</p>
        <button
          type="button"
          className="star-button"
          onClick={changeStar}
          data-testid="star"
        >
          <img src={starImage} alt="star" />
        </button>
      </div>
      <p className="date">Date: {dateInput}</p>
    </li>
  )
}
export default AppointmentItem
