
FROM eclipse-temurin:21-jdk-ubi9-minimal as builder

WORKDIR /app


# Copy parent POM
COPY pom.xml /app/

# Copy child POM, maven wrapper, and source code
COPY restaurants/pom.xml /app/restaurants/
COPY restaurants/mvnw /app/restaurants/
COPY restaurants/.mvn /app/restaurants/.mvn/
COPY restaurants/src /app/restaurants/src

# Download dependencies and build the application
WORKDIR /app/restaurants
RUN ./mvnw  package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21.0.4_7-jre-ubi9-minimal

# Create directory for the application
RUN mkdir -p /opt/restaurant-service

# Set the working directory
WORKDIR /opt/restaurant-service

# Copy the JAR from the builder stage
COPY --from=builder /app/restaurants/target/*.jar zeco-eats-restaurant-service.jar

# Expose the application port
EXPOSE 8888

# Define environment variables as placeholders
ENV SPRING_PROFILES_ACTIVE=prod
ENV PRIVATE_KEY_PATH=
ENV KNOWN_HOSTS_FILE_PATH=

# Run the application
ENTRYPOINT ["java", "-jar", "zeco-eats-users-service.jar"]

# sudo docker build -t zeco-eats-users-service:1.0 -f restaurants/Dockerfile .