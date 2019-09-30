/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function KOcrConstants() {
    this.getComponent = function () {
        return component;
    };

    this.getComponent2 = function () {
        return component2;
    };

    this.getSpinner = function () {
        return spinner;
    };

    this.getConstraintRes8k = function () {
        return eightKConstraints;
    };

    this.getConstraintRes4k = function () {
        return fourKConstraints;
    };

    this.getConstraintFullDH = function () {
        return fullHdConstraints;
    };

    this.getConstraintHD = function () {
        return hdConstraints;
    };

    this.getConstraintVGA = function () {
        return vgaConstraints;
    };

    this.getConstraintQVGA = function () {
        return qvgaConstraints;
    };
    
    this.getIConstraintRes8k = function () {
        return iEightKConstraints;
    };

    this.getIConstraintRes4k = function () {
        return iFourKConstraints;
    };

    this.getIConstraintFullDH = function () {
        return iFullHdConstraints;
    };

    this.getIConstraintHD = function () {
        return iHdConstraints;
    };

    this.getIConstraintVGA = function () {
        return iVgaConstraints;
    };

    this.getIConstraintQVGA = function () {
        return iQvgaConstraints;
    };

    const component = '<div id="cameraWeb fade">' +
//    '<div class="row">' +
            '<div class="col-md-4">' +
            '<div class="video">                         ' +
            '<video id="videoInput" width="100%" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"/>  ' +
            '<canvas id="canvasOutput"/>' +
            '<canvas id="canvasRecorte"/>' +
            '</div>        ' +
            '<div class="photo-place" id="Pantalla"/>' +
            '<div class="m-content" id="photo-focus">' +
            '<div class="text-marco">' +
            '<p class="text-14">Coloque la credencial aquí.<br>Se escaneará automáticamente.</p>' +
            '</div>' +
            '<div class="text-center m-resolution">' +
            '<h2>Esta resolución no es valida para usar la camara.</h2>' +
            '<p class="text-gray">Disculpa las molestias</p>' +
            '<figure class="text-center"> ' +
            '<img src="${resource(dir:"images/assets/images/svg", file:"id-card.svg")}" alt="" class="card-svg"/>' +
            '</figure>' +
            '</div>' +
            '</div>                               ' +
            '</div>             ' +
            '<div class="f-content col-lg-12">' +
            '<figure class="iconflex"> ' +
            '<img src="../images/assets/images/icons/icon-photo.svg" class="icon-photo "icon-deseable" id="iconflex">' +
            '</figure>' +
            '</div>            ' +
            '</div>' +
//    '</div>            ' +
            '<p class="err" id="errorMessage"></p>' +
            '</div>     ' +
            '<script src="/CamaraOcr/js/openCV/adapter-5.0.4.js" type="text/javascript" dir="js" file="adapter-5.0.4.js"></script>' +
            '<script src="/CamaraOcr/js/openCV/utils.js" type="text/javascript" dir="js" file="utils.js"></script>' +
            '<script src="/CamaraOcr/js/ocr/ocr.js" type="text/javascript" dir="js" file="ocr.js"></script>';


    const component2 =            
            '		<div class="display-flex">' +
            '			<div class="video">' +
            '				<video id="videoInput" width="100%">' +
            '				</video>' +
            '			</div>' +
            '			<div class="b-content">' +
            '				<figure class="icon-conten">' +
            '					<img src="../images/assets/images/icons/icon-flash.svg">' +
            '				</figure>' +
            '				<figure class="icon-conten-close">' +
            '					<a href="#"><img src="../images/assets/images/icon-close.svg">' +
            '						<figcaption>Cerrar</figcaption>' +
            '					</a>' +
            '				</figure>' +
            '			</div>' +
            '			<div class="m-content">' +
            '				<div class="alert-camera" id="alert-camera">' +
            '					<h1>¡Fuera de foco!</h1>' +
            '					<p id="alert-text">Para tomar la fotografía enfoca mejor la INE</p>' +
            '				</div>' +
            '				<div class="' +
            '				 content-flex">' +
            '					<div class="photo-place" id="photo-focus"></div>' +
            '				</div>' +
            '				<div class="text-center m-resolution">' +
            '					<h2>Regresa tu teléfono de forma horizontal</h2>' +
            '					<p class="text-gray">Y toma la foto como se indica</p>' +
            '					<figure class="text-center">' +
            '						<img src="../images/assets/images/svg/id-card.svg" class="card-svg">' +
            '					</figure>' +
            '				</div>' +
            '			</div>' +
            '			<div class="f-content">' +
            '				<figure class="icon-flex" >' +
            '					<img id="iconflex" src="../images/assets/images/icons/icon-photo.svg" class="icon-photo icon-deseable">' +
            '				</figure>' +
            '			</div>' +
            '		</div>' +
            '		<canvas id="canvasOutput" height="0" width="0"></canvas>' +
            //'		<canvas id="canvasRecorte" height="0" width="0"></canvas>' +
            '<script src="/CamaraOcr/js/openCV/adapter-5.0.4.js" type="text/javascript" dir="js" file="adapter-5.0.4.js"></script>' +
            '<script src="/CamaraOcr/js/openCV/utils.js" type="text/javascript" dir="js" file="utils.js"></script>' +
            '<script src="/CamaraOcr/js/ocr/ocr.js" type="text/javascript" dir="js" file="ocr.js"></script>';

    const spinner =
            '<div style ="text-align:center">' +
            '<div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">' +
            '  <span class="sr-only">Loading...</span>' +
            '</div>' +
            '<div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">' +
            '  <span class="sr-only">Loading...</span>' +
            '</div>' +
            '<div  style="text-align:center"class=" ">Procesando ...</div>';
    '</div>';

   const spinnerInicial =
            '<div style ="text-align:center">' +
            '<div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">' +
            '  <span class="sr-only">Loading...</span>' +
            '</div>' +
            '<div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">' +
            '  <span class="sr-only">Loading...</span>' +
            '</div>' +
            '<div  style="text-align:center"class=" ">Cargando componentes ...</div>';
    '</div>';

    const vgaConstraints = {
        video: {//'facingMode': { exact: 'environment' },
                'deviceId': {exact: null},
               'width': {exact: 640}, 'height': {exact: 480}}
    };

    const hdConstraints = {
        video: {//'facingMode': { exact: 'environment' },
            'deviceId': {exact: null},
            'width': {exact: 1280}, 'height': {exact: 720}}
    };

    const fullHdConstraints = {
        video: {//'facingMode': { exact: 'environment' },
            'deviceId': {exact: null},
            'width': {exact: 1920}, 'height': {exact: 1080}}
    };

    const fourKConstraints = {
        video: {//'facingMode': { exact: 'environment' },
            'deviceId': {exact: null},
            'width': {exact: 4096}, 'height': {exact: 2160}}
    };

    const eightKConstraints = {
        video: {//'facingMode': { exact: 'environment' },
            'deviceId': {exact: null},
            'width': {exact: 7680}, 'height': {exact: 4320}}
    };

    const qvgaConstraints = {
        video: {//'facingMode': { exact: 'environment' },
            'deviceId': {exact: null},
            'width': {exact: 320}, 'height': {exact: 240}}
    };
    
    /**Iphone*/
      const iVgaConstraints = {
        video: {'facingMode': { exact: 'environment' },
              //  'deviceId': {exact: null},
               'width': {exact: 640}, 'height': {exact: 480}}
    };

    const iHdConstraints = {
        video: {'facingMode': { exact: 'environment' },
            //'deviceId': {exact: null},
            'width': {exact: 1280}, 'height': {exact: 720}}
    };

    const iFullHdConstraints = {
        video: {'facingMode': { exact: 'environment' },
            //'deviceId': {exact: null},
            'width': {exact: 1920}, 'height': {exact: 1080}}
    };

    const iFourKConstraints = {
        video: {'facingMode': { exact: 'environment' },
            //'deviceId': {exact: null},
            'width': {exact: 4096}, 'height': {exact: 2160}}
    };

    const iEightKConstraints = {
        video: {'facingMode': { exact: 'environment' },
            //'deviceId': {exact: null},
            'width': {exact: 7680}, 'height': {exact: 4320}}
    };

    const iQvgaConstraints = {
        video: {'facingMode': { exact: 'environment' },
           //'deviceId': {exact: null},
            'width': {exact: 320}, 'height': {exact: 240}}
    };
    
    
}

 