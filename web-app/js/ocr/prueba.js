/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function(){
      $("#viewOCR").click(function (){
           $.ajax({
            url:'http://localhost:8080/CamaraOcr/camaraOcr/getComponenteOCR',
            type: 'POST',
            data: {},
            cache: false,
            beforeSend: function() {        
                $('#container').html('');
            },
            success: function (data) {                                
                $('#container').html(data);                               
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                sweetAlert("Oops...", "Algo salió mal, intenta nuevamente en unos minutos.", "error");
            }
        });
       
    });
});