<!DOCTYPE html>
<html lang="es">
<head>
	<title>Scanner INE</title>

	<!-- Required meta tags -->
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
	<!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
             <g:external dir="js" file="jquery-3.1.1.min.js"/>
            <g:external dir="js" file="jquery.nicescroll.js"/>
           <g:external dir="js" file="jquery.slimscroll.js"/>
            <g:external dir="js" file="jquery.scrollTo.min.js"/>
            <g:external dir="js" file="jquery.modal.min.js"/>
            <g:external dir="js" file="jquery.blockUI.js"/>
             <g:external dir="js" file="jquery.core.js"/>
        <g:external  dir="css/assets" file="style.css" rel="stylesheet" />
      <g:external  dir="css/src" file="styles.css" rel="stylesheet" />
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <g:external dir="js/src" file="index.js"/>
     <g:external dir="js" file="sweetalert.min.js"/>
  
</head>
<body>
	
	<!--<div class="container-flash"></div>-->
		<div class="container-fluid">
			<div class="row">
				<div class="video" >
					<video id="videoInput" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture">
					</video>
				</div>
				
				<!--div class="b-content col-lg-12 text-right">
					<figure class="icon-conten-close">
						<a href="#"><img src="assets/images/icons/icon-close.svg" class="icon-close">
						<figcaption>Cerrar</figcaption></a>
					</figure>
				</div -->

			</div>

			<div class="row">
				<div class="photo-place" id="Pantalla">
					<div class="m-content" id="photo-focus">
							<!--<div class="alert-camera">
								<h1>¡Fuera de foco!</h1>
								<p>Para tomar la fotografía enfoca mejor la INE</p>
							</div>-->

							<div class="text-marco"  >
								<p class="text-14">Coloque la credencial aquí.<br>Se escaneará automáticamente.</p>
							</div>

							<div class="text-center m-resolution">
								<h2>Esta resolución no es valida para usar la camara.</h2>
								<p class="text-gray">Disculpa las molestias</p>

								<figure class="text-center">
									<!--<img src="images/assets/images/svg/id-card.svg" class="card-svg">-->
                                                                         <img src="${resource(dir:'images/assets/images/svg', file:'id-card.svg')}" alt="" class="card-svg" >
								</figure>

								
							</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="f-content col-lg-12">
					<figure class="iconflex">
						<!--<img src="images/assets/images/icons/icon-photo.svg" class="icon-photo icon-deseable" id="icon-flex">-->
                                                 <img src="${resource(dir:'images/assets/images/icons', file:'icon-photo.svg')}" class="icon-photo icon-deseable" id="iconflex">
					</figure>
				</div>
			</div>
                       
			
		</div>

         <canvas id="canvasPhoto" height="0" width="0" ></canvas>
         
         
         
           

<!--	<script type="text/javascript">
		$(document).ready(function () {
			function reorient(e) {
				var portrait = (window.orientation % 180 == 0);
			    $("body > div").css("-webkit-transform", !portrait ? "rotate(-90deg)" : "");
			 }
			 window.onorientationchange = reorient;
			 window.setTimeout(reorient, 0);
		});
	</script>-->



	<!-- jQuery first, then Popper.js, then Bootstrap JS -->
   	
		<script type="text/javascript" >
  
			var alturaP= window.screen.availHeight-100 ;
				 var anchoP= window.screen.availWidth -100 ;
				 console.log("alturaP" + alturaP, "Ancho "+ anchoP);
			 var altura= parseInt(alturaP) / 636;
			 var ancho=parseInt(anchoP) / 1014;
	 
			 console.log("alturaP" + altura, "Ancho "+ ancho);
			 var x = Math.min(altura, ancho);
			 
			 console.log("min:" + x);
			 w= (x) * 636 ;
			 h= (x) * 1014;
			 console.log("total altura :" + w, "total ancho"+ h );
				document.getElementById("Pantalla").style.height= w +"px";
			document.getElementById("Pantalla").style.width= h + "px";
			
		 </script>
                 <div class="modal " id="modalDatos" >
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Datos Ocr</h5>
        <a href="#" rel="modal:close">X</a>
      </div>
      <div class="modal-body">
        <div id="datosOcr"></div>
      </div>
      <div class="modal-footer">
                    <a type="button" class="btn btn-default" rel="modal:close">Cerrar</a>
                </div>
                 </div></div>
    
</body>
</html>