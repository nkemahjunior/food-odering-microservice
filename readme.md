# ZecoEats 🍕 🍔 🍜 🍣 🥗 🥘 🚴 📦

ZecoEats is a food delivery platform where users can browse dishes from various restaurants, place orders, and receive their food at their chosen location.

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

