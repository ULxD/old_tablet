var dealershipList = []
var myID = 0

function closedealerall(){
    $('#dealer-main').hide()
    $('#cars').hide()
    $('#cycles').hide()
    $('#truck').hide()
    $('#rent').hide()
    $(".dealership").hide()
}


function dealershipclose(){
    closeAll()
    closedealerall()
    $(".home").show()
}

function dealershipopen(){
    closeAll()
    $(".dealership").show()
    $('#dealer-main').show()
}

function dealerhome(){
    closedealerall()
    $(".dealership").show()
    $('#dealer-main').show()
}



function listcaropen(){
    closedealerall()
    $(".dealership").show()
    $('#cars').show(200)
    $(".carsList").html('')
    if (dealershipList['carros'] && dealershipList['carros']['compacts']) {
        dealershipList['carros']['compacts'].map((element) => {
            if (element && element.name) {
                
                $(".carsList").append(`
                <li>
                    <img src="${`http://131.196.198.119:3554/images/tablet/concessionaria/${element.index}_css.jpg`}" alt="">
                    <h3>${element.name}</h3>
                    <div class="infos">
                        <h4>$${element.price}</h4>
                        <h4>Estoque: ${element.stock}</h4>
                    </div>
                </li>
                `)
            }
        }).join('')
    }
}

/* function listcaropen(){
    closedealerall()
    $(".dealership").show()
    $('#cars').show(200)
    $(".carsList").html('')
    if (dealershipList['carros'] && dealershipList['carros']['compacts']) {
        dealershipList['carros']['compacts'].map((element) => {
            if (element && element.name) {
                $(".carsList").append(`
                <li>
                    <img src="${`http://131.196.198.119:3554/images/tablet/concessionaria/${element.name}_css.jpg`}" alt="">
                    <h3>${element.name}</h3>
                    <div class="infos">
                        <h4>$${element.price}</h4>
                        <h4>Estoque: ${element.stock}</h4>
                    </div>
                </li>
                `)
            }
        }).join('')
    }
} */

function carClass(carClass) {
    $(".carsList").html('')
    if (dealershipList['carros'] && dealershipList['carros'][carClass]) {
        const carsab = dealershipList['carros'][carClass].sort((a, b) => (a.name > b.name) ? 1 : -1)
        carsab.map((element) => {
            if (element && element.name) {
                $(".carsList").append(`
                <li>
                    <img src="${`http://131.196.198.119:3554/images/tablet/concessionaria/${element.index}_css.jpg`}" alt="">
                    <h3>${element.name}</h3>
                    <div class="infos">
                        <h4>$${element.price}</h4>
                        <h4>Estoque: ${element.stock}</h4>
                    </div>
                </li>
                `)
            }
        }).join('')
    }
}

function listcyclesopen(){
    closedealerall()
    $(".dealership").show()
    $('#cycles').show(200)
    $(".motosList").html('')
    if (dealershipList['motos']) {
        dealershipList['motos'].map((element) => {
            if (element && element.name) {
                $(".motosList").append(`
                <li>
                    <img src="${`http://131.196.198.119:3554/images/tablet/concessionaria/${element.index}_css.jpg`}" alt="">
                    <h3>${element.name}</h3>
                    <div class="infos">
                        <h4>$${element.price}</h4>
                        <h4>Estoque: ${element.stock}</h4>
                    </div>
                </li>
                `)
            }
        }).join('')
    }
}

function listtruckopen(){
    closedealerall()
    $(".dealership").show()
    $('#truck').show(200)
    $(".trucksList").html('')
    if (dealershipList['caminhoes']) {
        dealershipList['caminhoes'].map((element) => {
            if (element && element.name) {
                $(".trucksList").append(`
                <li>
                    <img src="${`http://131.196.198.119:3554/images/tablet/concessionaria/${element.index}_css.jpg`}" alt="">
                    <h3>${element.name}</h3>
                    <div class="infos">
                        <h4>$${element.price}</h4>
                        <h4>Estoque: ${element.stock}</h4>
                    </div>
                </li>
                `)
            }
        }).join('')
    }
}

function listrentopen(){
    closedealerall()
    $(".dealership").show()
    $('#rent').show(200)
}