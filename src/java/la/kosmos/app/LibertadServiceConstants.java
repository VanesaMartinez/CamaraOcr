/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package la.kosmos.app;
import camaraocr.ServiceConstants;
/**
 *
 * @author hp
 */
public abstract class LibertadServiceConstants implements ServiceConstants{
 public static String INSTITUCION = "libertad";
    
 @Override
    public String getInstitucion() {
        return INSTITUCION;
    }

 @Override
    public abstract String getKey();

    public String datos(String ServiceConstants) {

        return ServiceConstants;

    }
}
