
FROM eclipse-temurin:21-jdk-ubi9-minimal as builder

WORKDIR /app

# Copy parent POM, maven wrapper
COPY pom.xml /app/
COPY .mvn /app/.mvn
COPY mvnw /app/

# Copy child  POM, maven wrapper, and source code
COPY restaurants/pom.xml /app/restaurants/
COPY restaurants/mvnw /app/restaurants/
COPY restaurants/.mvn /app/restaurants/.mvn/
COPY restaurants/src /app/restaurants/src


#install parent pom (skip modules)
RUN ./mvnw install -N

# package application to jar
WORKDIR /app/restaurants
RUN ./mvnw  package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21.0.4_7-jre-ubi9-minimal

# Create directory for the application
RUN mkdir -p /opt/zeco-eats-restaurants-service

# Set the working directory
WORKDIR /opt/zeco-eats-restaurants-service

# Copy the JAR from the builder stage
COPY --from=builder /app/restaurants/target/*.jar zeco-eats-restaurants-service.jar

# Expose the application port
EXPOSE 8081

# Define environment variables as placeholders
ENV SPRING_PROFILES_ACTIVE=prod
ENV CONFIG_SERVER=


# Run the application
ENTRYPOINT ["java", "-jar", "zeco-eats-restaurants-service.jar"]
#ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]

#sudo docker build -t zeco-eats-config-server:1.0 -f restaurants/Dockerfile .