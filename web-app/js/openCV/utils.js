function Utils(errorOutputId) { // eslint-disable-line no-unused-vars
    let kConstants = new KOcrConstants();  
    let myStream;
    let self = this;
    let idCamara = null;
    this.errorOutput = document.getElementById(errorOutputId);

    const OPENCV_URL = '../js/openCV/opencv.js';
    this.loadOpenCv = function (onloadCallback) {
        this.loadSpinnerInicial();
        let script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('type', 'text/javascript');
        script.addEventListener('load', () => {
            if (cv.getBuildInformation)
            {     
                cv.getBuildInformation();           
                onloadCallback();
            } else
            {
                // WASM
                cv['onRuntimeInitialized'] = () => {
                    cv.getBuildInformation();
                    onloadCallback();
                }
            }
        });
        script.addEventListener('error', () => {
            self.printError('Failed to load ' + OPENCV_URL);
        });
        script.src = OPENCV_URL;
        let node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(script, node);
    };

    this.createFileFromUrl = function (path, url, callback) {
        let request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function (ev) {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    let data = new Uint8Array(request.response);
                    cv.FS_createDataFile('', path, data, true, false, false);
                    callback();
                } else {
                    self.printError('Failed to load ' + url + ' status: ' + request.status);
                }
            }
        };
        request.send();
    };

    this.loadImageToCanvas = function (url, cavansId) {
        let canvas = document.getElementById(cavansId);
        let ctx = canvas.getContext('2d');
        let img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
        };
        img.src = url;
    };

    /* this.executeCode = function(textAreaId) {
     try {
     this.clearError();
     let code = document.getElementById(textAreaId).value;
     eval(code);
     } catch (err) {
     this.printError(err);
     }
     };*/

    this.clearError = function () {
        this.errorOutput.innerHTML = '';
    };

    this.printError = function (err) {
        if (typeof err === 'undefined') {
            err = '';
        } else if (typeof err === 'number') {
            if (!isNaN(err)) {
                if (typeof cv !== 'undefined') {
                    err = 'Exception: ' + cv.exceptionFromPtr(err).msg;
                }
            }
        } else if (typeof err === 'string') {
            let ptr = Number(err.split(' ')[0]);
            if (!isNaN(ptr)) {
                if (typeof cv !== 'undefined') {
                    err = 'Exception: ' + cv.exceptionFromPtr(ptr).msg;
                }
            }
        } else if (err instanceof Error) {
            err = err.stack.replace(/\n/g, '<br>');
        }
        this.errorOutput.innerHTML = err;
    };

    /* this.loadCode = function(scriptId, textAreaId) {
     let scriptNode = document.getElementById(scriptId);
     let textArea = document.getElementById(textAreaId);
     if (scriptNode.type !== 'text/code-snippet') {
     throw Error('Unknown code snippet type');
     }
     textArea.value = scriptNode.text.replace(/^\n/, '');
     };*/

    this.addFileInputHandler = function (fileInputId, canvasId) {
        let inputElement = document.getElementById(fileInputId);
        inputElement.addEventListener('change', (e) => {
            let files = e.target.files;
            if (files.length > 0) {
                let imgUrl = URL.createObjectURL(files[0]);
                self.loadImageToCanvas(imgUrl, canvasId);
            }
        }, false);
    };

    function onVideoCanPlay() {
        if (self.onCameraStartedCallback) {
            self.onCameraStartedCallback(self.stream, self.video);
        }
    }
    ;

    this.startCamera = async function (resolution, videoId, resolutionId) {
       
        let video = document.getElementById(videoId);
        if (!video) {
            video = document.createElement('video');
        }
        
        if(self.incluye((self.getBrowserInfo()).toUpperCase(),"SAFARI")=== false){
         self.stopCamera();
         self.getIdDispositivo().then((dispositivo)=>{   
         console.log(self.idCamara);
              let videoConstraints = self.getConstraintResolution(resolutionId);
             
               if(self.idCamara !== null && self.idCamara !== undefined && self.idCamara !== null){
                videoConstraints.video.deviceId.exact = self.idCamara;
                }
                       self.getResolution(video, videoConstraints, (successfull)=>{
                           if(successfull===false){
                               self.startCamera(resolution, videoId, (resolutionId+1));
                           }                                                          
                       });          
             });         
         }else{
             video.setAttribute('autoplay','');
             video.setAttribute('muted','');
             video.setAttribute('playsinline','');
             let videoConstraints = self.getIConstraintResolution(resolutionId);               
                       self.getIResolution(video, videoConstraints, (successfull)=>{
                           if(successfull===false){
                               self.startCamera(resolution, videoId, (resolutionId+1));
                           }                                                          
                       });
         }        
    };

    this.stopCamera = function () {
         if (myStream) {
                 myStream.getTracks().forEach(track => {
                 track.stop();
                });
        }
        if (this.video) {
            this.video.pause();
            this.video.srcObject = null;
            this.video.removeEventListener('canplay', onVideoCanPlay);
        }
        if (this.stream) {
            this.stream.getVideoTracks()[0].stop();
        }
    };

    this.getIdDispositivo = async function() {
        var idCam = null;
         let dispositivo = {id: null};
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
           await navigator.mediaDevices
                    .enumerateDevices().then(
                    function (devices) {                       
                        for (var i = 0; i < devices.length; i++) {
                            if (devices[i].kind == 'videoinput' && (devices[i].label.indexOf('back') !== -1 || 
                                    devices[i].label.indexOf('Back') !== -1 || devices[i].label.indexOf('trasera') !== -1)) {                                
                                self.idCamara = devices[i].deviceId;
                                dispositivo.id = devices[i].deviceId;                                
                            }
                        }                        
                    });          
        }        
    };

    this.getResolution = function (video, constraint,callback) {
        navigator.mediaDevices.getUserMedia({video: constraint.video, audio: false})
                .then(function (stream) {                   
                    video.srcObject = stream;
                    video.play();
                    video.height = document.body.offsetHeight;
                    video.width = document.body.offsetWidth;
                    self.video = video;
                    self.stream = stream;                    
                    self.video.addEventListener('canplay', onVideoCanPlay, false);
                    callback(true);
                })
                .catch(function (err) {
                    //self.printError('Camera Error: ' + err.name + ' ' + err.message);
                    callback(false,'Ocurrio un error en la selección del dispositivo');
                });
    };
    
    this.getIResolution = function (video, constraint,callback) {
        navigator.mediaDevices.getUserMedia({video: constraint.video, audio: false})
                .then(function (stream) {                   
                    video.srcObject = stream;     
                    video.height = document.body.offsetHeight;
                    video.width = document.body.offsetWidth;
                    self.video = video;
                    self.stream = stream;                    
                    self.video.addEventListener('canplay', onVideoCanPlay, false);
                    callback(true);
                })
                .catch(function (err) {
                    //self.printError('Camera Error: ' + err.name + ' ' + err.message);
                    callback(false,'Ocurrio un error en la selección del dispositivo');
                });
    };
    
    this.getConstraintResolution = function (idConstraint){                
        let constraint = null;
        switch (idConstraint){
            case 1: constraint = kConstants.getConstraintRes8k();
                break;
            case 2: constraint = kConstants.getConstraintRes4k();
                break;
            case 3: constraint = kConstants.getConstraintFullDH();
                break;
            case 4: constraint = kConstants.getConstraintHD();
                break;
            case 5: constraint = kConstants.getConstraintVGA();
                break;
            case 5: constraint = kConstants.getConstraintQVGA();
                break;
            default: constraint = null;                                
        }
        return constraint;
    }
    
     this.getIConstraintResolution = function (idConstraint){                
        let constraint = null;
        switch (idConstraint){
            case 1: constraint = kConstants.getIConstraintRes8k();
                break;
            case 2: constraint = kConstants.getIConstraintRes4k();
                break;
            case 3: constraint = kConstants.getIConstraintFullDH();
                break;
            case 4: constraint = kConstants.getIConstraintHD();
                break;
            case 5: constraint = kConstants.getIConstraintVGA();
                break;
            case 5: constraint = kConstants.getIConstraintQVGA();
                break;
            default: constraint = null;                                
        }
        return constraint;
    };
    
    this.solicitarCamera = function (video, audio,videoId,callback){
        navigator.mediaDevices.getUserMedia({video:video,audio:audio})
                .then(function (stream) {
                    myStream = stream = window.stream = stream;
                    let video = document.getElementById(videoId);
                    video.srcObject = stream;
                    video.play();
                    callback(true);
                })
                .catch(e => {
                    callback(false);
        });
    };
    
    this.loadSpinnerInicial = function (){
            /*let divSpinner = document.getElementById("spinnerInicial");
            divSpinner.innerHTML ="";
            divSpinner.innerHTML = kConstants.spinnerInicial;*/
    };
    
    
this.getBrowserInfo = function () {
    var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null)
            return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null)
        M.splice(1, 1, tem[1]);
    return M.join(' ');
};

this.incluye = function (container, value) {
    var returnValue = false;
    var pos = container.indexOf(value);
    if (pos >= 0) {
        returnValue = true;
    }
    return returnValue;
};


};



