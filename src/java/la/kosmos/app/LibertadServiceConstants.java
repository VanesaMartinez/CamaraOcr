/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package la.kosmos.app;
import la.kosmos.app.api.IServiceConstants;
/**
 *
 * @author hp
 */
public abstract class LibertadServiceConstants implements IServiceConstants{
 public static String INSTITUCION = "libertad";
    
    public String getInstitucion() {
        return INSTITUCION;
    }

    public abstract String getKey();

    public String datos(String ServiceConstants) {

        return ServiceConstants;

    }
}
