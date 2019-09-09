package camaraocr

import grails.transaction.Transactional
import sun.misc.BASE64Encoder;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.BufferedWriter;
import sun.misc.BASE64Decoder;
import java.io.IOException;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;

@Transactional
class KFileService {

    def saveFile(def urlimagen)  {
        
        try{
        def  imagenBase64 = urlimagen.tokenize(',')[1]       
        def resultado=[:]        
        BASE64Decoder decoder = new BASE64Decoder();
        byte[] imageByte = decoder.decodeBuffer(imagenBase64);
        BufferedImage image = ImageIO.read(new ByteArrayInputStream(imageByte));         
        File file = new File("/var/uploads/kosmos/documentos/archOcr/image.jpeg");
        file.createNewFile()        
        File imgOutFile = file;
        ImageIO.write(image, "jpeg", imgOutFile);
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return "/var/uploads/kosmos/documentos/archOcr/image.jpeg";
    }
}
