/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
utils = new Utils('errorMessage');
ocr = new OCR();
utils.loadOpenCv(() => {
    //kocrCamara();
     if(utils.incluye((utils.getBrowserInfo()).toUpperCase(),"SAFARI")=== false){
    utils.solicitarCamera(true,false,'videoInput',(haveCamera)=>{
        if(haveCamera === true){
            utils.startCamera('qvga', 'videoInput', 3);
        }
    });
   }else{
       utils.startCamera('qvga', 'videoInput', 3);
   }
});

let alert = document.getElementById("alert-camera");
alert.style.visibility = "hidden";

var snapButton = $("#iconflex");
snapButton.click(function (e) {
    let video = document.getElementById("videoInput");
    var image = document.querySelector("#canvasOutput");
    e.preventDefault();

    var snap = ocr.takeSnapshot();

    // Show image.

    image.setAttribute("src",snap);
    //resize_300_dpi2(snap);
    image.classList.add("visible");
    //video.stop();
    utils.stopCamera();
    ocr.capturaImagen(snap);
    });
    
    window.addEventListener("orientationchange", ()=> {
        if (window.matchMedia("(orientation: landscape)").matches) {
                    let video = document.getElementById('videoInput'); 
                    video.height = document.body.offsetHeight;
                    video.width = document.body.offsetWidth;
        }
    });
    
});
/*
function takeSnapshot() {
    let video = document.getElementById("videoInput");
    // Here we're using a trick that involves a hidden canvas element.
    var hidden_canvas = document.querySelector("canvas"),
            context = hidden_canvas.getContext("2d");

    var width = video.videoWidth,
            height = video.videoHeight;

    if (width && height) {
        // Setup a canvas with the same dimensions as the video.
        hidden_canvas.width = width;
        hidden_canvas.height = height;

        // Make a copy of the current frame in the video on the canvas.
        context.drawImage(video, 0, 0, width, height);

        var photo_focus = document.getElementById("photo-focus");
        let srcFinal = cv.imread("canvasOutput");
        let dst = new cv.Mat();
        // You can try more different parameters
        //let rect = new cv.Rect(100, 100, 200, 200);

        let ratio = Math.max(
                video.videoWidth / video.width,
                video.videoHeight / video.height
                );

        var reductionX = (video.width * ratio - video.videoWidth) / 2;
        var reductionY = (video.height * ratio - video.videoHeight) / 2;

        let rect = new cv.Rect(
                photo_focus.getBoundingClientRect().x * ratio - reductionX,
                photo_focus.getBoundingClientRect().y * ratio - reductionY,
                350 * ratio,
                220 * ratio
                );
        dst = srcFinal.roi(rect);
        cv.imshow("canvasOutput", dst);
        src.delete();
        dst.delete();

        // Turn the canvas image into a dataURL that can be used as a src for our photo.
        return hidden_canvas.toDataURL("image/png");
    }
}*/

/*function kocrCamara() {
 var constraints;
 var idCam;
 if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
 navigator.mediaDevices
 .enumerateDevices().then(
 function(devices) {
 for (var i = 0; i < devices.length; i++) {
 if (devices[i].kind == 'videoinput' && devices[i].label.indexOf('back') !== -1) {
 idCam = devices[i].deviceId;
 if (window.stream) {
 videoElement.src = null;
 window.stream.stop();
 }
 constraints = {                                
 video: {    
 width: {exact: 1280},
 height: {exact: 720},    
 deviceId: {
 exact: devices[i].deviceId
 }
 }
 
 };
 
 }
 }
 initVideo(constraints, idCam);
 });              
 } else {
 document.getElementById("alert-text").innerHTML = "Navegador no soportado";
 alert.style.visibility = "visible";
 }
 }*/


function OCR() {

    const FPS = 5;
    const LOW_BRIGHTNESS_LIMIT = 80;
    const HIGH_BRIGHTNESS_LIMIT = 200;

    const H_INCHES = 2.23;
    const W_INCHES = 3.38;
    const DPI_LIMIT = 300;

    let cap;
    let src;
    let reducedMap;

    let dstBrightness;
    let rowMat;
    let brightness;
    let row;
    let col;
    
    let lap;
    let myMean;
    let myStddev;
        
    let self = this;


    /*function initVideo(constraints, idCam) {
        navigator.mediaDevices
                .getUserMedia({
                    video: {deviceId: {
                            exact: idCam
                        }}, //constraints,//{facingMode: {exact:'environment'}},
                    audio: false

                })
                .then(function (stream) {
                    var streamsVideo = stream.getVideoTracks();
                    console.log(constraints);
                    console.log(idCam);
                    let video = document.getElementById("videoInput");
                    video.srcObject = stream;
                    video.play();
                    video.height = document.body.offsetHeight;
                    video.width = document.body.offsetWidth;

                    src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
                    cap = new cv.VideoCapture(video);

                    let {width, height} = stream.getTracks()[0].getSettings();
                    let pointCount = video.height * video.width;
                    console.log(`${width}x${height}`);

                    //video.width = width;
                    //video.height = height;

                    function processVideo() {
                        try {
                            //let begin = Date.now();
                            writeDateTime();

                            cap.read(src);
                            reducedMap = new cv.Mat(height / 2, width / 2, cv.CV_8UC4);
                            cv.resize(
                                    src, // input image
                                    reducedMap, // result image
                                    reducedMap.size(), // new dimensions
                                    0,
                                    0,
                                    cv.INTER_CUBIC // interpolation method
                                    );
                            //src.delete();

                            let brightness = calculateBrightness(
                                    reducedMap,
                                    (width / 2) * (height / 2)
                                    );
                            let laplace = blurInput(reducedMap);
                            reducedMap.delete();

                            let alert = document.getElementById("alert-camera");
                            var element = document.getElementById("photo-button");

                            if (
                                    brightness > HIGH_BRIGHTNESS_LIMIT ||
                                    brightness < LOW_BRIGHTNESS_LIMIT //||
                                    //laplace < 80
                                    ) {
                                alert.style.visibility = "visible";
                                element.classList.add(".icon-deseable");
                                //document.getElementById("alert-text").innerHTML =
                                //  "variance:" + laplace + " - brightness:" + brightness;
                            } else {
                                alert.style.visibility = "hidden";
                                element.classList.remove(".icon-deseable");
                            }
                            setTimeout(processVideo, 1000 / FPS);
                        } catch (err) {
                            console.log("An error occurred! " + err);
                            setTimeout(processVideo, 1000 / FPS);
                        }
                    }
                    let delay = 1000 / FPS;
                    //setInterval(processVideo, delay);
                    setTimeout(processVideo, 1000 / FPS);
                });
    }*/




    /**
     * Convert the RGB matrix into a HLS one, move into all rows and cols and sum the L component of each
     * element. After it divides the brightness value and pointCount value.
     *
     * @param {Mat} src Matrix that has a definition of the frame to analyze
     * @param {Number} pointCount It is the value of width times height
     * @returns
     */

    /*function calculateBrightness(src, pointCount) {
        dstBrightness = new cv.Mat();
        brightness = 0;
        cv.cvtColor(src, dstBrightness, cv.COLOR_RGB2HLS);

        for (row = 0; row < dstBrightness.rows; row = row + 10) {
            rowMat = dstBrightness.row(row);
            for (col = 0; col < dstBrightness.cols; col = col + 10) {
                brightness = brightness + rowMat.col(col).data[1];
            }
        }
        dstBrightness.delete();

        brightness = (brightness * 100) / pointCount;
        return brightness;
    }
//});
    var dstBlur;
    var temp;
    function blurInput(src) {
        writeDateTime();

        dstBlur = new cv.Mat();
        //let src = cv.imread(inputElement);
        //let src = cv.matFromImageData(e.target.result);

        cv.cvtColor(src, dstBlur, cv.COLOR_BGRA2GRAY);
        temp = new cv.Mat();
        resize_300_dpi(dstBlur, temp);
        let lap_variance = laplace_variance(temp);
        //cv.imshow(outputElement, dst);
        dstBlur.delete();
        temp.delete();

        return lap_variance;
    }

    let lap;
    let myMean;
    let myStddev;
    function laplace_variance(img) {
        let lap_var;
        lap = new cv.Mat();
        myMean = new cv.Mat();
        myStddev = new cv.Mat();

        cv.Laplacian(img, lap, cv.CV_64F);
        cv.meanStdDev(lap, myMean, myStddev);
        lap_var = myStddev.data64F[0] * myStddev.data64F[0];
        lap.delete();
        myMean.delete();
        myStddev.delete();

        return lap_var;
    }

    function resize_300_dpi(img, img_dst) {
        //let interpoletionMethod;
        let dsize = new cv.Size(1014, 636);
        let h_dpi = img.size().height / H_INCHES;
        let w_dpi = img.size().width / W_INCHES;

        if (h_dpi < DPI_LIMIT || w_dpi < DPI_LIMIT) {
            //interpoletionMethod = cv.INTER_CUBIC;
            cv.resize(img, img_dst, dsize, 0, 0, cv.INTER_CUBIC);
        } else {
            //interpoletionMethod = cv.INTER_AREA;
            cv.resize(img, img_dst, dsize, 0, 0, cv.INTER_AREA);
        }
        //cv.resize(img, img_dst, dsize, 0, 0, interpoletionMethod);
        writeDateTime();

        return img_dst;
    }

    function resize_300_dpi2(img) {
        //let interpoletionMethod;
        let src = cv.imread('canvasOutput');
        let dst = new cv.Mat();
        let dsize = new cv.Size(1014, 636);
        //let h_dpi = img.height / H_INCHES;
        //let w_dpi = img.width / W_INCHES;
        var image300dpi = null;
        cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);
        cv.imshow('canvasOutput', dst);
        src.delete();
        dst.delete();
        // if (h_dpi < DPI_LIMIT || w_dpi < DPI_LIMIT) {
        //interpoletionMethod = cv.INTER_CUBIC;
        //   image300dpi = cv.resize(img, dsize, 0, 0, cv.INTER_CUBIC);
        //} else {
        //interpoletionMethod = cv.INTER_AREA;
        // image300dpi = cv.resize(img, dsize, 0, 0, cv.INTER_AREA);
        //}
        //cv.resize(img, img_dst, dsize, 0, 0, interpoletionMethod);
        writeDateTime();

        return image300dpi;
    }


    function writeDateTime() {
        var today = new Date();
        console.log(
                today.getHours() +
                ":" +
                today.getMinutes() +
                ":" +
                today.getSeconds() +
                "." +
                today.getMilliseconds() +
                "\n"
                );
    }*/

this.takeSnapshot = function () {
    let video = document.getElementById("videoInput");
    // Here we're using a trick that involves a hidden canvas element.
    var hidden_canvas = document.querySelector("canvas"),
            context = hidden_canvas.getContext("2d");

    var width = video.videoWidth,
            height = video.videoHeight;

    if (width && height) {
        // Setup a canvas with the same dimensions as the video.
        hidden_canvas.width = width;
        hidden_canvas.height = height;

        // Make a copy of the current frame in the video on the canvas.
        context.drawImage(video, 0, 0, width, height);

        var photo_focus = document.getElementById("photo-focus");
        let srcFinal = cv.imread("canvasOutput");
        let dst = new cv.Mat();
        
        let ratio = Math.max(
                video.videoWidth / video.width,
                video.videoHeight / video.height
                );

        var reductionX = (video.width * ratio - video.videoWidth) / 2;
        var reductionY = (video.height * ratio - video.videoHeight) / 2;

        let rect = new cv.Rect(
                photo_focus.getBoundingClientRect().x * ratio - reductionX,
                photo_focus.getBoundingClientRect().y * ratio - reductionY,
                350 * ratio,
                220 * ratio
                );
        dst = srcFinal.roi(rect);
        cv.imshow("canvasOutput", dst);
        //src.delete();
        dst.delete();

        // Turn the canvas image into a dataURL that can be used as a src for our photo.
        return hidden_canvas.toDataURL("image/png");
        }
};

    this.capturaImagen = function (snap) {

        var imagenUrl = snap;
        $.ajax({
            type: 'POST',
            data: {snap: snap},
            url: "/CamaraOcr/camaraOcr/getClasificationAndDataFile",
            cache: false,
            beforeSend: function () {
                var kConstants = new KOcrConstants();
                utils.stopCamera();
                $("#container").html("");
                $("#container").html(kConstants.getSpinner());
            },
            success: function (response) {
                var info = JSON.parse(response.dataOCR.data.responseService);
                info = JSON.parse(info);
                var dataNombre = info.Nombre;
                var x = "Apellido Paterno";
                $("#container").html("");
                $("#container").html('<form action="">' +
                        'Tipo de documento:<br>' +
                        '<select id ="tipoDocumento">' +
                        '<option value=-1>Seleccione</option>' +
                        '<option value=1>INE/IFE</option>' +
                        '<option value=2>CFE</option>' +
                        '<option value=3>TELMEX</option>' +
                        '<option value=4>N/A</option>' +
                        '</select><br>' +
                        ' Nombre:<br>' +
                        ' <input type="text" name="firstname" value="' + dataNombre.Nombre + ' ' + dataNombre[x] + ' ' + dataNombre["Apellido Materno"] + '">' +
                        '<br>' +
                        'Data:<br>' +
                        ' <input type="text" name="lastname" value="">' +
                        '<br><br>' +
                        '</form>');
                if (response.dataCategoria.data.documento === "INE/IFE") {
                    $("#tipoDocumento").val(1);
                } else if (response.dataCategoria.data.documento === "CFE") {
                    $("#tipoDocumento").val(2);
                } else if (response.dataCategoria.data.documento === "TELMEX") {
                    $("#tipoDocumento").val(3);
                } else {
                    $("#tipoDocumento").val(4);
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }

        });
    };

    this.processVideo = function (video, width, height) {
        try {
            reducedMap = new cv.Mat(height / 2, width / 2, cv.CV_8UC4);
            self.src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
            self.cap = new cv.VideoCapture(video);
            self.cap(self.src);
            cv.resize(src, // input image
                    self.reducedMap, // result image
                    self.reducedMap.size(), // new dimensions
                    0, 0, cv.INTER_CUBIC // interpolation method
                    );
            let brightness = self.calculateBrightness(
                    self.reducedMap,
                    (width / 2) * (height / 2)
                    );
            let laplace = blurInput(reducedMap);
            self.reducedMap.delete();
              let alert = document.getElementById("alert-camera");
              let element = document.getElementById("photo-button");
            if ( brightness > self.HIGH_BRIGHTNESS_LIMIT ||
                    brightness < self.LOW_BRIGHTNESS_LIMIT //||
                    //laplace < 80
                    ) {
                alert.style.visibility = "visible";
                element.classList.add(".icon-deseable");                
            } else {
                alert.style.visibility = "hidden";
                element.classList.remove(".icon-deseable");
            }
            setTimeout(self.processVideo, 1000 / self.FPS);
        } catch (error) {
                console.log("An error occurred! " + err);
                setTimeout(self.processVideo, 1000 / FPS);
        }
    };
  
  this.calculateBrightness = function (src, pointCount){
  
        self.dstBrightness = new cv.Mat();
        self.brightness = 0;
        cv.cvtColor(src, self.dstBrightness, cv.COLOR_RGB2HLS);
        for (self.row = 0; row < self.dstBrightness.rows; self.row = self.row + 10) {
            self.rowMat = self.dstBrightness.row(self.row);
            for (self.col = 0; self.col < self.dstBrightness.cols; self.col = self.col + 10) {
                self.brightness = self.brightness + self.rowMat.col(self.col).data[1];
            }
        }
        self.dstBrightness.delete();

        self.brightness = (self.brightness * 100) / pointCount;
        return self.brightness;
  };

this.blurInput = function (src) {
        self.dstBlur = new cv.Mat();
        cv.cvtColor(src, dstBlur, cv.COLOR_BGRA2GRAY);
        self.temp = new cv.Mat();
        self.resize_300_dpi(self.dstBlur, self.temp);
        let lap_variance = self.laplace_variance(self.temp);        
        self.dstBlur.delete();
        self.temp.delete();

        return lap_variance;
    }

    
    this.laplace_variance = function (img) {
        let lap_var;
        self.lap = new cv.Mat();
        self.myMean = new cv.Mat();
        self.myStddev = new cv.Mat();

        cv.Laplacian(img, lap, cv.CV_64F);
        cv.meanStdDev(self.lap, self.myMean, self.myStddev);
        lap_var = self.myStddev.data64F[0] * self.myStddev.data64F[0];
        self.lap.delete();
        self.myMean.delete();
        self.myStddev.delete();
        return lap_var;
    }

    this.resize_300_dpi = function (img, img_dst) {
        
        let dsize = new cv.Size(1014, 636);
        let h_dpi = img.size().height / self.H_INCHES;
        let w_dpi = img.size().width / self.W_INCHES;
        if (h_dpi < self.DPI_LIMIT || w_dpi < self.DPI_LIMIT) {            
            cv.resize(img, img_dst, dsize, 0, 0, cv.INTER_CUBIC);
        } else {           
            cv.resize(img, img_dst, dsize, 0, 0, cv.INTER_AREA);
        }                
        return img_dst;
    }

    this.resize_300_dpi2 = function (img) {
        //let interpoletionMethod;
        let src = cv.imread('canvasOutput');
        let dst = new cv.Mat();
        let dsize = new cv.Size(1014, 636);        
        var image300dpi = null;
        cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);
        cv.imshow('canvasOutput', dst);
        src.delete();
        dst.delete();        
        return image300dpi;
    }

};