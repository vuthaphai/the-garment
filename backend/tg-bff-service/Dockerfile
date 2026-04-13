FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY target/tg-bff-service-*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=${SPRING_PROFILES_ACTIVE:prod}", "app.jar"]
