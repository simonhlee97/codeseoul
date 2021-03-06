import React from "react";
import CreateEventFormWrapper from "../../../styles/pages/EventsPage/createEventFormWrapper";
import PropTypes from 'prop-types';

const CreateEventForm = props => {
  const { onChangeHandler, createEvent, event, closeForm } = props;
  const { EventDescription, CreateEventButton } = CreateEventFormWrapper;
  const { name, description, directions, startTime, endTime } = event;
  return (
    <CreateEventFormWrapper id="create-event-form">
      <button onClick={closeForm}>X</button>
      <form>
        <input
          name="name"
          id="form-event-name"
          type="text"
          onChange={e => onChangeHandler(e)}
          placeholder="Event Name"
          value={name}
        />
        <EventDescription
          name="description"
          id="form-event-description"
          placeholder="Event Description"
          onChange={e => onChangeHandler(e)}
          value={description}
        />
        <input
          name="directions"
          id="form-event-directions"
          type="text"
          onChange={e => onChangeHandler(e)}
          placeholder="Directions"
          value={directions}
        />
        <div>
          <label htmlFor="venueId">
            Location:
            <select
              name="venueId"
              id="form-event-venue"
              onChange={e => onChangeHandler(e)}
            >
              <option value="25507426">WCoding</option>
              <option value="24727562">Seoul Global Center</option>
            </select>
          </label>
          <label htmlFor="date">
            Date:
            <input
              type="date"
              id="form-event-date"
              name="date"
              onChange={e => onChangeHandler(e)}
            />
          </label>
          <label htmlFor="startTime">
            Event Start Time:
            <input
              type="time"
              id="form-event-start-time"
              name="startTime"
              min="00:00"
              max="24:00"
              onChange={e => onChangeHandler(e)}
              value={startTime}
            />
          </label>
          <label htmlFor="endTime">
            Event End Time:
            <input
              type="time"
              id="form-event-end-time"
              name="endTime"
              min="00:00"
              max="24:00"
              onChange={e => onChangeHandler(e)}
              value={endTime}
            />
          </label>
        </div>
        <CreateEventButton onClick={createEvent}>
          Create Event
        </CreateEventButton>
      </form>
    </CreateEventFormWrapper>
  );
};

CreateEventForm.propTypes = {
  onChangeHandler : PropTypes.func.isRequired,
  createEvent : PropTypes.func.isRequired,
  event : PropTypes.shape({
    name : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    directions : PropTypes.string.isRequired,
    startTime : PropTypes.number.isRequired,
    endTime : PropTypes.number.isRequired
  })
}

export default CreateEventForm;
