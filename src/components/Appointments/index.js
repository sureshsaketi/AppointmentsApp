import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isStarredBtnClicked: false,
    date: '',
  }

  addAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const newAppointment = {
      id: uuidv4(),
      titleInput,
      dateInput,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
      date: '',
    }))
  }

  onToggleStar = appointmentId => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === appointmentId) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onTitleChange = event => {
    this.setState({titleInput: event.target.value})
  }

  onDateChange = event => {
    const date = event.target.value
    this.setState({
      dateInput: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      date,
    })
  }

  filterStarredAppointments = () => {
    const {isStarredBtnClicked} = this.state
    if (isStarredBtnClicked) {
      return this.setState({isStarredBtnClicked: false})
    }
    return this.setState({isStarredBtnClicked: true})
  }

  render() {
    const {titleInput, appointmentsList, isStarredBtnClicked, date} = this.state
    const appList = isStarredBtnClicked
      ? appointmentsList.filter(
          eachAppointment => eachAppointment.isStarred === true,
        )
      : appointmentsList

    const btnClassName = isStarredBtnClicked ? 'button-starred' : ''
    return (
      <>
        <div className="app-container">
          <div className="appointment-container">
            <div className="appointment-image-cont">
              <div className="add-appointment-container">
                <h1 className="appointment-heading">Add Appointment</h1>
                <form onSubmit={this.addAppointment}>
                  <div>
                    <label htmlFor="title" className="label">
                      TITLE
                    </label>
                    <br />
                    <input
                      id="title"
                      value={titleInput}
                      placeholder="Title"
                      className="input"
                      onChange={this.onTitleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="label">
                      DATE
                    </label>
                    <br />
                    <input
                      type="date"
                      id="date"
                      value={date}
                      placeholder="dd/mm/yyyy"
                      className="input"
                      onChange={this.onDateChange}
                    />
                  </div>
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </form>
              </div>
              <div className="appointments-img-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                  alt="appointments"
                  className="appointment-image"
                />
              </div>
            </div>
            <hr className="horizontal-line" />
            <div className="appointments-container">
              <h1 className="appointment-heading">Appointments</h1>
              <button
                type="button"
                className={`starred-button ${btnClassName}`}
                onClick={this.filterStarredAppointments}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {appList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentsList={eachAppointment}
                  onChangeStarStatus={this.onToggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Appointments
