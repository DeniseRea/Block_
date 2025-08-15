package org.espe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "*") // Permitir CORS para el frontend React
public class BlockchainApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(BlockchainApplication.class, args);
        System.out.println("Servidor blockchain iniciado en puerto 8080");
    }
}
