var booksList = []
var penalcodeList = []



var requestBooks = fetch("config/books.json")
.then(response => response.json())
.then(data => {
    requestBooks = data.books


    for (i = 0; i < data.books.length; i++) {
        booksList.push(data.books[i])
    }
})

var requestPenalCode = fetch("config/penalcode.json")
.then(response => response.json())
.then(data => {
    requestPenalCode = data.penalcode


    for (i = 0; i < data.penalcode.length; i++) {
        penalcodeList.push(data.penalcode[i])
    }
})


function LongBookClose(){
    closeAll()
    $(".lib-section-page-book").remove()
    $(".swiper-slide").remove()
    $(".home").show()
}

function LongBookOpen(){
    
    closeAll()

    $(".longbooks").show()

    let SecOne = booksList[0].SectionOne

    for(i = 0; i < 3; i++){
        $("#section-one-books").append(`
        <li class="lib-section-page-book">
            <img onclick="BookRead(${SecOne[i].id})" src="${SecOne[i].imgurl}" alt="">
        </li>
                    `)
    }

    let SecTwo = booksList[0].SectionTwo 

    for(i = 0; i < 3; i++){
        $("#section-two-books").append(`
        <li class="lib-section-page-book">
            <img onclick="BookRead(${SecTwo[i].id})" src="${SecTwo[i].imgurl}" alt="">
        </li>
                    `)
    }

}

function BookRead(id){
    $(".home-books").css("opacity","1")
    $(".lib").hide(200)
    $(".book").show(200)
    $(".book").css("display","flex")

    let SecOne = booksList[0].SectionOne
    let SecTwo = booksList[0].SectionTwo 


    for(i=0; i < 3; i++){


        if ( id === SecOne[i].id){
            $(".book-border").css("background-color",`${SecOne[i].bcolor}`)

            $(".swiper-wrapper").append(` 
            <div class="swiper-slide book-page-first">
                <h1>${SecOne[i].page[0].title}</h1>
                <p class="book-page-content">${SecOne[i].page[0].description}</p>
            </div>
           
            `)
            
            if (i == 0){
                
                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    
                    
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    
                    <p class="book-page-content">Aqui você encontrará todo o conteúdo referente às leis regentes na cidade de Long Beach. Um cidadão informado é um cidadão consciente.</p>
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    
                    <h1>Crimes contra a ordem pública</h1>
                    <div class="table table-1">
                        <div class="table-tr-main">
                            
                            <div class="table-td-main crime">Crime</div>
                            <div class="table-td-main ticket-t">Multa</div>
                            <div class="table-td-main tipy">Pena</div>
                        </div>
                   </div>
                </div>
                `)

                for(j=0; j < 11; j++){
                    $(".table-1").append(`
                    <div class="table-tr">
                        
                        <div class="table-td crime">${penalcodeList[j].crime}</div>
                        <div class="table-td ticket-t">${penalcodeList[j].multa}</div>
                        <div class="table-td tipy">${penalcodeList[j].pena}</div>
                    </div>
                    `)
                }

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                        <h1>Crimes contra pessoa</h1>
                        <div class="table table-2">
                            <div class="table-tr-main">
                                <div class="table-td-main crime">Crime</div>
                                <div class="table-td-main ticket-t">Multa</div>
                                <div class="table-td-main tipy">Pena</div>
                            </div>
                        </div>
                </div>
                `)  
                
                for(j=11; j < 22; j++){
                    $(".table-2").append(`
                    <div class="table-tr">
                        <div class="table-td crime">${penalcodeList[j].crime}</div>
                        <div class="table-td ticket-t">${penalcodeList[j].multa}</div>
                        <div class="table-td tipy">${penalcodeList[j].pena}</div>
                    </div>
                    `)
                }       

               

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    <h1>Crimes contra pessoa</h1>
                    <div class="table table-3">
                        <div class="table-tr-main">
                            <div class="table-td-main crime">Crime</div>
                            <div class="table-td-main ticket-t">Multa</div>
                            <div class="table-td-main tipy">Pena</div>
                        </div>
                    </div>
                </div>
                `)

                for(j=22; j < 29; j++){
                    $(".table-3").append(`
                    
                    <div class="table-tr">
                        
                        <div class="table-td crime">${penalcodeList[j].crime}</div>
                        <div class="table-td ticket-t">${penalcodeList[j].multa}</div>
                        <div class="table-td tipy">${penalcodeList[j].pena}</div>
                    </div>
                    `)
                }     


                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    <h1>Trafico e Porte ilegal</h1>
                    <div class="table table-4">
                        <div class="table-tr-main">
                            <div class="table-td-main crime">Crime</div>
                            <div class="table-td-main ticket-t">Multa</div>
                            <div class="table-td-main tipy">Pena</div>
                        </div>
                    </div>
                </div>
                `)

                for(j=29; j < 38; j++){
                    $(".table-4").append(`
                    
                    <div class="table-tr">
                        <div class="table-td crime">${penalcodeList[j].crime}</div>
                        <div class="table-td ticket-t">${penalcodeList[j].multa}</div>
                        <div class="table-td tipy">${penalcodeList[j].pena}</div>
                    </div>
                    `)
                }  
                
                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    <h1>Itens ilegais</h1>
                    <div class="table table-5">
                        <div class="table-tr-main">
                            <div class="table-td-main crime">Crime</div>
                            <div class="table-td-main ticket-t">Multa</div>
                            <div class="table-td-main tipy">Pena</div>
                        </div>
                    </div>
                </div>
                `)

                for(j=38; j < 47; j++){
                    $(".table-5").append(`
                    
                    <div class="table-tr">
                        <div class="table-td crime">${penalcodeList[j].crime}</div>
                        <div class="table-td ticket-t">${penalcodeList[j].multa}</div>
                        <div class="table-td tipy">${penalcodeList[j].pena}</div>
                    </div>
                    `)
                }  

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    <h1>Itens ilegais</h1>
                    <div class="table table-6">
                        <div class="table-tr-main">
                            <div class="table-td-main crime">Crime</div>
                            <div class="table-td-main ticket-t">Multa</div>
                            <div class="table-td-main tipy">Pena</div>
                        </div>
                    </div>
                    <h1>Infrações de Trânsito</h1>
                    <div class="table table-7">
                        <div class="table-tr-main">
                            <div class="table-td-main crime">Crime</div>
                            <div class="table-td-main ticket-t">Multa</div>
                            <div class="table-td-main tipy">Pena</div>
                        </div>
                    </div>
                </div>
                `)

                for(j=47; j < 49; j++){
                    $(".table-6").append(`
                    
                    <div class="table-tr">
                        <div class="table-td crime">${penalcodeList[j].crime}</div>
                        <div class="table-td ticket-t">${penalcodeList[j].multa}</div>
                        <div class="table-td tipy">${penalcodeList[j].pena}</div>
                    </div>
                    `)
                }

                for(j= 49; j < 52; j++){
                    $(".table-7").append(`
                    
                    <div class="table-tr">
                        <div class="table-td crime">${penalcodeList[j].crime}</div>
                        <div class="table-td ticket-t">${penalcodeList[j].multa}</div>
                        <div class="table-td tipy">${penalcodeList[j].pena}</div>
                    </div>
                    `)
                }
                
                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    <h1>Infrações de Trânsito</h1>
                    <div class="table table-8">
                        <div class="table-tr-main">
                            <div class="table-td-main crime">Crime</div>
                            <div class="table-td-main ticket-t">Multa</div>
                            <div class="table-td-main tipy">Pena</div>
                        </div>
                    </div>
                </div>
                `)

                for(j= 52; j < 59; j++){
                    $(".table-8").append(`
                    
                    <div class="table-tr">
                        <div class="table-td crime">${penalcodeList[j].crime}</div>
                        <div class="table-td ticket-t">${penalcodeList[j].multa}</div>
                        <div class="table-td tipy">${penalcodeList[j].pena}</div>
                    </div>
                    `)
                }

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    <h1>Infrações de Trânsito</h1>
                    <div class="table table-9">
                        <div class="table-tr-main">
                            <div class="table-td-main crime">Crime</div>
                            <div class="table-td-main ticket-t">Multa</div>
                            <div class="table-td-main tipy">Pena</div>
                        </div>
                    </div>
                </div>
                `)

                for(j= 59; j < 68; j++){
                    $(".table-9").append(`
                    
                    <div class="table-tr">
                        <div class="table-td crime">${penalcodeList[j].crime}</div>
                        <div class="table-td ticket-t">${penalcodeList[j].multa}</div>
                        <div class="table-td tipy">${penalcodeList[j].pena}</div>
                    </div>
                    `)
                }

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    <h1>Crimes contra o patrimônio</h1>
                    <div class="table table-10">
                        <div class="table-tr-main">
                            <div class="table-td-main crime">Crime</div>
                            <div class="table-td-main ticket-t">Multa</div>
                            <div class="table-td-main tipy">Pena</div>
                        </div>
                    </div>
                </div>
                `)

                for(j= 68; j < 73; j++){
                    $(".table-10").append(`
                    
                    <div class="table-tr">
                        <div class="table-td crime">${penalcodeList[j].crime}</div>
                        <div class="table-td ticket-t">${penalcodeList[j].multa}</div>
                        <div class="table-td tipy">${penalcodeList[j].pena}</div>
                    </div>
                    `)
                }

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    <h1>Crimes de Ações pré-prog</h1>
                    <div class="table table-11">
                        <div class="table-tr-main">
                            <div class="table-td-main crime">Crime</div>
                            <div class="table-td-main ticket-t">Multa</div>
                            <div class="table-td-main tipy">Pena</div>
                        </div>
                    </div>
                </div>
                `)

                for(j= 73; j < 80; j++){
                    $(".table-11").append(`
                    
                    <div class="table-tr">
                        <div class="table-td crime">${penalcodeList[j].crime}</div>
                        <div class="table-td ticket-t">${penalcodeList[j].multa}</div>
                        <div class="table-td tipy">${penalcodeList[j].pena}</div>
                    </div>
                    `)
                }

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    <h1>Crimes de Ações pré-prog</h1>
                    <div class="table table-12">
                        <div class="table-tr-main">
                            <div class="table-td-main crime">Crime</div>
                            <div class="table-td-main ticket-t">Multa</div>
                            <div class="table-td-main tipy">Pena</div>
                        </div>
                    </div>
                </div>
                `)

                for(j= 80; j < 86; j++){
                    $(".table-12").append(`
                    
                    <div class="table-tr">
                        <div class="table-td crime">${penalcodeList[j].crime}</div>
                        <div class="table-td ticket-t">${penalcodeList[j].multa}</div>
                        <div class="table-td tipy">${penalcodeList[j].pena}</div>
                    </div>
                    `)
                }

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    <h1>Crimes de Ações pré-prog</h1>
                    <div class="table table-13">
                        <div class="table-tr-main">
                            <div class="table-td-main crime">Crime</div>
                            <div class="table-td-main ticket-t">Multa</div>
                            <div class="table-td-main tipy">Pena</div>
                        </div>
                    </div>
                </div>
                `)

                for(j= 86; j < 92; j++){
                    $(".table-13").append(`
                    
                    <div class="table-tr">
                        <div class="table-td crime">${penalcodeList[j].crime}</div>
                        <div class="table-td ticket-t">${penalcodeList[j].multa}</div>
                        <div class="table-td tipy">${penalcodeList[j].pena}</div>
                    </div>
                    `)
                }

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    <h1>Crimes contra admnistração pub</h1>
                    <div class="table table-14">
                        <div class="table-tr-main">
                            <div class="table-td-main crime">Crime</div>
                            <div class="table-td-main ticket-t">Multa</div>
                            <div class="table-td-main tipy">Pena</div>
                        </div>
                    </div>
                </div>
                `)

                for(j= 92; j < 99; j++){
                    $(".table-14").append(`
                    
                    <div class="table-tr">
                        <div class="table-td crime">${penalcodeList[j].crime}</div>
                        <div class="table-td ticket-t">${penalcodeList[j].multa}</div>
                        <div class="table-td tipy">${penalcodeList[j].pena}</div>
                    </div>
                    `)
                }

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    <h1>Crimes contra admnistração p</h1>
                    <div class="table table-15">
                        <div class="table-tr-main">
                            <div class="table-td-main crime">Crime</div>
                            <div class="table-td-main ticket-t">Multa</div>
                            <div class="table-td-main tipy">Pena</div>
                        </div>
                    </div>
                </div>
                `)

                for(j= 99; j < 105; j++){
                    $(".table-15").append(`
                    
                    <div class="table-tr">
                        <div class="table-td crime">${penalcodeList[j].crime}</div>
                        <div class="table-td ticket-t">${penalcodeList[j].multa}</div>
                        <div class="table-td tipy">${penalcodeList[j].pena}</div>
                    </div>
                    `)
                }

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    <h1>Crimes contra patrimônio p</h1>
                    <div class="table table-16">
                        <div class="table-tr-main">
                            <div class="table-td-main crime">Crime</div>
                            <div class="table-td-main ticket-t">Multa</div>
                            <div class="table-td-main tipy">Pena</div>
                        </div>
                    </div>
                    <p class="warning"> <span class="warning-upper">Atenção:</span> O código penal é complementado pela constituição federal de Long Beach.</p>
                </div>
                `)

                for(j= 105; j < 107; j++){
                    $(".table-16").append(`
                    
                    <div class="table-tr">
                        <div class="table-td crime">${penalcodeList[j].crime}</div>
                        <div class="table-td ticket-t">${penalcodeList[j].multa}</div>
                        <div class="table-td tipy">${penalcodeList[j].pena}</div>
                    </div>
                    `)
                }

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    <h1 class="title-observ">Observações gerais</h1>
                    <p class="observ">I - Os crimes tipificados aqui, permitem a mera TENTATIVA, que são as ações criminosas não completadas, por motivos alheios à vontade dos agentes. Crimes que comportem a tentativa, serão penalizados em 50% do valor da ação consumada.</p>

                    <p class="observ">II - Atenuantes só poderão ser aplicadas se o acusado contratar um advogado. Caso contrário, não terá acesso a nenhuma.
                    (Em casos que o judiciário não se fizer presente, após tentativa de contato com o Promotor e Juiz, a unidade policial, nesse caso, e apenas nesse caso, poderá oferecer 30% de redução de pena e 10% de redução de multa.
                    </p>

                    
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    <h1 class="title-observ">Observações gerais</h1>
                    <p class="observ">III -  A FIANÇA é um instituto presente e aceito na nossa legislação, ela pode ser proposta e discutida entre o Jurídico e Departamento Policial, segundo seus próprios juízos de valores, respeitando as normas vigentes. O valor da fiança é de MIL doláres a cada mês de pena. Todos os detalhes do acordo e fiança devem estar presentes nos autos de prisão. Não há que se falar, todavia, em ficha criminal limpa, o sujeito, ainda que pague a fiança, tem registro de passagem.</p>
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                <h1 class="title-observ">Observações gerais</h1>
                <p class="observ">IV - O direito à FIANÇA não é assegurado àqueles que cometem crimes tipificados nos artigos 15 ao 32 deste código penal.
                O valor deve ser repartido meio a meio entre as áreas responsáveis (50% DP  / 50% Jurídico, pix 679), caberá ao departamento de polícia ( através do oficial responsável) repassar os 50% do valor para o jurídico. Os valores de Fiança não se confundem com a multa, são institutos separados, a fiança é paga pelo civil que deseja pagar em liberdade pelo crime cometido e deve ser depositado na conta da DP e do Jurídico.
                </p>
                    
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                <h1 class="title-observ">Observações gerais</h1>
                <p class="observ-low">IV - São Consideradas Atenuantes:
                <br><br>
                OBS: sem a contratação de um advogado, o sujeito não tem direito a NENHUMA atenuante, pois é de ofício do advogado pleitear tais direitos no momento da defesa prévia.
                <br><br>
                a) Contratação de um Advogado = Redução de Pena de 30%  e 10% de Redução no Valor da Multa.<br><br>
                b) Confissão do Crime (não passível de crimes em flagrante) = Redução de 30% da Pena.<br><br>
                c) Primariedade (Réu Primário) = Redução de 20% da Pena.<br><br>
                d) Delação Premiada = Redução da Pena de até 40% (vedado )<br><br>
                e) Colaboração = A colaboração do suspeito em todo o processo, pode gerar até% de redução na pena.
                </p>
                    
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                <h1 class="title-observ">Observações gerais</h1>
                <p class="observ-low">V - São Considerados Agravantes:
                <br><br>
                a) Reincidência = Aumento na pena de 15% (comete o mesmo crime dentro de 24 horas)<br><br>
                b) Crimes praticados contra servidores públicos = Aumento na pena de 20%<br><br>
                (homicídio qualificado não pode sofrer essa agravante)<br><br><br>
                c) Associação Criminosa = Crimes Praticados por 3 ou mais agentes  = Aumento em 25%<br><br>
                d) Crime praticado por servidor público = 30%       
                </p>
                    
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                <h1 class="title-observ">Observações gerais</h1>
                <p class="observ">VI - O Aviso de Miranda - O Policial deve anunciar o direito do acusado de permanecer em silêncio e não produzir provas contra si mesmo. A falta do aviso, todavia, não resulta em liberação do indivíduo, mas qualquer informação obtida a partir daí, sem o tal anúncio, não servirá de prova em juízo, confissão ou testemunho. Todavia, não se pode dificultar a presença do advogado e deve-se deixar claro que a presença de um gera acesso às atenuantes, sob pena de processo administrativo.
                </p>                    
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                <h1 class="title-observ">Observações gerais</h1>
                <p class="observ">VII - Veículos são apreendidos quando utilizados em ações nos quais o condutor ou passageiros atentem contra a vida de terceiros, em tentativas de fuga, assaltos e demais.
                </p>    
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                <h1 class="title-observ">Observações gerais</h1>
                <p class="observ">VIII - É de extrema importância que a autoridade policial colha evidências de todo e qualquer ocorrido, se possível, registrando por foto ou vídeo e colhendo o testemunho dos civis presentes para futuro processo judicial.
                </p>    
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                <h1 class="title-observ">Observações gerais</h1>
                <p class="observ"> IX - A Pena Máxima em Long Beach não poderá ultrapassar 500M.
                </p>
                <p class="warning-low"> <span class="warning-upper"> OBS: </span> Permanece procurado por 48 horas, aqueles que cometem crimes graves (contra a vida, patrimônio público, violência, bem como, aquele que comete mais de três crimes no mesmo delito.</p>
                <p class="warning-low"> <span class="warning-upper"> OBS: </span> Crimes de caráter leve, permanecerá o acusado como procurado durante o período de 24 horas.</p> 
                </div>
                `)
  

            }else if (i == 1){

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    
                    
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    
                    <p class="book-page-content">${SecOne[i].page[0].text[0].right}</p>
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    
                    <ul class="listCommands">
                        
                    </ul>
                    
                </div>
                `) 

                for(j=0; j < SecOne[i].page[0].text[1].commands.length; j++){
                    $(".listCommands").append(`
                        <li>${SecOne[i].page[0].text[1].commands[j]}</li>
                    `)
                }

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    
                    <p class="book-page-content">Exemplo prático</p><br>
                    <h2> F8 + vanilla 1 </h2>
                    <p> ou</p>
                    <h2> /vanilla 1</h2>
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    
                    <p> Para os amantes que não perdem tempo, seguem algumas posições prazerosas que podemos praticar dentro do automóvel.</p><br>
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    
                    <ul class="listCommands-two">
                        
                    </ul>
                    
                </div>
                `) 

                for(j=0; j < SecOne[i].page[0].text[2].commands.length; j++){
                    $(".listCommands-two").append(`
                        <li>${SecOne[i].page[0].text[2].commands[j]}</li>
                    `)
                }

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    
                    <p> Caso vocês ainda não estejam satisfeitos, disponibilizamos mais algumas outras posições pra que vocês cheguem ao ápice do prazer.</p><br>
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    
                    <ul class="listCommands-three">
                        
                    </ul>
                    
                </div>
                `) 

                for(j=0; j < SecOne[i].page[0].text[3].commands.length; j++){
                    $(".listCommands-three").append(`
                        <li>${SecOne[i].page[0].text[3].commands[j]}</li>
                    `)
                }

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    
                    <p> Agradecemos pela leitura, não grude as páginas deste livro</p><br>
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    
                    <i class="fas fa-heart"></i>
                </div>
                `)

                

    
                
            }else if (i == 2){
                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    
                    
                </div>
                `)
                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    
                    <p class="book-page-content">Neste guia você encontrará todas as informações necessárias para operar as possibilidades que nossa cidade oferece para o ser lar, esperamos que em Long Beach você se sinta em casa.</p>
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    <p>Você é quem decide quem entra na sua casa e a segurança vem em       primeiro lugar, atente-se a como controlar o acesso à sua residência na página seguinte.</p>                      
                    
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">

                    <ul class="commands-acess">
                        
                    </ul>

                </div>
                `)

                for (k = 0; k < SecOne[i].page[0].text[0].commandsAcess.length; k++){

                    $(".commands-acess").append(`

                         <li class="style-houses">${SecOne[i].page[0].text[0].commandsAcess[k]}</li>
                    
                    `)
                }

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                <p>Que tal decorar um pouco aquele cômodo vazio? Aqui você encontrará os meios para mobiliar a sua casa.</p>
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    <ul>
                        <li class="style-houses">edit-furniture - Mobiliar a casa</li>
                    </ul>
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    <p>Curtiu o visual que você montou hoje na loja de roupas? Nossos especialistas vão te auxiliar a guardar adequadamente suas roupas.</p>
                    
                </div>
                `)
                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    
                    <ul>
                        <li class="style-houses">register-wardrobe - Registrar o guarda roupa</li>
                    </ul>
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    <p>Esperamos que o guia domiciliar tenha sido de grande auxílio para garantir o conforto e a segurança do seu lar.</p>
                    
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    
                     <i class="fad fa-home-heart"></i>
                </div>
                `)
            }

        }else if(id === SecTwo[i].id){
            $(".book-border").css("background-color",`${SecTwo[i].bcolor}`)
            $(".swiper-wrapper").append(` 
            <div class="swiper-slide book-page-first">
                <h1>${SecTwo[i].page[0].title}</h1>
                <p class="book-page-content">${SecTwo[i].page[0].description}</p>
            </div>
            `)

            if(i == 2){

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    
                    
                </div>
                `)
                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    
                    <p>Neste e-book você irá encontrar tudo o que precisa saber para aproveitar o melhor do seu aparelho televisivo.</p>
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    <p>Agora, pegue seu controle e use as funções que iremos descrever a seguir.</p>
                    
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    
                <p class="tv-p">Para alternar o volume da televisão execute o seguinte comando</p> <span class="tv-s">/volume (0-10) ou F8 volume (0-10)</span>
                <p class="tv-p">Já viu o suficiente do vídeo? Quer parar a execução? É simples! Use</p> <span class="tv-s">/destroy ou F8 destroy</span>
                <p class="tv-p">Para começar a executar algum vídeo na sua TV, faça da seguinte forma</p> <span class="tv-s">/tv + letras e números do link do youtube</span>

                    
                </div>
                `)


                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    <p>Ainda está na dúvida quanto a qual TV comprar? Relaxa! Separamos os melhores modelos do mercado para você não errar.</p>
                    
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    
                <img class="picWat" src="./imgs/longbooks/tv1.png"/>
                <img class="picWat" src="./imgs/longbooks/tv2.png"/>
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-left">
                    <p>Obrigado por ter chegado até aqui, desejamos que os spoilers e a queda de energia não te atinjam!</p>
                    
                </div>
                `)

                $(".swiper-wrapper").append(` 
                <div class="swiper-slide book-page-right">
                    
                    <i class="fad fa-tv-retro"></i>
                </div>
                `)
            }
        }
    }
}

function BookHome(){
    $(".swiper-slide").remove()
    $(".home-books").css("opacity","0")
    $(".lib").show(200)
    $(".book").hide(200)
}