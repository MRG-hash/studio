# **App Name**: HomeGuard Drone

## Core Features:

- User Authentication: Secure user login with email/password and Google OAuth, with role-based access control.
- Drone Status Dashboard: Display real-time drone status including battery, connection, and GPS/Indoor position.  This may also use AI to perform status anomaly detection using available data, but for the MVP this will display static drone attributes.
- Live Camera Feed: Provide a real-time video stream from the drone's camera via RTMP/RTSP URL, initially with a dummy placeholder. Incorporates buttons for capturing photos and recording video clips, stored in Firebase Storage.
- Patrol Route Management: Enable users to create, read, update, and delete patrol routes, each consisting of a name, a series of GPS coordinates, and a creation timestamp, stored in Firestore.
- Automated Patrol: Implement Cloud Functions to start and stop drone patrols based on predefined routes, updating the system status in Firestore.
- Media Library: Display a list of all photos and videos stored in Firebase Storage, with options to view and download.
- Manual Drone Control: Provide an on-screen WASD controller to send control commands to the drone using Cloud Functions.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) to convey trust, security, and stability.
- Background color: Light gray (#F5F5F5), providing a clean, neutral backdrop to ensure content legibility in the light theme; switch to a dark gray (#333333) in dark mode.
- Accent color: Light Blue (#64B5F6) for interactive elements and highlights.
- Body text font: 'Inter', a sans-serif font that will provide a modern and machined look to the overall text.
- Headline font: 'Space Grotesk', a sans-serif font which can be paired with 'Inter', which provides a techy look to the application
- Use a set of consistent, modern icons to represent different drone functions and data points. Icons should be simple and easily recognizable, following Material Design principles.
- Implement a responsive layout that adapts to different screen sizes. The dashboard should have a sidebar navigation and a clean, organized content area.
- Incorporate subtle animations and transitions to enhance the user experience, such as loading indicators and smooth navigation transitions.