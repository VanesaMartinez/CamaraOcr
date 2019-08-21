package camaraocr

import grails.converters.JSON
import grails.transaction.Transactional
import sun.misc.BASE64Encoder;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner; 
import la.kosmos.app.ClasificadorLibertadServiceConstants
import la.kosmos.app.LibertadServiceConstants;
import la.kosmos.app.OcrLibertadServiceConstants

class CamaraOcrController {
 
   interface ServiceConstants {

    String getInstitucion();

  String getKey();
  
}
     def datos = new ClasificadorLibertadServiceConstants();
     def ocr = new OcrLibertadServiceConstants(); 
     
    def OcrService ;
    def ClasificadorIneService ;
   
    def index() { }
    
    
    def capturaImagen(){
        def urlimagen= params.snap
        String ine = "ine_ife"
        def imagen = ClasificadorIneService.clasificador(urlimagen,datos.getKey(),datos.getInstitucion())
        println"Que trae" + imagen
           if(imagen=='INE/IFE'){    
                def camaraOcr = OcrService.Ocr(urlimagen,ocr.getKey(),ocr.getInstitucion(),ine)   
           if(camaraOcr){
                 def modelo =[:]
                 modelo.texto = camaraOcr               
                render(template:"/templates/camaraOcr/datosOcr", model: modelo  )
                  
              }
              else{
                def respuesta = [:]
                  respuesta.error= "Ocurrio un problema"
                  render respuesta as JSON
              }  
              }
               else{
                    def respuesta = [:]
                 respuesta.error= "Ocurrio un problema"
                  render respuesta as JSON
                    
        println"Otro"
        
        
        }
    
    
    }
}
