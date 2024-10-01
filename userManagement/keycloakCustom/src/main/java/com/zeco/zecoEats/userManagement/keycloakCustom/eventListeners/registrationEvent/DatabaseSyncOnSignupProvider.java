package com.zeco.zecoEats.userManagement.keycloakCustom.eventListeners.registrationEvent;

import org.keycloak.events.Event;
import org.keycloak.events.EventListenerProvider;
import org.keycloak.events.EventType;
import org.keycloak.events.admin.AdminEvent;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.UserModel;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.UUID;

/**
 * Event listener for registrations on keycloak auth server
 * The jar file of this module(keycloakCustom) , alongside postgresql dependencies jar file(downloaded from their site)
 * was created and added to the providers folder of keycloak
 */
public class DatabaseSyncOnSignupProvider implements EventListenerProvider {

    //host.docker.internal because localhost on docker refers to the localhost of docker not my computer, so we use my computer's ip address as the address
    private final String _dbUrl = "jdbc:postgresql://host.docker.internal:5432/zeco_eats_user";
    private final String _dbUser = "put it back if you want to update this file and create a new jar ";
    private final String _dbPassword = " put it back if you want to update this file and create a new jar ";
    private final String _dbSql = "INSERT INTO users (user_id, first_name, last_name, email, phone, online) VALUES (?,?,?,?,?,?)";
    private KeycloakSession keycloakSession;

    public DatabaseSyncOnSignupProvider(KeycloakSession keycloakSession){
        this.keycloakSession = keycloakSession;

        System.out.println("----------------------------------------------------------------------------------------------------------------------");
        System.out.println("----------------------------------------------------------------------------------------------------------------------");
        System.out.println("ZECO_EATS --- DatabaseSyncOnSignupProvider initialised");
        System.out.println("----------------------------------------------------------------------------------------------------------------------");
        System.out.println("----------------------------------------------------------------------------------------------------------------------");
    }


    /**
     *
     *for user events like Register, login
     */
    @Override
    public void onEvent(Event event) {

        //event.getRealmId().equals(_realmId) &&
        if(event.getType().equals(EventType.REGISTER)){
            System.out.println("ZECO_EATS --- Registered event detected, Trying to Add new user");

            // Fetch user details (custom details you added like phone) using KeycloakSession
            String userId = event.getUserId();
            UserModel user = keycloakSession.users().getUserById(keycloakSession.getContext().getRealm(), userId);
            String phone = user.getFirstAttribute("phone");

            //"try with resource" automatically closes the resource( Connection) after executing the try block
            try(Connection conn = dbConnect();
                PreparedStatement pst = conn.prepareStatement(_dbSql)) {


                pst.setObject(1, UUID.fromString(event.getUserId()));
                pst.setString(2, event.getDetails().get("first_name"));
                pst.setString(3, event.getDetails().get("last_name"));
                pst.setString(4, event.getDetails().get("email"));
                pst.setString(5,phone);
                pst.setBoolean(6, true);

                pst.executeUpdate();

                System.out.println("ZECO_EATS --- Added new user");

            }catch (Exception e){
                System.out.println("ZECO_EATS --- Adding new user failed");
                System.out.println("ZECO_EATS ---  " + e.getMessage());

            }
        }

    }


    /**
     *for admin events
     */
    @Override
    public void onEvent(AdminEvent adminEvent, boolean b) {

    }

    @Override
    public void close() {

    }

    private Connection dbConnect(){
        try{
            System.out.println("ZECO_EATS --- Trying to connect to the PostgreSQL server");

            //Class.forName("org.postgresql.Driver");
            Connection con = DriverManager.getConnection(_dbUrl, _dbUser, _dbPassword);

            System.out.println("ZECO_EATS --- Connected to the PostgreSQL server successfully.");
            return con;


        }catch (Exception e) {
            System.out.println("ZECO_EATS --- Connection to the PostgreSQL server failed.");
            System.out.println("ZECO_EATS ---   " + e.getMessage());
        }
        return null;
    }




}
