
FROM eclipse-temurin:21-jdk-ubi9-minimal as builder

WORKDIR /app

# Copy parent POM
COPY pom.xml /app/
COPY .mvn /app/.mvn
COPY mvnw /app/


# Copy child  POM, maven wrapper, and source code
COPY deliveries/pom.xml /app/deliveries/
COPY deliveries/mvnw /app/deliveries/
COPY deliveries/.mvn /app/deliveries/.mvn/
COPY deliveries/src /app/deliveries/src


#install parent pom (skip modules)
RUN ./mvnw install -N

# package application to jar
WORKDIR /app/deliveries
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21.0.4_7-jre-ubi9-minimal

# Create directory for the application
RUN mkdir -p /opt/zeco-eats-deliveries-service

# Set the working directory
WORKDIR /opt/zeco-eats-deliveries-service

# Copy the JAR from the builder stage
COPY --from=builder /app/deliveries/target/*.jar zeco-eats-deliveries-service.jar

# Expose the application port
EXPOSE 8083

# Define environment variables as placeholders
ENV SPRING_PROFILES_ACTIVE=prod
ENV CONFIG_SERVER=


# Run the application
ENTRYPOINT ["java", "-jar", "zeco-eats-deliveries-service.jar"]
#ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]

#sudo docker build -t zeco-eats-config-server:1.0 -f deliveries/Dockerfile .