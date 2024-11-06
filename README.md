# About 

City of Restaurants is a platform that brings together multiple restaurants in one place, offering users the ability to log in, explore a variety of restaurants, view high-quality images of dishes, and easily navigate restaurant locations. The platform offers categorized menus, making it simple to filter restaurants by type, such as fast food or vegan options. Users can also track the status of their orders, from preparation to delivery, and choose their preferred payment method, either cash on delivery or card payment. With detailed restaurant profiles, including images, location, and menu information, City of Restaurants provides a seamless and enjoyable experience for discovering and ordering from local restaurants.


## Features

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

 * TypeScript: For better type safety and a more structured, scalable codebase.
 * Express.js.
 * Helmet: Security middleware for securing HTTP headers.
 * Morgan: HTTP request logger for API requests.
 * DB ( MongoDB ).
 * ORM Mongoose.
 * uuid
 * User Authentication: JWT-based authentication.
 * Authorization: Role-based access control for both users and admins.
 * File Upload: Using Multer.
 * bcrypt.
 * API Validation: Using Joi for validating API inputs.
 * dotenv.
 * Cors: Enabled for secure handling of API requests.


## Collections

The project uses several collections to store data related to users, restaurants, orders, and other essential information. Below are the key collections used in the City of Restaurants platform:

- **Users**: Stores user details such as name, email, password, role (client, admin, vendor, driver), and order history.
- **Restaurants**: Contains information about each restaurant, including the name, description, images, menu items, location, and operational hours.
- **Orders**: Tracks customer orders, including the ordered food items, quantities, total price, payment method, and order status.
- **Food Items**: Stores information about individual food items, including their names, descriptions, prices, and categories (e.g., fast food, vegan).
- **Reviews**: Allows users to rate and review restaurants and food items.
- **Categories**: Stores food categories such as "Fast Food," "Vegan," "Desserts," etc., for easy filtering and browsing.
- **Shipping**: Includes information about the shipping address, including city, street, and phone number for order delivery.

These collections allow for efficient and organized data management across the platform, providing users with a seamless experience when interacting with the City of Restaurants.


## API Endpoints
### Authentication

- **POST /signUp**: Registers a new user. Ensures the email is unique and the data is validated using `addUserSchema`.
- **POST /signIn**: Authenticates a user with email and password. Returns a JWT token for further use.
- **PATCH /**: Updates the user's password after validating the old password. Requires email and new password in the request body.


### User Management

- **GET /:id**: Fetches user profile by user ID. Requires authentication.
- **PUT /**: Updates the user's profile. Accessible only to users with the role `client`.
- **DELETE /:id**: Deletes a user account by user ID. Accessible only to users with the role `admin`.
- **GET /**: Retrieves a list of all users. Accessible only to users with the role `admin`.


### Restaurant Management

- **POST /**: Creates a new restaurant. Requires authentication with `admin` role, and uploads files for the restaurant's logo and images.
- **GET /**: Retrieves all restaurants.
- **GET /one**: Fetches a single restaurant by name or ID. Requires authentication.
- **PUT /:id**: Updates restaurant information by ID. Accessible to users with `vendor` or `admin` role.
- **DELETE /:id**: Deletes a restaurant by ID. Accessible only to users with `admin` role.


### Category Management

- **POST /**: Creates a new category. Requires authentication with `admin` role and validation of category details.
- **GET /**: Retrieves all categories.
- **GET /one**: Fetches a single category by name or ID.
- **PUT /:id**: Updates a category by ID. Accessible to users with `admin` role.
- **DELETE /:id**: Deletes a category by ID. Accessible to users with `admin` role.

### Food Management

- **POST /**: Adds a new food item. Requires authentication with `admin` or `vendor` role, and allows file uploads for food images.
- **GET /**: Retrieves all food items.
- **GET /one**: Fetches a single food item by name or ID.
- **GET /:restaurantId**: Fetches food items by restaurant ID.
- **PUT /:id**: Updates a food item by ID. Accessible to users with `admin` or `vendor` role.
- **DELETE /:id**: Deletes a food item by ID. Accessible to users with `admin` or `vendor` role.


### Order Management

- **POST /**: Creates a new order. Accessible to users with `client` role and validates order details.
- **GET /**: Retrieves all orders. Accessible to users with `admin` or `vendor` roles.
- **PATCH /:id**: Changes the status of an order by its ID. Accessible to users with `admin` or `vendor` roles.
- **DELETE /:id**: Deletes an order by ID. Accessible to users with `admin` or `vendor` roles.



## Key Takeaways from this Project

City of Restaurants is a platform that brings together multiple restaurants, allowing users to explore, order food, and track their orders. It offers secure user authentication, multi-role management (client, admin, vendor, driver), and detailed restaurant profiles with images and categorized menus. Users can choose payment methods, track orders in real-time, and manage their profiles. The platform ensures secure data handling and validation, leveraging technologies like TypeScript, JWT, and MongoDB for a seamless experience.


## Project Inspiration

The idea for City of Restaurants stemmed from the need to simplify the process of discovering, ordering, and managing food from multiple restaurants in one place. With the growing demand for online food ordering, the goal was to create a platform that not only offers convenience and ease of use but also provides users with the ability to explore various cuisines, view detailed restaurant information, and track their orders in real-time. The project was inspired by the desire to improve the user experience and streamline restaurant services, bringing together restaurants, customers, and delivery services under one roof.




