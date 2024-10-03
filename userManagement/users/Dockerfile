
FROM eclipse-temurin:21-jdk-ubi9-minimal as builder

WORKDIR /app


# Copy parent POM
COPY pom.xml /app/
COPY .mvn /app/.mvn
COPY mvnw /app/

#Copy second parent pom
COPY userManagement/pom.xml /app/userManagement/

# Copy child( users module)  POM, maven wrapper, and source code
COPY userManagement/users/pom.xml /app/userManagement/users/
COPY userManagement/users/mvnw /app/userManagement/users/
COPY userManagement/users/.mvn /app/userManagement/users/.mvn/
COPY userManagement/users/src /app/userManagement/users/src

#install parent pom (skip modules)
RUN ./mvnw install -N

# package application to jar
WORKDIR /app/userManagement/users
RUN ./mvnw   package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21.0.4_7-jre-ubi9-minimal

# Create directory for the application
RUN mkdir -p /opt/users-service

# Set the working directory
WORKDIR /opt/users-service

# Copy the JAR from the builder stage
COPY --from=builder /app/userManagement/users/target/*.jar zeco-eats-users-service.jar

# Expose the application port
EXPOSE 8082

# Define environment variables as placeholders
ENV SPRING_PROFILES_ACTIVE=prod
ENV CONFIG_SERVER=


# Run the application
ENTRYPOINT ["java", "-jar", "zeco-eats-users-service.jar"]

# sudo docker build -t zeco-eats-users-service:1.0 -f userManagement/users/Dockerfile .