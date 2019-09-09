package camaraocr

import grails.transaction.Transactional
import grails.transaction.Transactional
import groovy.json.*
import groovyx.net.http.ContentType
import groovyx.net.http.HTTPBuilder
import static groovyx.net.http.ContentType.*
import static groovyx.net.http.Method.*
import java.awt.image.BufferedImage;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.File;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
import javax.ws.rs.core.MediaType
import org.apache.http.entity.ContentType;
import org.apache.commons.io.IOUtils /* we use IOUtils to convert the response stream to an array */
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
    import org.apache.http.entity.mime.MultipartEntityBuilder;
    import org.apache.http.entity.mime.HttpMultipartMode;
    import org.apache.http.entity.mime.content.FileBody;
    import org.apache.http.entity.mime.content.StringBody;
import sun.misc.BASE64Decoder;
 
@Transactional
class ClasificadorIneService {
        
    def serviceMethod() {

    }
      def clasificador(String urlimagen,String key,String insti ){
        
        def  imagenBase64 = urlimagen.tokenize(',')[1]
        println "name File --> "+ urlimagen.tokenize(',')[0];
        println "imagenBase64 --> "+ imagenBase64;
        def resultado=[:]
        byte[] instituto = insti.getBytes("UTF-8")
        byte[] llave = key.getBytes("UTF-8")
        BASE64Decoder decoder = new BASE64Decoder();
        byte[] imageByte = decoder.decodeBuffer(imagenBase64);
        BufferedImage image = ImageIO.read(new ByteArrayInputStream(imageByte));
        File imgOutFile = new File("/var/uploads/kosmos/documentos/ocr/image.jpeg");
    ImageIO.write(image, "jpeg", imgOutFile);
     def http = new HTTPBuilder('http://201.161.90.90:82/document_classification')    
        http.request(POST){  clasificadorine ->
             requestContentType = 'multipart/form-data'
           MultipartEntityBuilder datos = MultipartEntityBuilder.create();
           datos.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
           datos.addPart("institucion", new FileBody(new File('Clasificador/inst.txt')))
           datos.addPart("llave", new FileBody(new File('Clasificador/llave.txt')))
           datos.addPart("imagen", new FileBody(new File('Clasificador/imagen.jpg')))  
         clasificadorine.entity = datos.build()
            response.success = {  resp, json ->
                resultado = json.Documento
                imgOutFile.delete()
                println "::" + resp+ "##"+ json.Documento+ "%%"+ json;
                return resultado
            }
            response.failure = { reader ->
                resultado = reader
                return resultado
                println "##" + resp +  "##" + reader
                imgOutFile.delete()
            }
        
        }
    }
}
