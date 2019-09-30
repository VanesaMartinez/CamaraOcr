<div id="cameraWeb fade">    
    <div class="row">
        <div class="col-md-4">
            <div class="video">                         
                        <video id="videoInput" width=500 height=500 frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"/>  
                        <canvas id="canvasOutput" width=320 height=240/>
            </div>        
            <div class="photo-place" id="Pantalla">
                <div class="m-content" id="photo-focus">
                    <div class="text-marco">
                        <p class="text-14">Coloque la credencial aquí.<br>Se escaneará automáticamente.</p>
                    </div>
                    <div class="text-center m-resolution">
                        <h2>Esta resolución no es valida para usar la camara.</h2>
                        <p class="text-gray">Disculpa las molestias</p>
                        <figure class="text-center">                                  
                            <img src="${resource(dir:'images/assets/images/svg', file:'id-card.svg')}" alt="" class="card-svg"/>
                        </figure>
                    </div>
                </div>                               
            </div>             
            <div class="f-content col-lg-12">
                    <figure class="iconflex">                    
                        <img src="${resource(dir:'images/assets/images/icons', file:'icon-photo.svg')}" class="icon-photo icon-deseable" id="iconflex">
                    </figure>
                </div>            
        </div>
    </div>            
</div>     
<script src="js/ocr/ocr.js" type="text/javascript" dir="js" file="ocr.js"></script>
<script src="js/openCV/adapter-5.0.4.js" type="text/javascript" dir="js" file="adapter-5.0.4.js"></script>
<script src="js/openCV/utils.js" type="text/javascript" dir="js" file="utils.js"></script>
<script src="js/ocr/myScript.js" type="text/javascript" dir="js" file="myScript.js"></script>
     