package com.music.player.musicarchive.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
public class MongoConfig {

    @Bean
    public MongoClient mongoClient() {
        // Connect to MongoDB using connection string or MongoClientSettings
        // Replace with your actual connection details
        ConnectionString connectionString = new ConnectionString("mongodb+srv://Subham:MEsErpk8Q9cUK7Fr@musiccluster.kejfnob.mongodb.net/musicarchive?retryWrites=true&w=majority");
        MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .build();
        return MongoClients.create(mongoClientSettings);
    }
}
