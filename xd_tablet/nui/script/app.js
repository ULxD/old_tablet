now = new Date
var dia     = now.getDate();           // 1-31
var mes     = now.getMonth();          // 0-11 (zero=janeiro)
var ano4    = now.getFullYear();       // 4 dígitos




$(function() {
	var actionContainer = $(".home");

  
	window.addEventListener("message", function(event) {

	  var item = event.data;
      if (item.restaurants){
        restaurantlist = item.restaurants
      }
      if (item.realtor){
        realtorList = item.realtor
      }
      if (item.myid){
          myID = item.myid
      }
      if (item.dealership){
        dealershipList = item.dealership
      }
      if (item.hours && item.minutes) {
        var curHour = item.hours
        var curMinutes = item.minutes
        if (curHour <= 9){
            curHour = `0${curHour}`
        }
        if (curMinutes <= 9){
            curMinutes = `0${curMinutes}`
        }
        $(".time").html(`${curHour}:${curMinutes}`)
      }
	  if (item.showmenu) {
		actionContainer.fadeIn();
        $(".tabletbordermain").fadeIn();
	  }
  
	  if (item.hidemenu) {
		actionContainer.fadeOut();
        $(".tabletbordermain").fadeOut();
	  }
	  document.onkeyup = function(data) {
		if (data.which == 27) {
            foodclose()
            sendData("ButtonClick", "exit");
		}
	  };
	});
});


function sendData(name,data){
	$.post("http://xd_tablet/"+name,JSON.stringify({data:data}),function(datab){
		if (datab != "ok"){
			console.log(datab);
		}
	});
}

function closeAll() {
    $(".lib-section-page-book").remove()
    $(".swiper-slide").remove()
    $(".boxrestremove").remove()
    $(".cardapioreset").remove()
    $(".outlet-section-item").remove()
    $(".boxaval").remove()
    $(".response").hide()
    $(".home").hide()
    $(".mainpage_ifood").hide()
    $(".pagerest").hide()
    $(".avaiblespage").hide()
    $(".cartifood").hide()
    $(".about").hide()
    $(".boxifood").hide()
    $(".adminpanel").hide()   
    $(".realtorabout").hide()
    $(".realtorscheduling").hide()
    $(".catalogobox").hide() 
    $(".realtormain").hide()
    $(".realtoradmin").hide()
    $(".longbooks").hide()
    $(".newsmain").hide()
    $(".gamesmain").hide()
    $(".outlet").hide()
    $(".empsmain").hide()
    $(".eventsmain").hide()
    $(".adminbox").hide()
    $(".adminrequest").hide()
    $(".adminschedule").hide()
    $(".adminteam").hide()
    $(".adminprofile").hide()
    $(".adminavaibles").hide()
    $(".boxifood").hide()
    closedealerall()
}