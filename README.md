# HabiTrack

The Habit Tracker web app is an intuitive and interactive tool designed to help users build and maintain positive habits by tracking their daily activities, monitoring progress, and staying motivated through personalized habit recommendations and visual progress indicators.
It is responsive and compatible with different device size as well as interative for enhancing the user interface.

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Styling: Bootstrap / custom
- Authentication and Authorization: JWT
- AI recommendations: Python

## Key Features
### Adding Habits
- Users can add habits and give their descriptions
- Allows users to chose tags and status of their habits
### Viewing Habits
- Allows users to keep track of their habits.
- Enables modifications to habits.
- Allows users to changes status by editing the habits as well as delete habits.
### Suggestions
- Implemented a simple AI based recommendation system to suggest potential habits to users.
- Suggestions are based on the tags that the user have used for their previous habits such as health, productivity, learning and fitness.
- Based on these tags, it accesses the habit_data recommendation file and return the habits to users
### Track Progress
- Allows users to keep track of their process using a progress bar.
- Displays how many habits have the user declared completed.

## Setup and Installation
1. Clone the repositiotry
   - git clone 
 2. open the termianl and first set up backend
    - cd HabiTrack/backend    
    - npm i                        
    - nodemon index.js
3. Now add/open another terminal to run client
- cd HabiTrack/frontend
- npm i
- npm start
- 
## Demo Video

https://drive.google.com/file/d/1Ehs73yUOG04J_QbIng-BF488Q7wHmU0a/view?usp=sharing

