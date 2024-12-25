# ZecoEats 🍕 🍔 🍜 🍣 🥗 🥘 🚴 📦

zeco-eats is a food delivery application where users can browse different dishes from different restaurants, make orders and receive their food at their desired location. Also restaurant owners can manage their restaurants by uploading dishes, creating offers, ads and also viewing their performance metrics through the zeco-eats manager dashboard

## Features

- **Account Management**: Create an account as a restaurant, delivery driver, or regular user.
- **Restaurant Features**: Restaurants can upload and manage their dishes.
- **User Features**: Users can browse available dishes, place orders, and track delivery progress.
- **Real-Time Communication**: WebSocket integration for live updates and tracking of the delivery driver's location.

- **Efficient Delivery Allocation**:
    - **Redis Pub/Sub**: Publishes driver location to service instances.
    - **PostGIS Integration**: Identifies the closest delivery driver to the user for faster delivery.
    - **Quartz Scheduler**: Checks when an order is ready and assigns it to the best delivery driver.
- **Asynchronous Communication**: Kafka is used for smooth communication between microservices.

## Technologies Used

- **Redis**: For caching and real-time communication.
- **Kafka**: For asynchronous messaging between services.
- **PostGIS**: To perform geospatial calculations for driver assignments.
- **Quartz Scheduler**: To automate order assignment .
- **Postgres**: database.

