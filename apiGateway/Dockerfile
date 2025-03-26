FROM eclipse-temurin:21-jdk-ubi9-minimal as builder

WORKDIR /app

# Copy parent POM, maven wrapper
COPY pom.xml /app/
COPY .mvn /app/.mvn
COPY mvnw /app/

# Copy child  POM, maven wrapper, and source code
COPY apiGateway/pom.xml /app/apiGateway/
COPY apiGateway/mvnw /app/apiGateway/
COPY apiGateway/.mvn /app/apiGateway/.mvn/
COPY apiGateway/src /app/apiGateway/src


#install parent pom (skip modules)
RUN ./mvnw install -N

# package application to jar
WORKDIR /app/apiGateway
RUN ./mvnw  package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21.0.4_7-jre-ubi9-minimal

# Create directory for the application
RUN mkdir -p /opt/zeco-eats-apiGateway-service

# Set the working directory
WORKDIR /opt/zeco-eats-apiGateway-service

# Copy the JAR from the builder stage
COPY --from=builder /app/apiGateway/target/*.jar zeco-eats-apiGateway-service.jar

# Expose the application port
EXPOSE 8084

# Define environment variables as placeholders
ENV SPRING_PROFILES_ACTIVE=prod
ENV CONFIG_SERVER=


# Run the application
ENTRYPOINT ["java", "-jar", "zeco-eats-apiGateway-service.jar"]
#ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]

#sudo docker build -t zeco-eats-api-gateway:1.0 -f apiGateway/Dockerfile .