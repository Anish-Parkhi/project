---

## Admin Routes

- **/admin/signup**: Signup route for organizers using name, email, and password.
  
  **Required Attributes:**
  - name
  - email
  - password

- **/admin/signin**: Signin route for organizers using email and password.
  
  **Required Attributes:**
  - email
  - password

## Events Routes

- **/event/**: Get information about all events.
- **/event/myevents**: Get information about registered events.

  **Required Attributes:**
  - userId

## Ticket Routes

- **/ticket/bookticket**: Book tickets with username, event id, and ticket type.
  
  **Required Attributes:**
  - userId
  - eventId
  - ticketType

- **/ticket/cancelticket**: Cancel tickets using user id and event id.
  
  **Required Attributes:**
  - userId
  - ticketId

## Event Creation Route

- **/admin/createevent**: Event creation route (requires token with admin email).

  **Required Attributes:**
  - host_name
  - email
  - contact_number
  - capacity
  - venue_name
  - address
  - event_name
  - event_description
  - event_date
  - category

### Request Body Format

All the required attributes should be included in the request body object.

### Authentication

- **Token**: The token containing the admin email should be included in the headers under the Authorization field.

---

