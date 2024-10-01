package com.deliveries.fireBaseConfig;


import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class FireBaseConfig {


    @PostConstruct
    public  void initialiseFirebase(){
        try{
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.getApplicationDefault()) //automatically gets the path( from env) to the service-account-file.json
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                log.info("Firebase application initialized");
            }

        }catch (Exception ex){
            log.error("**** error initialising firebase ****");
            log.error(ex.getMessage());

        }
    }
}

