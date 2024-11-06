# About 

City of Restaurants is a platform that brings together multiple restaurants in one place, offering users the ability to log in, explore a variety of restaurants, view high-quality images of dishes, and easily navigate restaurant locations. The platform offers categorized menus, making it simple to filter restaurants by type, such as fast food or vegan options. Users can also track the status of their orders, from preparation to delivery, and choose their preferred payment method, either cash on delivery or card payment. With detailed restaurant profiles, including images, location, and menu information, City of Restaurants provides a seamless and enjoyable experience for discovering and ordering from local restaurants.


## Features

<h2>Features</h2>
<ul>
  <li><strong>User Authentication</strong>: Secure sign-in and sign-up processes with encrypted passwords to ensure user data safety.</li>
  <li><strong>Restaurant Profiles</strong>: Detailed profiles for each restaurant, including images, menus, location, and operating hours.</li>
  <li><strong>Food Categories</strong>: Categorized food menus to easily filter and explore options like fast food, vegan, or desserts.</li>
  <li><strong>Order Tracking</strong>: Real-time order tracking, allowing users to monitor the status of their orders from preparation to delivery.</li>
  <li><strong>Multiple Payment Methods</strong>: Users can select between cash on delivery or card payment for their orders.</li>
  <li><strong>Image Gallery for Dishes</strong>: High-quality images of food items to help users make informed decisions when ordering.</li>
  <li><strong>Restaurant Location</strong>: Integrated maps to help users easily find the location of restaurants.</li>
  <li><strong>Search and Filters</strong>: Advanced search and filter options to quickly find restaurants by cuisine, type, or rating.</li>
  <li><strong>Order History</strong>: Users can view their past orders, reorder items, and track previous delivery status.</li>
  <li><strong>Favorites System</strong>: Users can add their favorite restaurants and dishes to easily access them in the future.</li>
  <li><strong>Ratings and Reviews</strong>: Customers can rate and leave reviews for restaurants and dishes to help others make better decisions.</li>
  <li><strong>User Profile</strong>: Users can create and manage their profiles, including preferences and past order history.</li>
  <li><strong>Admin Panel</strong>: An admin dashboard to manage restaurants, menu items, and user orders, with analytics on orders and ratings.</li>
  <li><strong>Real-Time Notifications</strong>: Instant notifications to alert users about order status updates, special offers, or new restaurant listings.</li>
  <li><strong>Responsive Design</strong>: A fully responsive platform, ensuring users have a seamless experience across all devices (desktop, tablet, mobile).</li>
  <li><strong>Data Validation</strong>: Joi validation for ensuring accurate and valid user inputs, including restaurant details and orders.</li>
  <li><strong>Secure Data Storage</strong>: Sensitive user data and orders are securely stored and protected using best practices in data security.</li>
  <li><strong>User Roles</strong>: Includes <strong>Client</strong>, <strong>Admin</strong>, <strong>Vendor</strong>, and <strong>Driver</strong> user types, each with tailored permissions for their respective actions.</li>
</ul>


 
## Using  

 * JavaScript.
 * Express.js.
 * Helmet: Security middleware for securing HTTP headers.
 * Morgan: HTTP request logger for API requests.
 * DB ( MongoDB ).
 * ORM Mongoose.
 * User Authentication: JWT-based authentication.
 * Authorization: Role-based access control for both users and admins.
 * File Upload: Using Multer.
 * bcrypt.
 * API Validation: Using Joi for validating API inputs.
 * dotenv.
 * Cors: Enabled for secure handling of API requests.

## Collections

* Users: Stores user information, including profiles, followers, and following relationships.
* Posts: Contains shared content with descriptions, media, and associations to users.
* Comments: Holds user comments on posts, linked to both the user and the post.
* Auth: Manages user authentication, including registration and password management.
* Shares: Tracks shared posts, allowing users to share content from others.

## API Endpoints
### Auth APIs : 

1. `POST /auth/signUp`: Register a new user. This route includes middleware to check for email duplication and validate the input based on the provided schema.
2. `POST /auth/signIn` : Authenticate a user and log them in.
3. `PATCH /auth` : Change the authenticated user's password.

### User APIs

1. `PUT /users`: Update the authenticated user's details. This route requires user authentication.
2. `DELETE /users/:id`: Delete a user by their ID. This route requires admin authorization.
3. `GET /users/:id`: Retrieve a user by their ID. This route requires user authentication.
4. `GET /users`: Retrieve all users. This route requires admin authorization.
5. `PUT /users/:id/follow`: Follow a user by their ID. This route requires user authentication.
6. `PUT /users/:id/unFollow`: Unfollow a user by their ID. This route requires user authentication.

### Post APIs

1. `POST /posts`: Create a new post. This route requires user authentication and allows uploading media files.
2. `PUT /posts/:id`: Update an existing post by its ID. This route requires user authentication and allows uploading media files.
3. `GET /posts`: Retrieve all posts.
4. `GET /posts/:id`: Retrieve a specific post by its ID, including associated comments.
5. `DELETE /posts/:id`: Delete a post by its ID. This route requires user authentication.
6. `PUT /posts/:id/like`: Like a post by its ID. This route requires user authentication.
7. `PUT /posts/:id/unlike`: Unlike a post by its ID. This route requires user authentication.
8. `GET /posts/:id/likes`: Retrieve all likes for a specific post by its ID.
9. `GET /posts/timeline/all`: Retrieve posts from users that the authenticated user follows. This route requires user authentication.

### Comment APIs

1. `POST /comments`: Create a new comment. This route requires user authentication and validates the input based on the provided schema.
2. `GET /comments/:id`: Retrieve all comments for a specific post by its ID.
3. `PATCH /comments/:id`: Update an existing comment by its ID. This route requires user authentication, and users can only modify their own comments.
4. `DELETE /comments/:id`: Delete a comment by its ID. This route requires user authentication, and users can only delete their own comments.


### Share APIS

1. `POST /share`: Share a post. This route requires user authentication to ensure that only authenticated users can share posts.


## Deployment

* MongoDB Atlas: Use MongoDB Atlas for a managed cloud database.
* Vercel: Deploy the application on Vercel for easy hosting and management.

## Key Takeaways from this Project

This project emphasizes user-centric design, ensuring a seamless experience for following, commenting, and sharing posts. It incorporates robust security measures with authentication and authorization, allowing users to access and modify only their content. Built with Node.js and MongoDB, the application is scalable and efficient, supporting media uploads through Multer for enhanced user engagement. The real-time updates on likes and comments improve interaction, while comprehensive input validation and error handling maintain data integrity. The modular structure simplifies maintenance and testing, showcasing best practices in modern web development.

## Project Inspiration

This project was inspired by the need for a platform that fosters community engagement and interaction in a digital space. Observing the success of existing social media platforms, I aimed to create a simplified yet effective solution that allows users to share their thoughts, connect with others, and express themselves through multimedia content. The desire to enhance user experience through real-time interactions and secure data handling further motivated the development of this social media app. The goal was to build a user-friendly environment that encourages authentic communication while prioritizing privacy and security.



