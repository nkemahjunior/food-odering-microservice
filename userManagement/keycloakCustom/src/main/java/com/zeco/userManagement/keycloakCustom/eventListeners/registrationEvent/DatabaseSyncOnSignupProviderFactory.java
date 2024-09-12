package com.zeco.userManagement.keycloakCustom.eventListeners.registrationEvent;

import org.keycloak.Config;
import org.keycloak.events.EventListenerProvider;
import org.keycloak.events.EventListenerProviderFactory;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.KeycloakSessionFactory;

public class DatabaseSyncOnSignupProviderFactory implements EventListenerProviderFactory {

    //name which will appear on keycloak realm
    private static final String PROVIDER_ID = "app-database-sync";


    @Override
    public EventListenerProvider create(KeycloakSession keycloakSession) {

        return new DatabaseSyncOnSignupProvider(keycloakSession);
    }

    @Override
    public void init(Config.Scope scope) {

    }

    @Override
    public void postInit(KeycloakSessionFactory keycloakSessionFactory) {

    }

    @Override
    public void close() {

    }

    @Override
    public String getId() {
        return PROVIDER_ID;
    }
}
