package org.espe;


import java.util.Date;
//cambios todo privado
public class Bloque {
    private int id;
    private int nonce;
    private long timeStamp;
    private String hash;    // sha256("hola espe")=fghss3343433dfgdfbvcvb
    private String hashPrevio; //
    private String contenido;
    private String contenidoJson ;


    public Bloque(int id, String contenido, String hashPrevio ){
        this.id=id;
        this.contenido=contenido;
        this.hashPrevio= hashPrevio;
        this.timeStamp= new Date().getTime();
        //this.nonce= 1;
        //this.hash=hash;
        generateHash();
    }
    public  void generateHash(){
        String datosAHash="{id:"+Integer.toString(id)+",hashPrevio:"+hashPrevio+"," +
          "timeStamp:"+Long.toString(timeStamp)+",contenido:"+contenido.toString()+
          ",nonce:"+Integer.toString(nonce)+"}";
        String valorHash=SHA256H.generateHash(datosAHash);
        //System.out.println("xtmp:"+datosAHash);
        this.contenidoJson=datosAHash;
        this.hash=valorHash;
    }
    public void incrementaNonce(){
        this.nonce++;
    }

    @Override
    public String toString() {
        return "Bloque{" +
                "id:" + id +
                ", nonce:" + nonce +
                ", timeStamp:" + timeStamp +
                ", hash:'" + hash + '\'' +
                ", hashPrevio:'" + hashPrevio + '\'' +
                ", contenido:'" + contenido + '\'' +
                '}';
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int getNonce() {
        return nonce;
    }
    public void setNonce(int nonce) {
        this.nonce = nonce;
    }
    public long getTimeStamp() {
        return timeStamp;
    }
    public void setTimeStamp(long timeStamp) {
        this.timeStamp = timeStamp;
    }
    public String getHash() {
        return hash;
    }
    public void setHash(String hash) {
        this.hash = hash;
    }
    public String getHashPrevio() {
        return hashPrevio;
    }
    public void setHashPrevio(String hashPrevio) {
        this.hashPrevio = hashPrevio;
    }
    public String getContenido() {
        return contenido;
    }
    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public String getContenidoJson() {
        return contenidoJson;
    }

    public void setContenidoJson(String contenidoJson) {
        this.contenidoJson = contenidoJson;
    }
}
