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
import org.kosmos.ocr.util.KOcrConstants;
import camaraocr.KFileService;
import com.google.gson.Gson
class CamaraOcrController {
 
   interface ServiceConstants {

    String getInstitucion();

  String getKey();
  
}
     def datos = new ClasificadorLibertadServiceConstants();
     def ocr = new OcrLibertadServiceConstants(); 
     
    def OcrService ;
    def ClasificadorIneService ;
    
    /*Mike Martínez */
        def kFileService
        def kosmosOcrService        
    /*Fin Mike Martínez */
    def index() { }
    
    
    /*def capturaImagen(){
        def urlimagen= params.snap
        String ine = "ine_ife"
        println "params.snap ---> " + params.snap
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
        }
    }*/
    
    
    
    
    /*Mike Martínez*/
    

    
    def getClasificationAndDataFile(){
        def urlimagen= params.snap
        Gson gson = new Gson()
        def response = [:]
        if(kFileService == null){println "Error El bean de kFileService"}
        String pathFile = kFileService.saveFile(urlimagen);        
        def responseKOcr = kosmosOcrService.serviceClasificadorDeArchivos(pathFile,KOcrConstants.FILE_KEY, KOcrConstants.FILE_INSTITUCION);
        //File image, String key, String inst, String categoria){
        def responseOCRData = kosmosOcrService.serviceOCRDATA(new File(pathFile), 
              KOcrConstants.KEY_STRING_LIBERTAD, KOcrConstants.LIBERTAD_INSTITUCION, 
              KOcrConstants.INE);
        println "###################### responseKOcr #################################";
        println "responseKOcr --> " + gson.toJson(responseKOcr);
        println "###################### responseOCRData #################################";
        println "responseOCRData --> " + gson.toJson(responseOCRData);
        response.dataCategoria =  responseKOcr;        
        responseOCRData.data.responseService = gson.toJson(responseOCRData.data.responseService);
        response.dataOCR =  responseOCRData;
        render response as JSON;                
    }
    
    
    
   def getComponenteOCR(){
       render(template: "/templates/generales/camaraOcr/camera"); 
   }
   
    
    /*Fin Codigo Mike MArtínez */
}
