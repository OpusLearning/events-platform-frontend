# Events Platform Front End

## Overview

This repository contains the front end for the **Events Platform** project. Built with Vite and React, the application enables community members to view events, sign up for them, and add events to their Google Calendar. Staff members (admins) can log in to create, edit, and delete events.

The front end integrates with the backend API endpoints deployed at `https://eventsplatform.online` for:
- Event management (`/api/events`)
- User authentication (`/api/auth`)
- Google Calendar integration (`/api/calendar`)


## Technologies & Tools

- **React** – The JavaScript library used to build the user interface.
- **Vite** – A fast development and build tool.
- **Axios** – For making HTTP requests to the backend API.
- **React Router** – For client-side routing.
- **React DatePicker** – Provides a user-friendly date picker for event forms.
- **Bootstrap (or custom CSS)** – For styling and responsiveness.
- **JWT** – For handling user authentication.

---

## Integration with Backend

The front end communicates with the following backend endpoints (assumed deployed at `https://eventsplatform.online`):

- **Authentication:**
  - `POST /api/auth/signup` – Register a new user (or admin, if flagged).
  - `POST /api/auth/login` – Log in a user and obtain a JWT token.
  - `GET /api/auth/health` – Health check for the authentication API.

- **Event Management:**
  - `GET /api/events` – Retrieve a list of events.
  - `POST /api/events` – Create a new event (admin only).
  - `PUT /api/events/:id` – Edit an event (admin only).
  - `DELETE /api/events/:id` – Delete an event (admin only).
  - `POST /api/events/signup` – Allow users to sign up for an event.

- **Google Calendar Integration:**
  - `GET /api/calendar/auth` – Initiates Google OAuth for calendar integration.
  - `GET /api/calendar/callback` – Handles the Google OAuth callback.
  - Additional endpoints for adding, updating, and deleting events on Google Calendar.

---

## Running the Project Locally

1. **Clone the Repository:**

   ```bash
   git clone git@github.com:OpusLearning/events-platform-frontend.git
   cd events-platform-frontend
Install Dependencies:

bash
Copy
npm install
Start the Development Server:

bash
Copy
npm run dev
Your app should now be accessible at http://localhost:5173.

Build for Production:

bash
Copy
npm run build
The production-ready bundle is generated in the dist folder.

2. **Usage**
Home Page: Displays a list of upcoming events fetched from /api/events. Each event is rendered via the EventCard component, which shows the event image (or a placeholder if none is provided), title, date, and location. Users can sign up for events or add them to Google Calendar.

Login/Register: Users can create accounts or log in. The Register page includes an option to sign up as an admin if needed.

Admin Dashboard: Accessible only to admins (validated via JWT). This page lets admins create new events (using a form with a date picker for selecting the event date), edit existing events, and delete events.

Calendar Success: After successfully connecting to Google Calendar via OAuth, users are redirected here with a confirmation message.

My Events: Regular users can view a list of events they have signed up for.

Error Handling & Feedback:
The UI displays appropriate messages for successful actions and errors (e.g., "Please log in as admin" when trying to perform admin actions with a non-admin account).

3. **How It Meets the Project Brief**
Responsive & Accessible Design:
The UI is built to be responsive across various screen sizes, with clear error messaging and loading states. 

4. **Integration with Backend:**
The front end fetches data from backend endpoints, supports user authentication (registration and login), and integrates with Google Calendar via the provided OAuth endpoints.

MVP Requirements:

Display a list of events: Home page shows events from the backend.
Allow users to sign up for an event: Users can sign up for events via the EventCard actions.
Allow users to add events to their Google Calendar: Redirects users through Google OAuth flow.
Enable staff members to create and manage events: Admin Dashboard allows event creation, editing (with a date picker), and deletion.
Hosting:
The project is designed to be deployed on a free hosting platform (such as GitHub Pages or another free web hosting service). 
The README includes instructions for running locally and building for production.

Optional Extensions
Image Upload:
In future iterations, implement file uploads (e.g., using Multer) to allow admins to upload images directly instead of providing a URL.

Enhanced Authentication:
Consider integrating social logins or multi-factor authentication.

Payment Integration & Confirmation Emails:
Add additional functionality such as payment processing (e.g., via Stripe) and automatic confirmation emails for event sign-ups.

Social Sharing:
Enable users to share events on social media.

Cross-Platform Development:
Extend the project to a mobile app using React Native and ExpoDev if desired.

Test Credentials
Admin Account:
Use the credentials provided by the backend test script (or create an admin account via the registration page with the admin option enabled).

User Account:
Use any valid email/password combination from the registration page.

Additional Notes
Deployment:
Ensure that the backend is accessible at https://eventsplatform.online and that the API endpoints in the front end match the backend routes.

Configuration:
Update environment variables, endpoints, and other configuration settings as needed for production.

Feedback:
The application provides user-friendly messages for successful actions and error states (e.g., login errors, registration errors, and failed API calls).
