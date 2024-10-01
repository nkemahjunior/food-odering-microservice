package com.zeco.zecoEats.deliveries;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

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
