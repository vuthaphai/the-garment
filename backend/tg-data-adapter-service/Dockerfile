FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY target/tg-data-adapter-service-*.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=${SPRING_PROFILES_ACTIVE:prod}", "app.jar"]
