# Self evaluation: 
Your project README should have a self-evaluation of your approach and results, what you learned, and what you would like to do differently or improve upon. Explain what worked well and what didn't. The expectation is that this will not be a brief statement.

For picking my problem, I looked for possible things an HOA would need, and noticed a bunch of emails around dog waste, I decided that would be a good place to start.

I tried to get the routes working first, then I secured them using auth from previous lessons. I then made DAOs for each CRUD route and provided information the routes could use. 

I tried tests, they timeout. They are the slowest tests ever. I think if I could do things over, I would use mocks instead of an in memory database since jest.fn is fast. The test passing are in a screenshot Screen Shot 2024-06-01 at 2.22.10 PM.png 

Routes worked well putting in specifically what I was doing rather than a prefix (/ticket/:id rather that/:id) it was clearer and easier to read

I would like to figure out where to send the env file. I put it in with the public code to let the tests/everything run, which I'm told you should never do, but because this is a proof of concept , and not a production code, I did that since I wanted some way for you to run. I looked up with some googling and found some ways to store with things like Vault and Infisical, I may try one of those in the future for secrets handling. 

All in all, it was a good project, I think I can continue it and make it something my HOA can use with a front end, a login, and points on a map. 
---
Update and delete on ticket are left I need to be completed i have the activity CRUD working.
I have a database connection working and DAOS for Auth activity and ticket.
I still need to do test coverage.


--- 

Your Final Project proposal is due. You should submit a link to a GitHub project that will house your submission. The project README should contain your project proposal. Your proposal should include:




1. A description of the scenario your project is operating in.
Everyday dog owners clean up after their pets. Some don't. 
Home owner associations want to keep public areas clean.

1. A description of what problem your project seeks to solve.
 Provide a clean up service locations and status for dog waste. 

1. A description of what the technical components of your project will be, including: the routes, the data models, any external data sources you'll use, etc.
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

Todo: 
- move private key in services/token to environment .env file
- move post /token/:id/activity to admin only or initial user.
- move get /token to read all if admin, or just user submitted data if user
- move POST /activity/:tokenId to admin only
- move DELETE /activity/:activityId to admin.
- 