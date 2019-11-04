# Untitled Interview Project

This was a two part interview project where I was given 24 hours to complete each (48 hours for 2 projects).
Per their request, all references to their company and API have been removed from the code.

# Running the program

The two projects are completely unrelated to each other so I'm keeping them separated. In order to
hide the API for the frontend, I added a route to the backend server that serves the API for the
frontend. Locally the backend runs on port 3001 and the frontend on port 3000. If you go into the
root directory of `/backend`, you can use the command `npm run start:all` to concurrently run the
backend and frontend projects.

# Frontend requirements

- Retrieve data from their provided API
- Display data and style according to a provided image
- Add a 'filter by name' search bar on top
- Give each student card an expandability feature
- Within the expanded section provide additional details
- Also within the expanded section provide an area to read and write custom tags
- Add a 'search by tag' feature

# Backend requirements

- Given an API endpoint, build your own API that queries results based on tags
- The given endpoint supports a single tag search while yours should support multiple tag requests
- Concurrently request data from their API
- Create support for sorting according to different parameters and in asc/desc order
- Thoroughly test
- (Bonus) build a caching system
