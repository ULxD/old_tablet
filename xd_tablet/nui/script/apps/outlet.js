
var OutletList = []

var requestjson = fetch("config/outlet.json")
.then(response => response.json())
.then(data => {
    requestjson = data.outlet


    for (i = 0; i < data.outlet.length; i++) {
        OutletList.push(data.outlet[i])
    }
})


/* APP outlet*/


function outletclose(){
    closeAll()
    $(".home").show()
}

function outletopen(){
    closeAll()
    $(".outlet").show()

    console.table(OutletList)

    for(i=0;i < OutletList.length; i++){
        $(".outlet-section-list").append(`
            <li class="outlet-section-item">
                <img src="http://131.196.198.119:3554/images/tablet/outlet/${OutletList[i].logo}.png" alt="">
                <div class="item-infos">
                    <h2>${OutletList[i].name}</h2>
                    <h6>${OutletList[i].type}</h6>
                    <h6 class="close">Fechado</h6>
                </div>
            </li>
        `)
    }
}