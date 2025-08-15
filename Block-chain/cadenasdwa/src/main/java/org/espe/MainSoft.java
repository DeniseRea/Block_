package org.espe;


public class MainSoft {
    public static void main(String[] args) {
        CadenaBloques cadenaBloques= new CadenaBloques();
        Minar mineria= new Minar();
        System.out.println("inicio");
        //genesis
        Bloque bloque0 = new Bloque(0,"genesis", Constantes.GENSIS_PREV_HASH);
        mineria.minado(bloque0,cadenaBloques);
        Bloque bloque1 = new Bloque(2,"Hola espe",
                cadenaBloques.getCadenaBloque().get(cadenaBloques.size()-1).getHash() );
        mineria.minado(bloque1,cadenaBloques);

        for(Bloque b:cadenaBloques.getCadenaBloque()){
            System.out.println("HashActual:"+b.getHash());
            System.out.println("cadena:"+b.getContenidoJson());
            System.out.println("hashPrevio:"+b.getHashPrevio());
        }


    }
}
