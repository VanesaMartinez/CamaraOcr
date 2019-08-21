/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package la.kosmos.app;

/**
 *
 * @author hp
 */
public class Clasificador {
     private final static  String Key = "3d4191c0a6bdc8ffd586e8ece5543d40";
    private final static String Institucion = "libertad";

    String getInstitucion() {
        return Institucion ;
    }

 String getKey() {
        return Key;
    }

   
 interface OCRServiceConstants {
    String getInstitucion();

    String getKey();
    
    
}
 
public String datos(String OCRServiceConstants){
        
    return OCRServiceConstants;

}
    
}
