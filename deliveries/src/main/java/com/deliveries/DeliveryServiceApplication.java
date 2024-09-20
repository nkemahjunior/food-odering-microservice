package com.deliveries;

import com.deliveries.service.DeliveryDriversService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DeliveryServiceApplication {

/*	@Autowired
	 private  DeliveryDriversService d;*/

	public static void main(String[] args) {
		SpringApplication.run(DeliveryServiceApplication.class, args);
	}


/*
	@Bean
	public CommandLineRunner commandLineRunner() {
		return args -> {
			System.out.println("---------------------------------------------------");



			d.test();
		};
	}
*/

}
