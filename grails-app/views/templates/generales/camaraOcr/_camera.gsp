<div id="cameraWeb fade">    
    <div class="row">
        <div class="col-md-4">
            <div class="video">                         
                        <video id="videoInput" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"/>                   
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
<canvas id="canvasPhoto" height="0" width="0" ></canvas>
 <g:external dir="js/ocr" file="ocr.js"/>