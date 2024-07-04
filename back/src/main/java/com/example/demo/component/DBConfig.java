package com.example.demo.component;

import com.microsoft.sqlserver.jdbc.SQLServerDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jdbc.repository.config.AbstractJdbcConfiguration;
//import com.microsoft.sqlserver.jdbc.SQLServerDataSource;

import javax.sql.DataSource;

//@Configuration
//public class DBConfig extends AbstractJdbcConfiguration {
////    public String conURL = "jdbc:sqlserver://LAPTOP-PU5RB4U9;"
////            + "databaseName=PhotoStudio;"
////            + "encrypt=true;"
////            + "trustServerCertificate=true;"
////            + "loginTimeout=5;";
//public String conURL = "jdbc:postgresql://LAPTOP-PU5RB4U9;"
//            + "databaseName=PhotoStudio;"
//            + "encrypt=true;"
//            + "trustServerCertificate=true;"
//            + "loginTimeout=5;";
//
//    @Bean
//    DataSource ds() {
//        SQLServerDataSource ds = new SQLServerDataSource();
//        ds.setURL(conURL);
//        ds.setUser("TestLogin");
//        ds.setPassword("qwerty");
//        return ds;
//    }
//}
