//$.capturaImagen = $.contextAwarePathJS + "CamaraOcr/capturaImagen";

var FPS = 5;
var LOW_BRIGHTNESS_LIMIT = 80;
var HIGH_BRIGHTNESS_LIMIT = 200;

var H_INCHES = 2.23;
var W_INCHES = 3.38;
var DPI_LIMIT = 300;
$(document).ready(function () {
   //scriptInit();
    utils = new Utils('errorMessage');
    utils.loadOpenCv(() => {
        kocrCamara();
      //utils.startCamera('qvga',  'videoInput');
    });


    var snapButton = $("#iconflex");
    snapButton.click(function (e) {
        let video = $("#videoInput");
        var image = $("#canvasRecorte");
        e.preventDefault();
        var snap = takeSnapshot();
        image.attr("src", snap);
        image.addClass("visible");
        image.attr("type", "img");
        video.stop();
        utils.stopCamera();
        capturaImagen(snap);
    });

function takeSnapshot() {
  let video = document.getElementById("videoInput");
  // Here we're using a trick that involves a hidden canvas element.
  var hidden_canvas = document.querySelector("canvas"),
    context = hidden_canvas.getContext("2d");

  var width = 900; video.width,
    height = video.height;

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
     //reductionX = 0;
     //reductionY = 0;
     context.arc(0,gh, 10, 0, Math.PI * 2, true); 
            context.fill();
      var x1 = photo_focus.getBoundingClientRect().x - reductionX;
      var y1 = photo_focus.getBoundingClientRect().y - reductionY;
      var widthRect = photo_focus.getBoundingClientRect().width;
      var heightRect = photo_focus.getBoundingClientRect().height;
    let rect = new cv.Rect(
      x1,
      y1,
      widthRect,
      heightRect /** ratio*/
    );
    var sdf = photo_focus.getBoundingClientRect().x - reductionX; //* ratio - reductionX;
    var gh = photo_focus.getBoundingClientRect().y - reductionY; //* ratio - reductionY;
    context.arc(sdf,gh, 10, 0, Math.PI * 2, true); 
            context.fill();
    dst = srcFinal.roi(rect);
    cv.imshow("canvasOutput", dst);
    src.delete();
    dst.delete();

    // Turn the canvas image into a dataURL that can be used as a src for our photo.
    return hidden_canvas.toDataURL("image/png");
  }
}


    /*function takeSnapshot() {

        let video = document.getElementById("videoInput");
        var hidden_canvas = document.querySelector("#canvasOutput");
        var context = hidden_canvas.getContext("2d");

        var width = video.videoWidth;
        var height = video.videoHeight;

        if (width && height) {
            var u = hidden_canvas.width;
            var r = hidden_canvas.height;
            hidden_canvas.width = width;
            hidden_canvas.height = height;
            var uu = hidden_canvas.width;
            var rr = hidden_canvas.height;
            
            context.drawImage(video, 0, 0, width, height, 0, 0, width, height);

            var photo_focus = document.getElementById("Pantalla");
            let srcFinal = cv.imread("canvasOutput");
            let dst = new cv.Mat();
            let ratio = Math.min(
                    video.videoWidth / video.width,
                    video.videoHeight / video.height
                    );
            /*
             * 
             * OpenCV 
             * 
             */

      /*      var reductionX = (video.width * ratio - 0) / 2;
            var reductionY = (video.height * ratio - 0) / 2;
            //var x1 = photo_focus.getBoundingClientRect().x * ratio - reductionX;
            //var y1 = photo_focus.getBoundingClientRect().y * ratio - reductionY;
            var x1 = photo_focus.getBoundingClientRect().x * ratio;
            var y1 = photo_focus.getBoundingClientRect().y * ratio -reductionY ;
            var width= 350 ;
            var heigth=220 ;
            context.arc(x1, y1, 10, 0, Math.PI * 2, true); 
            context.fill();
            let rect = new cv.Rect(x1,
                    y1,width, heigth);
            context.beginPath();
            context.rect(x1,y1,width, heigth);
            context.stroke();
            dst = srcFinal.roi(rect);
            cv.imshow("canvasOutput", dst);
            //src.delete();
            dst.delete();

            // Turn the canvas image into a dataURL that can be used as a src for our photo.    
            return hidden_canvas.toDataURL("image/png");
            //Fin OpenCV


            //var dato = hidden_canvas.toDataURL("image/jpeg", 1.0);

            //return dato;

        }
    }*/

let cap;
let src;
let reducedMap;
   function kocrCamara() {

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                    .getUserMedia({
                        video: {
                            facingMode: "environment"
                        },
                        audio: false,
                        video: true
                    })
                    .then(function (stream) {
                        let video = document.getElementById("videoInput");
                        video.srcObject = stream;
                        video.play();
                        
                        video.height = 900; document.body.offsetHeight;
                        video.width = document.body.offsetWidth;
                        /*if (
                                document.documentElement.clientHeight / 636 <
                                document.documentElement.clientWidth / 1024
                                ){
                            video.width = document.documentElement.clientWidth;
                                }
                        else
                            video.height = document.documentElement.clientHeight;*/

                        var ua = navigator.userAgent.toLowerCase();
                        var is_safari = ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0;
                        if (is_safari) {
                            setTimeout(function () {
                                video.play();
                            });
                        }
                        src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
                        cap = new cv.VideoCapture(video);

                        let {width, height} = stream.getTracks()[0].getSettings();
                        let pointCount = video.height * video.width;
                        console.log(`${width}x${height}`);

                        //video.width = width;
                        //video.height = height;

                        function processVideo() {
                            try {
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
                                    document.getElementById("alert-text").innerHTML =
                                            "variance:" + laplace + " - brightness:" + brightness;
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
                        setTimeout(processVideo, 1000 / FPS);
                    });
        } else {

            document.getElementById("alert-text").innerHTML = "Navegador no soportado";
            alert.style.visibility = "visible";
        }
    }
    function capturaImagen(snap) {

        var imagenUrl = snap;
        $.ajax({
            type: 'POST',
            data: {snap: snap},
            url: "/CamaraOcr/camaraOcr/getClasificationAndDataFile",
            cache: false,
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
    }


    /**
     * Convert the RGB matrix into a HLS one, move into all rows and cols and sum the L component of each
     * element. After it divides the brightness value and pointCount value.
     *
     * @param {Mat} src Matrix that has a definition of the frame to analyze
     * @param {Number} pointCount It is the value of width times height
     * @returns
     */


    function calculateBrightness(src, pointCount) {
        let rowMat;
        let brightness;
        let row;
        let col;
        var dstBrightness = new cv.Mat();
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

});

var scriptInit = function () {
    var alturaP = window.screen.availHeight - 100;
    var anchoP = window.screen.availWidth - 100;
    console.log("alturaP" + alturaP, "Ancho " + anchoP);
    var altura = parseInt(alturaP) / 636;
    var ancho = parseInt(anchoP) / 1014;
    console.log("alturaP" + altura, "Ancho " + ancho);
    var x = Math.min(altura, ancho);
    console.log("min:" + x);
    w = (x) * 636;
    h = (x) * 1014;
    console.log("total altura :" + w, "total ancho" + h);
    document.getElementById("Pantalla").style.height = w + "px";
    document.getElementById("Pantalla").style.width = h + "px";
};


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
}
