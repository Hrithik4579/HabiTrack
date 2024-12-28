# HabiTrack

The Habit Tracker web app is an intuitive and interactive tool designed to help users build and maintain positive habits by tracking their daily activities, monitoring progress, and staying motivated through personalized habit recommendations and visual progress indicators.

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Styling: Bootstrap / custom
- Authentication and Authorization: JWT
- AI recommendations: Python

## Key Features
### Admin Portal
- User(student) management allowing the admin to edit or delete the students
- Adding and creating student profiles
- Job Posting Management including setting and defining the eligibility criteria for applying
- Generation of excel reports to view applied students
- Alumini blog posting including search feature
- Sets the crednetials for each student
- Delete Job postings
### Students Portal
- Applying for posted jobs with only resume where meeting the eligibilty criteria set by the admin(rest of the deatils will be automatically shared)
- Tracking the status of submitted applications
- Viewing posted blogs(searchable by company)
- Can view test dates as mentioned by the admin
### RBAC Features
- User management which involves creating, modifying and deleting student profiles.
- No student can register themselves. Only the admin has the permission to add students and set their passwords to prevent outside college students from registering themselves.
- Admin has the permission to add and delete companies and roles as well as set the criteria such as cgpa and graduating year for applying. Students not meeting the criteria will not be permitted to apply for that particular job.
- Admin has the permission to delete role profiles as required.
- All the permissions and features are now clearly displayed using icons or titles for the users to easily navigate across the portal.
- Admin can generate excel reports containing all the deatils of the studetns along with their resumes for each company. Multer and Cloudinary for resume storing.
- Integrated real-time mail notifications to keep students updated on any new job postings using nodemailer library.
- If the registration data would cross then, students would not be able to apply for that company.
- Seach functionality for searching blogs related to a particular company.
- Applied applications can be tracked from application status.

## Setup AND Installation
1. Clone the repositiotry
   - git clone https://github.com/Hrithik4579/Placement-Portal
 2. open the termianl and first set up server
    - cd Placement-Portal/server    (to go inside the server forlder)
    - npm i
    - cd src                         (to go inside src where index.js file is present)
    - nodemon index.js
3. Now add/open another terminal to run client
- cd Placement-Portal/client
- npm i
- npm run start
  
## Sample Credentials to test the software
### Admin
- email: admin
- password: admin
### Student
- enroll: 21103222
- password: test123

## Demo Video

https://drive.google.com/file/d/1foJG5S4QD_JDdq0zcaheM56ZNzmzOsSE/view?usp=sharing

