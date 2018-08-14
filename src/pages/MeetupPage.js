import React from 'react';
import { ShowingEventsContainer, Events } from '../styles/ShowingEvents';
import MeetupFormContainer from '../components/containers/MeetupFormContainer';

class MeetupPage extends React.Component {
  state = {
    events: []
  };

  componentDidMount() {
    fetch('https://api.meetup.com/Learn-Teach-Code-Seoul/events')
      .then(res => res.json())
      .then(events => {
        this.setState({
          events: events
        });
      });
  }

  render() {
    const events = this.state.events.map(event => {
      return event.status === 'upcoming' ? (
        <Events key={event.id}>
          <div>{event.group.name}</div>
          <div>
            {event.name}
            <br />
            {event.local_date} {event.local_time}
          </div>
        </Events>
      ) : null;
    });

    return (
      <React.Fragment>
        <header>Meetup page</header>
        <MeetupFormContainer />
        <section>Create an event</section>

        {/* Showing current events */}
        <section>
          <div>Current events</div>
          <ShowingEventsContainer>{events}</ShowingEventsContainer>
        </section>
      </React.Fragment>
    );
  }
}

export default MeetupPage;
