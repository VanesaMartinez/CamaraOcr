package org.komos.app.ocr
import grails.transaction.Transactional;
import org.kosmos.ocr.generator.KOcrManager;

@Transactional
class KosmosOcrService {
             
    def serviceClasificadorDeArchivos(String PathImage, String pathKey, String pathInstitucion){         
        KOcrManager kOcrManager = new KOcrManager();
        def responseOCRClasificador = kOcrManager.getOCRClasificador(PathImage, pathKey, pathInstitucion);        
        return responseOCRClasificador
    }
    
    def serviceOCRDATA(File image, String key, String inst, String categoria){
        KOcrManager kOcrManager = new KOcrManager();
        def responseOCRDATA = kOcrManager.getOcrData(image, key, inst, categoria);
        return responseOCRDATA;
    }
}
