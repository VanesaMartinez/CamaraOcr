//$.capturaImagen = $.contextAwarePathJS + "CamaraOcr/capturaImagen";

var FPS = 5;
var LOW_BRIGHTNESS_LIMIT = 80;
var HIGH_BRIGHTNESS_LIMIT = 200;

var H_INCHES = 2.23;
var W_INCHES = 3.38;
var DPI_LIMIT = 300;
$(document).ready(function () {
    scriptInit();
    var snapButton = $("#iconflex");
    snapButton.click(function (e) {
        let video = $("#videoInput");
        var image = $("#canvasPhoto");
        e.preventDefault();
        var snap = takeSnapshot();
        image.attr("src", snap);
        image.addClass("visible");
        image.attr("type", "img");
        video.stop();
        capturaImagen(snap);
    });



    function takeSnapshot() {

        let video = document.getElementById("videoInput");
        var hidden_canvas = document.querySelector("canvas"),
                context = hidden_canvas.getContext("2d");

        var width = video.videoWidth,
                height = video.videoHeight;

        if (width && height) {
            hidden_canvas.width = width;
            hidden_canvas.height = height;

            context.drawImage(video, 0, 0, width, height, 0, 0, width, height);

            var photo_focus = document.getElementById("photo-focus");

            let ratio = Math.min(
                    video.videoWidth / video.width,
                    video.videoHeight / video.height
                    );

            var reductionX = (video.width * ratio - video.videoWidth) / 2;
            var reductionY = (video.height * ratio - video.videoHeight) / 2;

            var dato = hidden_canvas.toDataURL("image/jpeg", 1.0);

            return dato;

        }
    }

    let cap;
    let src;
    let reducedMap;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        var camara = navigator.mediaDevices.getUserMedia({
            video: {facingMode: {exact: camara}},
            audio: false

        });

        camara.then(function (stream) {

            let video = document.getElementById("videoInput");
            video.srcObject = stream;
            video.play();
            //video.height = window.outerHeight;
            video.width = window.outerWidth + 50;
//      var ua = navigator.userAgent.toLowerCase();
//      var is_safari = ua.indexOf("safari/") > -1 && ua.indexOf("chrome") < 0;
//      if (is_safari) {
//        setTimeout(function() {
//          video.play();
//        });
//      src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
//      cap = new cv.VideoCapture(video);

            let {width, height} = stream.getTracks()[0].getSettings();
            let pointCount = video.height * video.width;
            console.log(`${width}x${height}`);

            //video.width = width;
            //video.height = height;

            function processVideo() {
                try {
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
            setInterval(processVideo, delay);
            setTimeout(processVideo, 1000 / FPS);
        });
        camara.catch(function (stream) {
            console.log("Eroor");

        });
    } else {

        document.getElementById("alert-text").innerHTML = "Navegador no soportado";
        alert.style.visibility = "visible";
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



