Routes 

**Admin Routes**

```/admin/signup``` : signup route for organizer with help of name, email and password\
```/admin/signin``` : signin route for oraganizer with email and password

**Events Routes**

```/event/``` : Get info of all the events\
```/event/myevents``` : Get info of registered events

**Ticket Routes**

```/ticket/bookticket``` : Book the tickets with username, event id and ticket type\
```/ticket/cancelticket``` : Cancel the ticket with help of user id and event id

**Event Creation Route**
```/admin/createevent``` : Event creation (token with admin email is required)\
  ---
  reuired attributes
  host_name
  email
  contact_number
  capacity
  venue_name
  address
  event_name
  event_description
  event_date
  category
  ---
  All of the above should be in body object
  ---
  token
  ---
  token should be in the headers authoriztion
