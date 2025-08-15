package org.espe;


public class Minar {
    public double recompenza;
    public void minado(Bloque bloque, CadenaBloques cadenaBloques){
        while (buscarCeros(bloque)) {
            bloque.generateHash();  //cambio
            bloque.incrementaNonce();
            //System.out.println("revisar:"+bloque.getHash()+"--"+bloque.getNonce() );
        }
        //System.out.println("termine de minar:"+ bloque.getHash() );
        cadenaBloques.agregarBloque(bloque);
        recompenza+=Constantes.MINAR_RECOMPENZA;  //sumo la recompenza
    }
    public boolean buscarCeros(Bloque bloque){
        String cerosIzq=new String( new char[Constantes.NUMERO_CEROS]).replace('\0','0');
        return !bloque.getHash().substring(0,Constantes.NUMERO_CEROS).equals(cerosIzq);
    }
    public double getRecompenza(){
        return this.recompenza;
    }
}
