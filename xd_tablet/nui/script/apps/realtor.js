var realtorList = []
var myID = 0


var requestRealtor = fetch("config/ifood.json")
.then(response => response.json())
.then(data => {
    requestRealtor = data.realtor


    for (i = 0; i < data.realtor.length; i++) {
        realtorList.push(data.realtor[i])
    }
})

function realtorclose(){
    closeAll()
    $(".home").show()
}

function realtoropen(){
    closeAll()
    $(".realtormain").show()
    $(".realtorabout").show()
}

function realtorabout(){
    $(".realtorabout").show()
    $(".realtorscheduling").hide()
    $(".catalogobox").hide()
    $(".realtoradmin").hide()
}

function realtorcatalogo(){
    $(".catalogobox").show()
    $(".realtorscheduling").hide()
    $(".realtorabout").hide()
    $(".realtoradmin").hide()
}

function realtorscheduling(){
    $(".realtorscheduling").show()
    $(".catalogobox").hide()
    $(".realtorabout").hide()
    $(".realtoradmin").hide()
}

function realtoradmin(){
    if (realtorList[0]['perms'] && realtorList[0]['perms']['normal'][myID]){
        $(".realtoradmin").show()
        $(".boxadminscheduling").show()
        $(".boxadminregisterhouse").hide()
        $(".boxadminhouseslist").hide()
        $(".realtorscheduling").hide()
        $(".catalogobox").hide()
        $(".realtorabout").hide()
        $(".realtorScheds").html('')
        if (realtorList[0]['scheduling']) {
            realtorList[0]['scheduling'].map((element,index) => {
                if (element && element.name) {
                    $(".realtorScheds").append(`
                        <li>
                            <div class="leftbox">
                                <h1>${element.name}</h1>
                                <h5>Passaporte: <span>${element.passport}</span></h5>
                                <h5>Telefone: <span>${element.phone}</span></h5>
                                <h5>Distrito: <span>${element.district}</span></h5>

                            </div>
                            <div class="rightbox">
                                <h5>Imovel: <span>${element.home}</span></h5>
                                <h5>Horario: <span>${element.hour}</span></h5>

                                <div class="confirm"><img
                                        onclick="removeRealtor(${index})" src="imgs/negative.png" alt=""></div>
                            </div>
                        </li>
                        `)
                }
            }).join('')
        }
    }
}

function openschedulingadmin(){
    $(".boxadminscheduling").show()
    $(".boxadminregisterhouse").hide()
    $(".boxadminhouseslist").hide()
    $(".realtorScheds").html('')
    if (realtorList[0]['scheduling']) {
        realtorList[0]['scheduling'].map((element,index) => {
            if (element && element.name) {
                $(".realtorScheds").append(`
                    <li>
                        <div class="leftbox">
                            <h1>${element.name}</h1>
                            <h5>Passaporte: <span>${element.passport}</span></h5>
                            <h5>Telefone: <span>${element.phone}</span></h5>
                            <h5>Distrito: <span>${element.district}</span></h5>

                        </div>
                        <div class="rightbox">
                            <h5>Imovel: <span>${element.home}</span></h5>
                            <h5>Horario: <span>${element.hour}</span></h5>

                            <div class="confirm"><img
                                    onclick="removeRealtor(${index})" src="imgs/negative.png" alt=""></div>
                        </div>
                    </li>
                    `)
            }
        }).join('')
    }
}

function opensregisterhouseadmin(){
    $(".boxadminregisterhouse").show()
    $(".boxadminscheduling").hide()
    $(".boxadminhouseslist").hide()
}

var distritos = [
    {index:"condominios",name:"Condominios"},
    {index:"distrito1",name:"Distrito 1"},
    {index:"distrito2",name:"Distrito 2"},
    {index:"distrito3",name:"Distrito 3"},
    {index:"distrito4",name:"Distrito 4"},
    {index:"distrito5",name:"Distrito 5"},
    {index:"paleto",name:"Paleto Bay"},
]

function openslisthousesadmin(){
    $(".boxadminscheduling").hide()
    $(".boxadminregisterhouse").hide()
    $(".boxadminhouseslist").show()
    $(".propEditList").html(`
        <tr>
            <th>Nome da casa</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Remover imovel</th>
        </tr>
    `)
    distritos.map((data) => {
        if (realtorList[0]['property'][data.index]) {
            realtorList[0]['property'][data.index].map((element,index) => {
                if (element && element.name) {
                    $(".propEditList").append(`
                        <tr>
                            <td>${element.name}</td>
                            <td>${data.name}</td>
                            <td>$${element.price}</td>
                            <td><img onclick="propRemove('${data.index}',${index})" src="imgs/negative.png" alt=""></td>
                        </tr>
                        `)
                }
            }).join('')
        }
    }).join('')
    
}

function showProperty(name){
    $(".housesList").html(`
        <h2>Disponiveis</h2>
    `)
    if (realtorList[0]['property'][name]) {
        realtorList[0]['property'][name].map((element) => {
            if (element && element.name) {
                $(".housesList").append(`
                <li>
                    <img src="${element.image}" alt="">
                    <div class="infos">
                    <h1>${element.name}</h1>
                    <div class="value">$${element.price}</div> </div>
                </li>
                `)
            }
        }).join('')
    }
}

function propRemove(name,index){
    $(".housesList").html(`
        <h2>Disponiveis</h2>
    `)
    realtorList[0]['property'][name][index] = null
    sendData("propRemove", {name:name,index:index});
}
function removeRealtor(index){
    realtorList[0]['scheduling'][index] = null
    sendData("removeRealtor", {index:index});
}

function registerProp(){
    if (realtorList[0]['perms'] && realtorList[0]['perms']['normal'][myID]){
        sendData("setProperty", {name:$(`.propName`).val(),price:$(`.propPrice`).val(),image:$(`.propImage`).val(),category:$(`.propCategory`).val()});
    }
}

function showResp(index) {
    $(".response").show()
    // restResp('${index}')
    $(`.repostinha2`).attr("onclick",`restResp('${index}')`)
    $(`.repostinha2`).attr("value",`Responder`)
}
function showWarn(index) {
    $(".response").show()
    // restResp('${index}')
    $(`.repostinha2`).attr("onclick",`warningUser(${index})`)
    $(`.repostinha2`).attr("value",`Aviso`)
}

function restResp(index){
    $(".response").hide()
    sendData("restResp", {rest:restaurantlist[currentRest]['name'],id:index,resp:$(`.respostinha`).val()});
}

function realtorSched(){
    sendData("realtorSched", {name:$(`.realtName`).val(),passport:$(`.realtPass`).val(),phone:$(`.realtPhone`).val(),district:$(`.realtDist`).val(),home:$(`.realtHome`).val(),hour:$(`.realtHour`).val()});
}
