
var restaurantlist = []
var cartItens = []
var currentRest = 0
var restStatus
var totalPrice = 0
var listItems = []
var cartList = {}
var quantVotes = -1
var myID = 0

var requestjson = fetch("config/ifood.json")
.then(response => response.json())
.then(data => {
    requestjson = data.restaurantes


    for (i = 0; i < data.restaurantes.length; i++) {
        restaurantlist.push(data.restaurantes[i])
    }
})

function foodopen() {
    $(".home").hide()
    $(".ifood").show()
    $(".mainpage_ifood").show()
    // $(".time").html(`${restaurantlist[5]['employees']['name']['index1']}`)

    
    const listrest = restaurantlist.sort((a, b) => (a.name > b.name) ? 1 : -1)
    listrest.map((element,index) => {
        $(".boxrestadd").append(`
        <li onclick="foodmenurest('${element.class}')" class="boxrestremove ${element.class}">
            <div class="logo"><img src="${`http://131.196.198.119:3554/images/tablet/logoempresas/${element.logoone}icone.png`}"alt=""></div>
            <div class="infos">
                <h1>${element.name}</h1>
                <p>${element.type}</p>
                <div class="infosform">
                    <span>
                        <i class="fas fa-star">
                            <span2 class="amStars${index}">0.0</span2>
                        </i>
                        <span class="openclose open${index}" >Fechado</span>

                        <div class="icons">
                            <i class="fas in fa-utensils"></i>
                            <i class="fas in fa-beer"></i>
                            <i class="fas in fa-cookie"></i>
                            <i class="fab in fa-angellist"></i>
                            </div>
                    </span>
                </div>
            </div>
        </li>`)

        if (element['open'])
        {
            $(`.open${index}`).html(`<span>Aberto</span>`)
            $(`.open${index}`).css('color','72A32E')
        }
        if (element["voting"])
        {
            var valTeste = element["voting"]['totalStars']
            $(`.amStars${index}`).html(valTeste.toFixed(1))
        }
    }).join('')
}

function foodclose(){
    closeAll()
    $(".home").show()
}

function foodmainmenu() {
    closeAll()
    foodopen()
}

function foodmenurest(select) {
    closeAll()
    $(".mainpage_ifood").hide()
    $(".pagerest").show()
    cartItens = []
    cartList = {}
    
    const listrest = restaurantlist.sort((a, b) => (a.name > b.name) ? 1 : -1)
    listrest.map((element,index) => {

        if (element.class == select){
            var totStrs = 0
            var qntVts = 0
            if (element["voting"]) {
                totStrs = element["voting"]['totalStars']
                qntVts = element["voting"]['quantVotes']
            }
            currentRest = index
             $(".pagerest").append(`
            <div class="cardapioreset">
                <header>
                    <i onclick="foodmainmenu()" class="fas logoifoodxd fa-home"></i>
                    <img class="restbanner" onclick="foodmenurest('${select}')" src="${`http://131.196.198.119:3554/images/tablet/logoempresas/${element.logotwo}.png`}" alt="">
                    <i onclick="cartopen()" class="fas cart fa-shopping-cart"></i>
                    <i onclick="foodclose()" class="fas exitfood fa-sign-out-alt"></i>
                </header>
                <main class="titlerestaurantmain">
                    <img src="${`http://131.196.198.119:3554/images/tablet/logoempresas/${element.logoone}icone.png`}" alt="">
                    <div class="titlerest">
                        <h1>${element.name}</h1>
                        <div class="statusrest">
                            <span class="openclose open${currentRest}">Fechado</span>
                            <i class="fa${starReturn(totStrs,1)} fa-star"></i>
                            <i class="fa${starReturn(totStrs,2)} fa-star"></i>
                            <i class="fa${starReturn(totStrs,3)} fa-star"></i>
                            <i class="fa${starReturn(totStrs,4)} fa-star"></i>
                            <i class="fa${starReturn(totStrs,5)} fa-star"></i>
                            <p class="note notes${currentRest}">${totStrs}</p>
                            <p class="numbersavaibles">(${qntVts})</p>
                        </div>
                    </div>
                    <div class="options">
                        <div onclick="about()" class="aboutoption btn">Sobre</div>
                        <div onclick="stars('${element.class}')" class="avaibles btn ${element.class}">Avaliações</div>
                    </div>
                </main>

                <div class="menurest">
                    <h3>Salgados</h3>
                    <div class="comidas card"></div>
                    <h3>Doces</h3>
                    <div class="sobremesas card"></div>
                    <h3>Bebidas</h3>
                    <div class="bebidas card"></div>
                    <h3>Outros</h3>
                    <div class="outros card"></div>     
                </div>                                       
                
            `)
            if (element['open'])
            {
                $(`.open${index}`).html(`<span>Aberto</span>`)
                $(`.open${index}`).css('color','72A32E')
            }
            if(element['name']) {
                $(".envelope h2").html(element['name'])
            }
            const foodsab = element.foods.sort((a, b) => (a.name > b.name) ? 1 : -1)
            for (i=0; i<element.foods.length; i++){
                $(".comidas").append(`


                <div onclick="itempedido('${foodsab[i].pic}')" class="itemmenu ${foodsab[i].pic}">
                    <div class="leftbox">
                        <h1>${foodsab[i].name}</h1>
                        <p>${foodsab[i].desc}.</p>
                        <div class="price">$${foodsab[i].price}</div>
                    </div>
                    <img src="${`http://131.196.198.119:3554/images/vrp_itens/${element.foods[i].pic}.png`}" alt="">
                </div>
                `)
            }
            const drinksab = element.drinks.sort((a, b) => (a.name > b.name) ? 1 : -1)
            for (i=0; i<element.drinks.length; i++){
                $(".bebidas").append(`

                <div onclick="itempedido('${drinksab[i].pic}')" class="itemmenu ${drinksab[i].pic}">
                    <div class="leftbox">
                        <h1>${drinksab[i].name}</h1>
                        <p>${drinksab[i].desc}.</p>
                        <div class="price">$${drinksab[i].price}</div>
                    </div>
                    <img src="${`http://131.196.198.119:3554/images/vrp_itens/${element.drinks[i].pic}.png`}" alt="">
                </div>
                `)
            }

            const candyab = element.candy.sort((a, b) => (a.name > b.name) ? 1 : -1)
            for (i=0; i<element.candy.length; i++){
                $(".sobremesas").append(`

                <div onclick="itempedido('${candyab[i].pic}')" class="itemmenu ${candyab[i].pic}">
                    <div class="leftbox">
                        <h1>${candyab[i].name}</h1>
                        <p>${candyab[i].desc}.</p>
                        <div class="price">$${candyab[i].price}</div>
                    </div>
                    <img src="${`http://131.196.198.119:3554/images/vrp_itens/${element.candy[i].pic}.png`}" alt="">
                </div>
                `)
            }
            if (element.others) {
                const othersab = element.others.sort((a, b) => (a.name > b.name) ? 1 : -1)
                for (i=0; i<element.others.length; i++){
                    $(".outros").append(`
    
                    <div onclick="itempedido('${othersab[i].pic}')" class="itemmenu ${othersab[i].pic}">
                        <div class="leftbox">
                            <h1>${othersab[i].name}</h1>
                            <p>${othersab[i].desc}.</p>
                            <div class="price">$${othersab[i].price}</div>
                        </div>
                        <img src="${`http://131.196.198.119:3554/images/vrp_itens/${element.others[i].pic}.png`}" alt="">
                    </div>
                    `)
                }
            }
            
        } //FIM DO IF
    }).join('') //FIM LISTREST
} //FIM FOODMENUREST


function starReturn(amount,current){
    if (amount) {
        if (current <= amount) {
            return "s"
        }
    }
    return "r"
}

function stars(option){
    $('.boxifood').hide()
    $(".titlerestaurantmain").hide()
    $(".menurest").hide()
    $(".avaiblespage").show()
    let totalStars = 0
    let amountVotes = 0
    if(restaurantlist[currentRest]["voting"]){
        totalStars = restaurantlist[currentRest]["voting"]['totalStars']
        amountVotes = restaurantlist[currentRest]["voting"]['quantVotes']
    }
    restaurantlist.map((element) => {
        if(element.class == option){
            quantVotes = -1
            $(".avaiblespage").append(`
                        <div class="boxaval">
                            <h1>Avaliações da loja</h1>
                            <h2>${element.name}</h2>
                            <span class="notaavaliacoes">${totalStars.toFixed(1)}(${amountVotes})</span>
                            <div class="stars-collection">
                                <i class="fas fa-star voteOne" onclick="increaseStar(1)"></i>
                                <i class="fas fa-star voteTwo" onclick="increaseStar(2)"></i>
                                <i class="fas fa-star voteThree" onclick="increaseStar(3)"></i>
                                <i class="fas fa-star voteFour" onclick="increaseStar(4)"></i>
                                <i class="far fa-star voteFive" onclick="increaseStar(5)"></i>
                            </div>    
                            <div class="avaiblebox">
                            <input type="text" class="form-control avalMess" id="inputEmail4" placeholder="Sua avaliação">
                            <button type="submit" class="btn btn-primary" onclick="voteRest()">Avaliar</button>
                            </div>
                            <div class="notes">
                            </div>  
                        </div>
                `)
           }  
    }).join('')
    $(".notes").html('')
    if (restaurantlist[currentRest]["voting"]) {
        restaurantlist[currentRest]["voting"]['votes'].map((element) => {
            $(".notes").append(`
                <div class="notareal">
                    <h1>${element.name}</h1>
                    <h3>${element.num}<span class="notafinal stars${element.num}"><i class="fa${starReturn(element.num,1)} fa-star"></i><i class="fa${starReturn(element.num,2)} fa-star"></i><i class="fa${starReturn(element.num,3)} fa-star"></i><i class="fa${starReturn(element.num,4)} fa-star"></i><i class="fa${starReturn(element.num,5)} fa-star"></i> </span> <span>${element.date}</span></h3>
                    <p>${element.message}</p>
                </div>
            `)          
            if(element['resp']) {
                $(".notes").append(`
                <div class="restaurant-response">
                    <h4>Resposta do restaurante</h4>
                    <p>${element['resp']}</p>
                </div>
                `)   
            }
        }).join('')
    }
}

function increaseStar(quant){
    if (quant == 1) {
        $(".stars-collection").html(`
        <i class="fas fa-star voteOne" onclick="increaseStar(1)"></i>
        <i class="far fa-star voteTwo" onclick="increaseStar(2)"></i>
        <i class="far fa-star voteThree" onclick="increaseStar(3)"></i>
        <i class="far fa-star voteFour" onclick="increaseStar(4)"></i>
        <i class="far fa-star voteFive" onclick="increaseStar(5)"></i>
        `)
    }else if (quant == 2) {
        $(".stars-collection").html(`
            <i class="fas fa-star voteOne" onclick="increaseStar(1)"></i>
            <i class="fas fa-star voteTwo" onclick="increaseStar(2)"></i>
            <i class="far fa-star voteThree" onclick="increaseStar(3)"></i>
            <i class="far fa-star voteFour" onclick="increaseStar(4)"></i>
            <i class="far fa-star voteFive" onclick="increaseStar(5)"></i>
        `)
    }else if (quant == 3) {
        $(".stars-collection").html(`
        <i class="fas fa-star voteOne" onclick="increaseStar(1)"></i>
        <i class="fas fa-star voteTwo" onclick="increaseStar(2)"></i>
        <i class="fas fa-star voteThree" onclick="increaseStar(3)"></i>
        <i class="far fa-star voteFour" onclick="increaseStar(4)"></i>
        <i class="far fa-star voteFive" onclick="increaseStar(5)"></i>
    `)
    }else if (quant == 4) {
        $(".stars-collection").html(`
        <i class="fas fa-star voteOne" onclick="increaseStar(1)"></i>
        <i class="fas fa-star voteTwo" onclick="increaseStar(2)"></i>
        <i class="fas fa-star voteThree" onclick="increaseStar(3)"></i>
        <i class="fas fa-star voteFour" onclick="increaseStar(4)"></i>
        <i class="far fa-star voteFive" onclick="increaseStar(5)"></i>
    `)
    }else if (quant == 5) {
        $(".stars-collection").html(`
            <i class="fas fa-star voteOne" onclick="increaseStar(1)"></i>
            <i class="fas fa-star voteTwo" onclick="increaseStar(2)"></i>
            <i class="fas fa-star voteThree" onclick="increaseStar(3)"></i>
            <i class="fas fa-star voteFour" onclick="increaseStar(4)"></i>
            <i class="fas fa-star voteFive" onclick="increaseStar(5)"></i>
        `)
    }
    quantVotes = quant
}

function itempedido(select){
    $(".boxifood").show()
    $(".boxifood").css("display","flex")
    restaurantlist.map((element,index) => {
        if (index == currentRest) {
            if (element.foods) {
                const foodsab = element.foods.sort((a, b) => (a.name > b.name) ? 1 : -1)
                for (i=0; i<element.foods.length; i++){
                    if( foodsab[i].pic == select){
                        $(".boxifood").html(`
                                <div class="boxcontent">
                                    <div class="leftbox">
                                        <img src="${`http://131.196.198.119:3554/images/vrp_itens/${element.foods[i].pic}.png`}" alt="">
                                    </div>
                                    <div class="rightbox">
                                        <i onclick="closeitempedido()" class="fas fa-times"></i>
                                        <p>${foodsab[i].desc}</p>
                                        <div class="itemquantidade">
                                            <input type="number" value="1"  id="quantidade" name="quantidade" min="1" max="10">
                                            <button onclick="cartlist('${select}','foods',${i})" type="submit"><i class="fas fa-shopping-cart"></i></button>
                                        </div>
                                    </div>
                                <div>
                           
                        `)
                        }
                    }    
            }
            
            if (element.drinks) {
                const drinksab = element.drinks.sort((a, b) => (a.name > b.name) ? 1 : -1)
                for (i=0; i<element.drinks.length; i++){
                    if( drinksab[i].pic == select){
                        $(".boxifood").html(`
                                <div class="boxcontent">
                                    <div class="leftbox">
                                        <img src="${`http://131.196.198.119:3554/images/vrp_itens/${element.drinks[i].pic}.png`}" alt="">
                                    </div>
                                    <div class="rightbox">
                                        <i onclick="closeitempedido()" class="fas fa-times"></i>
                                        <p>${drinksab[i].desc}</p>
                                        <div class="itemquantidade">
                                            <input type="number" value="1"  id="quantidade" name="quantidade" min="1" max="10">
                                            <button onclick="cartlist('${select}','drinks',${i})" type="submit"><i class="fas fa-shopping-cart"></i></button>
                                        </div>
                                    </div>
                                <div>
                           
                        `)
                        }
                }  
            }
    
            if (element.candy) {
               const candyab = element.candy.sort((a, b) => (a.name > b.name) ? 1 : -1)
               for (i=0; i<element.candy.length; i++){
                   if( candyab[i].pic == select){
                        $(".boxifood").html(`
                        <div class="boxcontent">
                            <div class="leftbox">
                                <img src="${`http://131.196.198.119:3554/images/vrp_itens/${element.candy[i].pic}.png`}" alt="">
                            </div>
                            <div class="rightbox">
                                <i onclick="closeitempedido()" class="fas fa-times"></i>
                                <p>${candyab[i].desc}</p>
                                <div class="itemquantidade">
                                    <input type="number" value="1"  id="quantidade" name="quantidade" min="1" max="10">
                                    <button onclick="cartlist('${select}','candy',${i})" type="submit"><i class="fas fa-shopping-cart"></i></button>
                                </div>
                            </div>
                        <div>
                   
                `)
                       }
                  }  
                }
    
                if (element.others) {
                    const othersab = element.others.sort((a, b) => (a.name > b.name) ? 1 : -1)
                    for (i=0; i<element.others.length; i++){
                        if( othersab[i].pic == select){
                             $(".boxifood").html(`
                                <div class="boxcontent">
                                    <div class="leftbox">
                                        <img src="${`http://131.196.198.119:3554/images/vrp_itens/${element.others[i].pic}.png`}" alt="">
                                    </div>
                                    <div class="rightbox">
                                        <i onclick="closeitempedido()" class="fas fa-times"></i>
                                        <p>${othersab[i].desc}</p>
                                        <div class="itemquantidade">
                                            <input type="number" value="1"  id="quantidade" name="quantidade" min="1" max="10">
                                            <button onclick="cartlist('${select}','others',${i})" type="submit"><i class="fas fa-shopping-cart"></i></button>
                                        </div>
                                    </div>
                                <div>
                           
                        `)
                            }
                       }  
                     }
        }
        

    }).join('')

}

function cartlist(item,clss,id){
    if (restaurantlist[currentRest]['open']) {  
        $(".boxifood").hide(500)
        item = String(item)
        if (!cartItens[clss]) {
            cartItens[clss] = [[item]]
            cartItens[clss][item] = {quant:Number($('#quantidade').val()),id:id}
        } else {
            if (!cartItens[clss][item]){
                cartItens[clss].push([item])
                cartItens[clss][item] = {quant:Number($('#quantidade').val()),id:id}
            } else { 
                cartItens[clss][item].quant = cartItens[clss][item].quant + Number($('#quantidade').val())
            }
        }
        if (!cartList[clss]) {
            cartList[clss] = {}
            cartList[clss][item] = {quant:Number($('#quantidade').val()),id:id}
        } else {
            if (!cartList[clss][item]){
                cartList[clss][item] = {quant:Number($('#quantidade').val()),id:id}
            } else { 
                cartList[clss][item].quant = cartList[clss][item].quant + Number($('#quantidade').val())
            }
        }
    }
}

function closeitempedido(){
    $("boxifood").removeClass("animate__fadeIn")
    $("boxifood").addClass("animate__fadeOut")
    setTimeout(() => {
        $(".boxifood").hide()
        $(".boxcontent").remove()
    }, 200);
}

function cartopen(){
    $('.boxifood').hide()
    $(".titlerestaurantmain").hide()
    $(".titlerestaurantmain").hide()
    $(".pagerest header .fas").css("background-color","#F68825")
    $(".pagerest header .fa-shopping-cart").css("background-color","#F8E6D7")
    $(".pagerest header .fa-shopping-cart").css("color","#F68825")
    $(".pagerest header").css("background-color","#BA5B27")
    $(".menurest").hide()
    $(".avaiblespage").hide()
    $(".about").hide()
    $(".cartifood").show()
    $(".restName").html(`${restaurantlist[currentRest].name}`)
    totalPrice = 0
    listItems['foods'] = {}

    if (cartItens['foods']) {
        $(".foodsList").html('<h3>Salgados</h3>')
        for (i=0; i<cartItens['foods'].length; i++){

            $(".foodsList").append(`
                <div class="item"> <span class="quantidade">${cartItens['foods'][cartItens['foods'][i]].quant}x</span> <p class="itemname">${restaurantlist[currentRest]['foods'][Number(cartItens['foods'][cartItens['foods'][i]].id)].name}</p> <span class="itemprice">$${Number(restaurantlist[currentRest]['foods'][Number(cartItens['foods'][cartItens['foods'][i]].id)].price*cartItens['foods'][cartItens['foods'][i]].quant).toFixed(1)}</span></div>
            `)
            totalPrice = totalPrice + Number(restaurantlist[currentRest]['foods'][Number(cartItens['foods'][cartItens['foods'][i]].id)].price*cartItens['foods'][cartItens['foods'][i]].quant)
        }
    }else{
        $(".foodsList").html('<h3>Salgados</h3>')
    }

    if (cartItens['drinks']) {
        $(".drinkList").html('<h3>Bebidas</h3>')
        for (i=0; i<cartItens['drinks'].length; i++){
            $(".drinkList").append(`
            <div class="item"> <span class="quantidade">${cartItens['drinks'][cartItens['drinks'][i]].quant}x</span> <p class="itemname">${restaurantlist[currentRest]['drinks'][Number(cartItens['drinks'][cartItens['drinks'][i]].id)].name}</p> <span class="itemprice">$${Number(restaurantlist[currentRest]['drinks'][Number(cartItens['drinks'][cartItens['drinks'][i]].id)].price*cartItens['drinks'][cartItens['drinks'][i]].quant).toFixed(1)}</span></div>
            `)
            totalPrice = totalPrice + Number(restaurantlist[currentRest]['drinks'][Number(cartItens['drinks'][cartItens['drinks'][i]].id)].price*cartItens['drinks'][cartItens['drinks'][i]].quant)
        }
    }else{
        $(".drinkList").html('<h3>Bebidas</h3>')
    }

    if (cartItens['candy']) {
        $(".candyList").html('<h3>Doces</h3>')
        for (i=0; i<cartItens['candy'].length; i++){
            $(".candyList").append(`
            <div class="item"> <span class="quantidade">${cartItens['candy'][cartItens['candy'][i]].quant}x</span> <p class="itemname">${restaurantlist[currentRest]['candy'][Number(cartItens['candy'][cartItens['candy'][i]].id)].name}</p> <span class="itemprice">$${Number(restaurantlist[currentRest]['candy'][Number(cartItens['candy'][cartItens['candy'][i]].id)].price*cartItens['candy'][cartItens['candy'][i]].quant).toFixed(1)}</span></div>
            `)
            totalPrice = totalPrice + Number(restaurantlist[currentRest]['candy'][Number(cartItens['candy'][cartItens['candy'][i]].id)].price*cartItens['candy'][cartItens['candy'][i]].quant)
        }
    }else{
        $(".candyList").html('<h3>Doces</h3>')
    }

    if (cartItens['others']) {
        $(".othersList").html('<h3>Outros</h3>')
        for (i=0; i<cartItens['others'].length; i++){
            $(".othersList").append(`
            <div class="item"> <span class="quantidade">${cartItens['others'][cartItens['others'][i]].quant}x</span> <p class="itemname">${restaurantlist[currentRest]['others'][Number(cartItens['others'][cartItens['others'][i]].id)].name}</p> <span class="itemprice">$${Number(restaurantlist[currentRest]['others'][Number(cartItens['others'][cartItens['others'][i]].id)].price*cartItens['others'][cartItens['others'][i]].quant).toFixed(1)}</span></div>
            `)
            totalPrice = totalPrice + Number(restaurantlist[currentRest]['others'][Number(cartItens['others'][cartItens['others'][i]].id)].price*cartItens['others'][cartItens['others'][i]].quant)
        }
    }else{
        $(".othersList").html('<h3>Outros</h3>')
    }
    
    $(".totalprice").html(`Total:<span class="greendiner">$${totalPrice}</span>`)
}

function about(){
    $('.boxifood').hide()
    $(".titlerestaurantmain").hide()
    $(".menurest").hide()
    $(".about").show()
        
    $(`.imgloc`).css("background-image",`url(http://131.196.198.119:3554/images/tablet/logoempresas/${restaurantlist[currentRest]['logoloc']}.png)`)
    $(`.restTitle`).html(`${restaurantlist[currentRest]['name']}`)
    $(`.boxtext`).html(`<p>${restaurantlist[currentRest]['description']}</p>`)
    $(`.boxbackground`).css('background-image',`url(http://131.196.198.119:3554/images/tablet/restaurants/bkgabout/${restaurantlist[currentRest]['backgroundabout']}.png)`)
    if (restaurantlist[currentRest]['employees']) {
        for (i=1; i<3; i++){
            if (restaurantlist[currentRest]['employees']['name'][`index${i}`])
            {
                $(`.index${i}name`).html(`${restaurantlist[currentRest]['employees']['name'][`index${i}`]}`)
            } else {
                $(`.index${i}name`).html(`Indefinido`)
            }
            if (restaurantlist[currentRest]['employees']['url'][`index${i}`])
            {
                $(`.index${i}url`).attr("src", `${restaurantlist[currentRest]['employees']['url'][`index${i}`]}`)
            } else {
                $(`.index${i}url`).attr("src", "imgs/ifood/user.png")
            }
            if (restaurantlist[currentRest]['employees']['email'][`index${i}`])
            {
                $(`.index${i}email`).html(`@${restaurantlist[currentRest]['employees']['email'][`index${i}`]}`)
            } else {
                $(`.index${i}email`).html(`Indefinido`)
            }
        }
    }
}

function finalizarPedido(){
    if (restaurantlist[currentRest]['open']) { 
        var noidea = "Entrega"
        if( $(".chretirada").is(":checked")){
            noidea = "Retirada"
        }
        sendData("finalizarPedido", {cart:cartList,total:totalPrice,rest:restaurantlist[currentRest]['name'],noidea:noidea});
        cartItens = []
        cartList = {}
        $(".foodsList").html('<h3>Salgados</h3>')
        $(".candyList").html('<h3>Doces</h3>')
        $(".drinkList").html('<h3>Bebidas</h3>')
        $(".othersList").html('<h3>Outros</h3>')
        alert(noidea)
    } 
}

function setDestination(id){
    sendData("setDestination", {rest:restaurantlist[currentRest]['name'],coords:restaurantlist[currentRest]['pedidos'][id]['coords'],pedido:restaurantlist[currentRest]['pedidos'][id],id:id});
}
function isReady(id){
    sendData("isReady", {rest:restaurantlist[currentRest]['name'],coords:restaurantlist[currentRest]['pedidos'][id]['coords'],pedido:restaurantlist[currentRest]['pedidos'][id],id:id});
}
function markChecked(id){
    sendData("markChecked", {rest:restaurantlist[currentRest]['name'],id:id});
    $(`.checkMark${id}`).html(`
   <i class="fas fa-check"></i>
    `)
}
function setPerfil(id){
    if (restaurantlist[currentRest]['isleader'][myID]){
        sendData("setProfile", {rest:restaurantlist[currentRest]['name'],id:id,name:$(`.form${id}name`).val(),url:$(`.form${id}url`).val(),email:$(`.form${id}email`).val()});
    }
}

function closeAdminPanelAll(){
    $(".adminbox").hide()
    $(".adminrequest").hide()
    $(".adminschedule").hide()
    $(".adminteam").hide()
    $(".adminprofile").hide()
    $(".adminavaibles").hide()
}

function menuadmrequest(){
    closeAdminPanelAll()
    $(".adminrequest").show(200)
    $(".pedidosContainer").html(``)
    if(restaurantlist[currentRest]['pedidos']){
        for (i=0; i< restaurantlist[currentRest]['pedidos'].length; i++){
            $(".pedidosContainer").append(`

                <div class="request-box">
                    <div class="request-box-flex">
                        <div class="request-box-block">
                            <h2>Informações</h2>
                            <h1>Nome: <span>${restaurantlist[currentRest]['pedidos'][i]['identity']['name']}</span></h1>
                            <h1>Telefone: <span>${restaurantlist[currentRest]['pedidos'][i]['identity']['phone']}</span> </h1>
                            <h1>Passaporte: <span>${restaurantlist[currentRest]['pedidos'][i]['identity']['passport']}</span> </h1>
                            <h1>Tipo: <span>${restaurantlist[currentRest]['pedidos'][i]['status']}</span> </h1>
                        </div>
                        <div class="request-box-block list pedido${i}">
                            
                            
                        </div>
                    </div>
                    <div class="finalbox">
                        <h2>Status do pedido</h2>
                        <div class="flex-buttons pedidoButtons${i}">
                            <div class="acept btn" onclick="setDestination(${i})">Aceitar Pedido</div>
                            <div class="decline btn">Recusar Pedido</div>
                            
                        </div>
                    </div>
                </div>
            `)
            // <div class="ready btn checkMark${i}" onclick="markChecked(${i})">O pedido está pronto</div>
            // <div class="checked btn">Pedido entregue</div>

            if (restaurantlist[currentRest]['pedidos'][i]['action'] === "accepted"){
            $(`.pedidoButtons${i}`).html(`
                <div class="ready btn" onclick="isReady(${i})">O pedido está pronto</div>
            `)
            }
            if (restaurantlist[currentRest]['pedidos'][i]['action'] === "ready"){
                $(`.pedidoButtons${i}`).html(`
                <div class="checked btn">Pedido entregue</div>
                `)
            }

            $(`.pedido${i}`).html('<h2>Pedido</h2>')
            if (restaurantlist[currentRest]['pedidos'][i]['foods']) {
                for (j=0; j< restaurantlist[currentRest]['pedidos'][i]['foods'].length; j++){
                    $(`.pedido${i}`).append(`
                    <div class="itemadd">
                        <div class="quantidade">${restaurantlist[currentRest]['pedidos'][i]['foods'][j]['quant']}x</div>
                        <div class="itemname">${restaurantlist[currentRest]['foods'][Number(restaurantlist[currentRest]['pedidos'][i]['foods'][j]['index'])].name}</div>
                        <div class="price">$${(restaurantlist[currentRest]['foods'][Number(restaurantlist[currentRest]['pedidos'][i]['foods'][j]['index'])].price * restaurantlist[currentRest]['pedidos'][i]['foods'][j]['quant'])}</div>

                    </div>
                `)
                }
            }
            if (restaurantlist[currentRest]['pedidos'][i]['drinks']) {
                for (j=0; j< restaurantlist[currentRest]['pedidos'][i]['drinks'].length; j++){
                    $(`.pedido${i}`).append(`
                    <div class="itemadd">
                        <div class="quantidade">${restaurantlist[currentRest]['pedidos'][i]['drinks'][j]['quant']}x</div>
                        <div class="itemname">${restaurantlist[currentRest]['drinks'][Number(restaurantlist[currentRest]['pedidos'][i]['drinks'][j]['index'])].name}</div>
                        <div class="price">$${(restaurantlist[currentRest]['drinks'][Number(restaurantlist[currentRest]['pedidos'][i]['drinks'][j]['index'])].price * restaurantlist[currentRest]['pedidos'][i]['drinks'][j]['quant'])}</div>
                    </div>
                `)
                }
            }
            if (restaurantlist[currentRest]['pedidos'][i]['candy']) {
                for (j=0; j< restaurantlist[currentRest]['pedidos'][i]['candy'].length; j++){
                    $(`.pedido${i}`).append(`
                    <div class="itemadd">
                        <div class="quantidade">${restaurantlist[currentRest]['pedidos'][i]['candy'][j]['quant']}x</div>
                        <div class="itemname">${restaurantlist[currentRest]['candy'][Number(restaurantlist[currentRest]['pedidos'][i]['candy'][j]['index'])].name}</div>
                        <div class="price">$${(restaurantlist[currentRest]['candy'][Number(restaurantlist[currentRest]['pedidos'][i]['candy'][j]['index'])].price * restaurantlist[currentRest]['pedidos'][i]['candy'][j]['quant'])}</div>

                    </div>
                `)
                }
            }
            if (restaurantlist[currentRest]['pedidos'][i]['others']) {
                for (j=0; j< restaurantlist[currentRest]['pedidos'][i]['others'].length; j++){
                    $(`.pedido${i}`).append(`
                    <div class="itemadd">
                        <div class="quantidade">${restaurantlist[currentRest]['pedidos'][i]['others'][j]['quant']}x</div>
                        <div class="itemname">${restaurantlist[currentRest]['others'][Number(restaurantlist[currentRest]['pedidos'][i]['others'][j]['index'])].name}</div>
                        <div class="price">$${(restaurantlist[currentRest]['others'][Number(restaurantlist[currentRest]['pedidos'][i]['others'][j]['index'])].price * restaurantlist[currentRest]['pedidos'][i]['others'][j]['quant'])}</div>

                    </div>
                `)
                }
            }
        }
    }
}

function menuadmschedule(){
    closeAdminPanelAll()
    $(".adminschedule").show(200)
    $(".schedule-box ul").html(``)
    if(restaurantlist[currentRest]['scheduling']){
        for (i=0; i< restaurantlist[currentRest]['scheduling'].length; i++){
            if (!restaurantlist[currentRest]['scheduling'][i].schedStatus || restaurantlist[currentRest]['scheduling'][i].schedStatus !== 'deleted') {
                $(".schedule-box ul").append(`
                <li class="shed${i}">
                    <div class="left-box">
                        <div class="top-box">
                            <h1 class="name">Nome: <span>${restaurantlist[currentRest]['scheduling'][i].name}</span></h1>
                            <h1 class="passaport">Passaporte: <span>${restaurantlist[currentRest]['scheduling'][i].passport}</span></h1>
                            <h1 class="phone">Telefone: <span>${restaurantlist[currentRest]['scheduling'][i].phone}</span></h1>
                        </div>
                        <div class="bottom-box">
                            <h1>Informações de Agendamento</h1>
                            <h3 class="date">Data: <span>${restaurantlist[currentRest]['scheduling'][i].date}</span></h3>
                            <h3 class="time2">Horario: <span>${restaurantlist[currentRest]['scheduling'][i].hour}</span></h3>
                            <h3 class="type">Tipo de agendamento: <span>${restaurantlist[currentRest]['scheduling'][i].type}</span></h3>
                        </div>
                    </div>
                    <div class="right-box">
                        <button onclick="schedulingStatus('${i}','deleted')" class="decline">Recusar</button>
                        <button onclick="schedulingStatus('${i}','accept')" class="acept">Aceitar</button>
                    </div>
                </li>
                `)
                if (restaurantlist[currentRest]['scheduling'][i].schedStatus == 'accept') {
                    $(`.shed${i}`).css("background-color","#BDECB6")
                }
            }
        }
    }
}

function schedulingStatus(index,stats){
    sendData("schedulingStatus", {id:index,schedStatus:stats,rest:restaurantlist[currentRest]['name']});
}

function menuadmteam(){
    closeAdminPanelAll()
    $(".adminteam").show(200)
    $(".nonon").html(``)
    restaurantlist[currentRest]['emps'].map((element,index) => {
        $(".nonon").append(`
                <li>
                    <div class="top-box">
                        <img src="imgs/ifood/user.png" alt="">
                        <div class="infos">
                            <h2 class="name">Nome: <span>${element.name}</span></h2>
                            <h2 class="passaport">Passaporte: <span>${element.id}</span></h2>
                            <h2 class="role">Telefone: <span>${element.phone}</span></h2>
                        </div>
                    </div>
                    <div class="middle-box">
                        <ul class="allWarnings${index}">
                            
                        </ul>
                    </div>
                    <div class="bottom-box">
                        <div class="countdown-warning">
                            <h1>Avisos</h1>
                            <span class="warnLength${index}">0</span>
                        </div>
                        <div class="btn-section">
                            <button onclick="showWarn(${element.id})" class="warning">Aviso</button>
                            <button onclick="removeUser(${element.id})" class="decline">Demitir</button>
                        </div>
                    </div>
                </li>
            `)
            if( element['warnings'] ) {
                $(`.warnLength${index}`).html(element['warnings']['length'])
                element['warnings'].map((element,index2) => {
                    $(`.allWarnings${index}`).append(`
                        <li class="warning">
                            <h1>Aviso ${index2+1}</h1>
                            <p>${element['message']}</p>
                        </li>
                    `)
                }).join('')
            }
    }).join('')
}

function removeUser(uid){
    if (restaurantlist[currentRest]['isleader'][myID]){
        sendData("removeUser", {user_id:uid, rest:restaurantlist[currentRest]['name']});
    }
}
function warningUser(uid,message){
    $(".response").hide()
    sendData("warningUser", {user_id:uid, rest:restaurantlist[currentRest]['name'], message:$(`.respostinha`).val()});
}

function menuadmprofile(){
    closeAdminPanelAll()
    $(".adminprofile").show(200)
    
}

function menuadmavaibles(){
    closeAdminPanelAll()
    $(".adminavaibles").show(200)
    if (restaurantlist[currentRest]['isnormal'][myID]){
        // Lista de avaliações
        $(".avaible-box ul").html('')
        if (restaurantlist[currentRest]["voting"]) {
            restaurantlist[currentRest]["voting"]['votes'].map((element,index) => {
                $(".avaible-box ul").append(`

                <li>
                    <i class="far fa-user"></i>
                    <div class="infos">
                        <h1>${element.name}</h1>
                        <div class="section-infos">
                            <h3 class="note">${element.num}</h3>
                            <i class="fa${starReturn(element.num,1)} fa-star"></i><i class="fa${starReturn(element.num,2)} fa-star"></i><i class="fa${starReturn(element.num,3)} fa-star"></i><i class="fa${starReturn(element.num,4)} fa-star"></i><i class="fa${starReturn(element.num,5)} fa-star"></i>
                            <div class="date">${element.date}</div>
                        </div>
                        <p class="avaible-text">
                            ${element.message}
                        </p>
                    </div>
                    <i onclick="showResp('${index}')" class="fas fa-comment"></i>
                </li>
                `)          
            }).join('')
        }
    }
}

function menuadm(){
    console.log(currentRest,myID)
    console.log(restaurantlist[currentRest]['isnormal'][myID])
    if (restaurantlist[currentRest]['isnormal'][myID]){
        $(".about").hide(200)
        $(".adminpanel").show(200)
        $(".adminbox").show(200)
    } 
}

function scheduling(){
    sendData("setScheduling", {type:$(".agendType").val(),phone:$(".agendTel").val(),hour:$(".agendHour").val(),date:$(".agendDate").val(),passport:$(".agendPassport").val(),name:$(".agendName").val(),rest:restaurantlist[currentRest]['name']});
    $(".agendType").val('')
    $(".agendTel").val('')
    $(".agendHour").val('')
    $(".agendDate").val('')
    $(".agendPassport").val('')
    $(".agendName").val('')
}

function voteRest(){
    sendData("restVote", {rest:restaurantlist[currentRest]['name'],message:$(".avalMess").val(),num:quantVotes,curDate:dia+'/'+(mes+1) +'/'+ano4});
}