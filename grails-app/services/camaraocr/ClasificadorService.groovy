package camaraocr
import grails.transaction.Transactional
import org.codehaus.groovy.grails.web.json.JSONObject
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartException
import grails.converters.JSON
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
class ClasificadorService {
    
   private static final String URL_CLASSIFICATION_WS = 'http://201.161.90.90:82/document_classification'
    def serviceMethod() {
      
    }
    
    
  
   
   
}