package camaraocr

import grails.transaction.Transactional
import groovy.json.*
import groovyx.net.http.ContentType
import groovyx.net.http.HTTPBuilder
import static groovyx.net.http.ContentType.*
import static groovyx.net.http.Method.*


@Transactional
class OcrService {

    def serviceMethod() {

    }
     def Ocr(String convertirBase64,String  key, String  inst, String ine ){
        def  imagenBase64 = convertirBase64.tokenize(',')[1]
        def resultado =[:]
        //     File archivo=new File("C:/Users/hp/Basejp.txt");
        //     FileWriter escribir =new FileWriter(archivo,true);
        //      escribir.write(imagenBase64 );
        //     println "%%" +  imagenBase64
        JsonBuilder ocr = new JsonBuilder()
        def datos = ocr {
            institucion inst
            llave key 
            categoria  ine
            imagen  imagenBase64 
        }
         println "##"+ocr.toString();
        def http = new HTTPBuilder('http://201.161.90.90:81/text_extract')
        http.request(POST){
            requestContentType = ContentType.JSON 
            body = ocr.toString();
            response.success = { resp, json ->
                resultado = json.texto
                println "::" +  resultado
                return resultado
            }
            response.failure = { resp, reader ->
                resultado = resp 
          
                println "###" + reader
                return resultado 
            }
         
         
        }
    }
}
