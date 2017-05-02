package com.clearlink.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

/**
 * Created by jonathon lancaster on 5/1/2017.
 */
@Configuration
public class AppConfig {

    @Bean(name="mySqlDataSource")
    public DriverManagerDataSource dataSource() {
        DriverManagerDataSource driverManagerDataSource = new DriverManagerDataSource();
        driverManagerDataSource.setDriverClassName("com.mysql.jdbc.Driver");
        driverManagerDataSource.setUrl("jdbc:mysql://localhost:3306/ClearlinkJournal?autReconnect=true&useSSL=false");
        driverManagerDataSource.setUsername("dev");
        driverManagerDataSource.setPassword("admin");
        return driverManagerDataSource;
    }
}
