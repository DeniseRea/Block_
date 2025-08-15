package org.espe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class BlockchainController {
    
    @Autowired
    private BlockchainService blockchainService;
    
    // Obtener toda la blockchain
    @GetMapping("/blockchain")
    public ResponseEntity<Map<String, Object>> getBlockchain() {
        try {
            Map<String, Object> response = blockchainService.getBlockchainInfo();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al obtener blockchain: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }
    
    // Obtener un bloque por ID
    @GetMapping("/blockchain/block/{id}")
    public ResponseEntity<Object> getBlock(@PathVariable int id) {
        try {
            Bloque block = blockchainService.getBlockById(id);
            if (block != null) {
                return ResponseEntity.ok(block);
            } else {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Bloque no encontrado");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al obtener bloque: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }
    
    // Crear un nuevo bloque
    @PostMapping("/blockchain/mine")
    public ResponseEntity<Map<String, Object>> mineBlock(@RequestBody Map<String, String> request) {
        try {
            String content = request.get("data");
            if (content == null || content.trim().isEmpty()) {
                content = "Bloque minado automáticamente";
            }
            
            Bloque newBlock = blockchainService.createBlock(content);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Bloque minado exitosamente");
            response.put("block", newBlock);
            response.put("blockId", newBlock.getId());
            response.put("hash", newBlock.getHash());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", "Error al minar bloque: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }
    
    // Validar la cadena de bloques
    @PostMapping("/blockchain/validate")
    public ResponseEntity<Map<String, Object>> validateBlockchain() {
        try {
            Map<String, Object> validation = blockchainService.getValidationInfo();
            return ResponseEntity.ok(validation);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al validar blockchain: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }
    
    // Endpoint de salud
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("service", "Blockchain API");
        health.put("timestamp", System.currentTimeMillis());
        health.put("blocksCount", blockchainService.getBlockchainSize());
        return ResponseEntity.ok(health);
    }
    
    // Obtener estadísticas generales
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        try {
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalBlocks", blockchainService.getBlockchainSize());
            stats.put("isChainValid", blockchainService.validateChain());
            stats.put("difficulty", 4); // Dificultad fija por ahora
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al obtener estadísticas: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }
}
