
---

## Admin Routes

- **/admin/signup**: Signup route for organizers using name, email, and password.
- **/admin/signin**: Signin route for organizers using email and password.

## Events Routes

- **/event/**: Get information about all events.
- **/event/myevents**: Get information about registered events.

## Ticket Routes

- **/ticket/bookticket**: Book tickets with username, event id, and ticket type.
- **/ticket/cancelticket**: Cancel tickets using user id and event id.

## Event Creation Route

- **/admin/createevent**: Event creation route (requires token with admin email).

### Required Attributes

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
