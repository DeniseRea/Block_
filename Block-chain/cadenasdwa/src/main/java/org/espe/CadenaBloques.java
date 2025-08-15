package org.espe;


import java.util.ArrayList;
import java.util.List;

public class CadenaBloques {
    private List<Bloque> cadenaBloques;
    public CadenaBloques() {
        this.cadenaBloques = new ArrayList<>();
    }
    public void agregarBloque(Bloque bloque  ){
        this.cadenaBloques.add(bloque);
    }
    public List<Bloque>  getCadenaBloque(){
        return this.cadenaBloques;
    }
    public int size(){
        return this.cadenaBloques.size();
    }
   @Override
   public String toString(){
     String cadena="";
     for (Bloque bloque: this.cadenaBloques)
         cadena+=bloque.toString();
     return cadena;
   }
}
