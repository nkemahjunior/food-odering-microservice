
FROM eclipse-temurin:21-jdk-ubi9-minimal as builder

WORKDIR /app

# Copy parent POM and mvn wrapper
COPY pom.xml /app/
COPY .mvn /app/.mvn
COPY mvnw /app/

# Copy child  POM, maven wrapper, and source code
COPY configServer/pom.xml /app/configServer/
COPY configServer/mvnw /app/configServer/
COPY configServer/.mvn /app/configServer/.mvn/
COPY configServer/src /app/configServer/src

#install parent pom (skip modules)
RUN ./mvnw install -N

# package application to jar
WORKDIR /app/configServer
RUN ./mvnw  package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21.0.4_7-jre-ubi9-minimal

# Create directory for the application
RUN mkdir -p /opt/zeco-eats-config-server

# Set the working directory
WORKDIR /opt/zeco-eats-config-server

# Copy the JAR from the builder stage
COPY --from=builder /app/configServer/target/*.jar zeco-eats-config-server.jar

# Expose the application port
EXPOSE 8888

# Define environment variables as placeholders
ENV SPRING_PROFILES_ACTIVE=prod
ENV PRIVATE_KEY_PATH=
ENV KNOWN_HOSTS_FILE_PATH=

# Run the application
ENTRYPOINT ["java", "-jar", "zeco-eats-config-server.jar"]
#ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]

#sudo docker build -t zeco-eats-config-server:1.0 -f configServer/Dockerfile .