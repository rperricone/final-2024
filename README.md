Your Final Project proposal is due. You should submit a link to a GitHub project that will house your submission. The project README should contain your project proposal. Your proposal should include:

1. A description of the scenario your project is operating in.
Everyday dog owners clean up after their pets. Some don't. 
Home owner associations want to keep public areas clean.

2. A description of what problem your project seeks to solve.
 Provide a clean up service locations and status for dog waste. 

3. A description of what the technical components of your project will be, including: the routes, the data models, any external data sources you'll use, etc.
Routes:
- GET /ticket/:id - gets the ticket with this id 
  - Output contains ticketId,location.lat,location.lon,activity[],description,dateCreated
  - activity[]  will have objects containing status(IN_PROGRESS,COMPLETED,etc),date  
- POST /ticket - will create a ticket. Input contains location.lat,location.lon,description.
- GET /ticket - admin only,views all tickets. 
- PUT /ticket/:id - user that created,admin only,update location or description.
- DELETE /ticket:id - user that created,admin only,delete ticket.
- GET /activity:id - gets the activity associated with the ticket id.
- POST /activity:id - writes status to activity for ticket id.
  
- Login
  - Signup: POST /auth/signup
  - Login:  POST /auth/login

4. Clear and direct call-outs of how you will meet the various project requirements.
 - Routes: Express
 - Database: MongoDB 
 - Code: NodeJS
 - Authentication and Authorization: will use Jose library
 - 2 sets of CRUD routes:/activity /tickets
 - Indexes for performance and uniqueness when reasonable: plan to index id for tickets
 - At least one of text search, aggregations, and lookups: plan to look up tickets by user name
 - Routes should be fully tested (project test coverage > 80%): plan to set up test during first week
 - Plan to use a saved Postman collection


5. A timeline for what project components you plan to complete, week by week, for the remainder of the class.  -  Week of  - 
 -  May 13th - finish out rough draft of login,ticket,activity,tests
 -  Week of May 20th - rough draft test and deploy to actual website
 -  Week of May 27th - polish and complete anything remaining. 
 -  Week of June 3rd - practice presentation. 
