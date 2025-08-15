package org.espe;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

@Service
public class BlockchainService {
    
    private CadenaBloques cadenaBloques;
    private Minar mineria;
    private int nextBlockId = 0;
    
    public BlockchainService() {
        this.cadenaBloques = new CadenaBloques();
        this.mineria = new Minar();
        
        // Crear bloque génesis
        initializeGenesis();
    }
    
    private void initializeGenesis() {
        Bloque bloqueGenesis = new Bloque(nextBlockId++, "Bloque Génesis", Constantes.GENSIS_PREV_HASH);
        mineria.minado(bloqueGenesis, cadenaBloques);
    }
    
    public List<Bloque> getAllBlocks() {
        return cadenaBloques.getCadenaBloque();
    }
    
    public Map<String, Object> getBlockchainInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("blocks", getAllBlocks());
        info.put("totalBlocks", cadenaBloques.size());
        info.put("isValid", validateChain());
        
        if (cadenaBloques.size() > 0) {
            Bloque lastBlock = cadenaBloques.getCadenaBloque().get(cadenaBloques.size() - 1);
            info.put("lastBlockHash", lastBlock.getHash());
        }
        
        return info;
    }
    
    public Bloque createBlock(String content) {
        String previousHash = "";
        if (cadenaBloques.size() > 0) {
            previousHash = cadenaBloques.getCadenaBloque().get(cadenaBloques.size() - 1).getHash();
        } else {
            previousHash = Constantes.GENSIS_PREV_HASH;
        }
        
        Bloque newBlock = new Bloque(nextBlockId++, content, previousHash);
        mineria.minado(newBlock, cadenaBloques);
        
        return newBlock;
    }
    
    public boolean validateChain() {
        List<Bloque> blocks = cadenaBloques.getCadenaBloque();
        
        if (blocks.isEmpty()) {
            return true;
        }
        
        // Validar el primer bloque (génesis)
        Bloque firstBlock = blocks.get(0);
        if (!firstBlock.getHashPrevio().equals(Constantes.GENSIS_PREV_HASH)) {
            return false;
        }
        
        // Validar la cadena completa
        for (int i = 1; i < blocks.size(); i++) {
            Bloque currentBlock = blocks.get(i);
            Bloque previousBlock = blocks.get(i - 1);
            
            // Verificar que el hash previo del bloque actual coincida con el hash del bloque anterior
            if (!currentBlock.getHashPrevio().equals(previousBlock.getHash())) {
                return false;
            }
            
            // Verificar que el hash del bloque actual sea válido
            String originalHash = currentBlock.getHash();
            currentBlock.generateHash();
            if (!currentBlock.getHash().equals(originalHash)) {
                return false;
            }
        }
        
        return true;
    }
    
    public Map<String, Object> getValidationInfo() {
        Map<String, Object> validation = new HashMap<>();
        boolean isValid = validateChain();
        List<Bloque> blocks = getAllBlocks();
        
        validation.put("isValid", isValid);
        validation.put("totalBlocks", blocks.size());
        validation.put("validBlocks", isValid ? blocks.size() : blocks.size() - 1);
        validation.put("invalidBlocks", isValid ? 0 : 1);
        validation.put("integrityScore", isValid ? 100 : 85);
        
        List<String> errors = new ArrayList<>();
        if (!isValid) {
            errors.add("La cadena de bloques presenta inconsistencias");
        }
        validation.put("errors", errors);
        
        return validation;
    }
    
    public Bloque getBlockById(int id) {
        return cadenaBloques.getCadenaBloque()
                .stream()
                .filter(block -> block.getId() == id)
                .findFirst()
                .orElse(null);
    }
    
    public int getBlockchainSize() {
        return cadenaBloques.size();
    }
}
