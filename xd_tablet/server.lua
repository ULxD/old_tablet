local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
local sanitizes = module("cfg/sanitizes")
local Tools = module("vrp","lib/Tools")
vRP = Proxy.getInterface("vRP")
src = {}
Tunnel.bindInterface("xd_tablet",src)
vRPclient = Tunnel.getInterface("vRP")
vCLIENT = Tunnel.getInterface("xd_tablet")
vRESTAURANTS = Proxy.getInterface("nav_restaurants")
local idgens = Tools.newIDGenerator()

local loadFile= LoadResourceFile(GetCurrentResourceName(), "nui/config/ifood.json")
local extract = {}
local shedulingLimit = {}
extract = json.decode(loadFile)


CreateThread(function()
	Wait(2000)
	for k,v in pairs(extract.restaurantes) do
		local infos = vRP.getSData("restaurants"..v['name'])
		infos = json.decode(infos) or {}
		if not infos['employees'] then
			infos['employees'] = {}
			infos['employees']["name"] = {}
			infos['employees']["url"] = {}
			infos['employees']["email"] = {}
		end
		if not infos['warnings'] then 
			infos['warnings'] = {}
		end
		if not v['employees'] then
			extract.restaurantes[k]['employees'] = {}
			extract.restaurantes[k]['employees']["name"] = {}
			extract.restaurantes[k]['employees']["url"] = {}
			extract.restaurantes[k]['employees']["email"] = {}
		end
		if infos['scheduling'] then
			extract.restaurantes[k]["scheduling"] = infos['scheduling']
		end
		if infos['votes'] then
			extract.restaurantes[k]["voting"] = {['votes'] = infos['votes'],['voted'] = infos['voted'],['messages'] = infos['messages'],['quantVotes'] = infos['quantVotes'],['quantVotes'] = infos['quantVotes'],['totalStars'] = infos['totalStars']}
		end
		if not v['emps'] then
			v['emps'] = {}
		end
		Wait(200)
		-- local rows = vRP.query("vRP/get_group", {group = '%'..v['set']..'%'})
		-- for j,w in pairs(rows) do
		-- 	Wait(50)
		-- 	local uidentity = vRP.getUserIdentity(parseInt(w.user_id))
		-- 	if not v['emps'][1] then
		-- 		v['emps'][1] = { name = uidentity.name.." "..uidentity.firstname, id = w.user_id,phone = uidentity.phone,warnings = infos['warnings'][tostring(w.user_id)] }
		-- 	else
		-- 		v['emps'][#v['emps']+1] = { name = uidentity.name.." "..uidentity.firstname, id = w.user_id,phone = uidentity.phone,warnings = infos['warnings'][tostring(w.user_id)] }
		-- 	end
		-- end
		Wait(200)
		if infos['employees']["name"] then
			for j,w in pairs(infos['employees']['name']) do
				extract.restaurantes[k]['employees']["name"][j] = w
			end
		end
		if infos['employees']["url"] then
			for j,w in pairs(infos['employees']['url']) do
				extract.restaurantes[k]['employees']["url"][j] = w
			end
		end
		if infos['employees']["email"] then
			for j,w in pairs(infos['employees']['email']) do
				extract.restaurantes[k]['employees']["email"][j] = w
			end
		end
		Wait(500)
	end
	
	extract.dealership = {}
	local vhsTable = vRP.vehicleGlobal()
	local vehicles = vRP.query("creative/get_allestoque",{ vehicle = k })
	for k,v in pairs(vehicles) do
		if vhsTable[v.vehicle] then
			if vhsTable[v.vehicle].tipo ~= "carros" then
				if not extract.dealership[vhsTable[v.vehicle].tipo] then
					extract.dealership[vhsTable[v.vehicle].tipo] = {}
					extract.dealership[vhsTable[v.vehicle].tipo][1] = {name = vhsTable[v.vehicle].name, price = vhsTable[v.vehicle].price, stock = v.quantidade, index = v.vehicle}
				else
					extract.dealership[vhsTable[v.vehicle].tipo][#extract.dealership[vhsTable[v.vehicle].tipo]+1] = {name = vhsTable[v.vehicle].name, price = vhsTable[v.vehicle].price, stock = v.quantidade, index = v.vehicle}
				end
			else
				if vhsTable[v.vehicle].tipo2 then
					if not extract.dealership[vhsTable[v.vehicle].tipo] then
						extract.dealership[vhsTable[v.vehicle].tipo] = {}
					end
					if not extract.dealership[vhsTable[v.vehicle].tipo][vhsTable[v.vehicle].tipo2] then
						extract.dealership[vhsTable[v.vehicle].tipo][vhsTable[v.vehicle].tipo2] = {}
						extract.dealership[vhsTable[v.vehicle].tipo][vhsTable[v.vehicle].tipo2][1] = {name = vhsTable[v.vehicle].name, price = vhsTable[v.vehicle].price, stock = v.quantidade, index = v.vehicle}
					else
						extract.dealership[vhsTable[v.vehicle].tipo][vhsTable[v.vehicle].tipo2][#extract.dealership[vhsTable[v.vehicle].tipo][vhsTable[v.vehicle].tipo2]+1] = {name = vhsTable[v.vehicle].name, price = vhsTable[v.vehicle].price, stock = v.quantidade, index = v.vehicle}
					end
				end
			end
		end
	end
	Wait(200)
	local realtorInfos = vRP.getSData("realtor")
	realtorInfos = json.decode(realtorInfos) or {}
	extract.realtor[1]['property'] = realtorInfos['property']
	extract.realtor[1]['scheduling'] = realtorInfos['scheduling']
	extract.restaurantes[1]['canOpen'] = true
end)


RegisterCommand('tg',function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if vRP.hasPermission(user_id,extract.restaurantes[parseInt(args[1])].perm) and extract.restaurantes[parseInt(args[1])] then
		extract.restaurantes[parseInt(args[1])].open = not extract.restaurantes[parseInt(args[1])].open
		if extract.restaurantes[parseInt(args[1])].open then
			TriggerClientEvent("Notify",-1,"aviso","<b>"..extract.restaurantes[parseInt(args[1])].name.."</b> aberto!")
		end
		-- TriggerClientEvent("xd_tablet:updateTable",-1,extract)
	end
end)


RegisterServerEvent("setProfile")
AddEventHandler("setProfile",function(data)
	local rest = 0
	for k,v in pairs(extract.restaurantes) do
		if v['name'] == data.rest then
			rest = k
		end
	end

	local infos = vRP.getSData("restaurants"..data['rest'])
	infos = json.decode(infos) or {}
	if not infos['employees'] then
		infos['employees'] = {}
		infos['employees']["name"] = {}
		infos['employees']["url"] = {}
		infos['employees']["email"] = {}
	end
	if data.name then
		infos['employees']["name"][("index"..data.id)] = data.name
		extract.restaurantes[parseInt(rest)]["employees"]["name"][("index"..data.id)] = data.name
	end
	if data.url then
		infos['employees']["url"][("index"..data.id)] = data.url
		extract.restaurantes[parseInt(rest)]["employees"]["url"][("index"..data.id)] = data.url
	end
	if data.email then
		infos['employees']["email"][("index"..data.id)] = data.email
		extract.restaurantes[parseInt(rest)]["employees"]["email"][("index"..data.id)] = data.email
	end
	vRP.setSData("restaurants"..data['rest'],json.encode(infos))
	-- TriggerClientEvent("xd_tablet:updateTable",-1,extract)
end)

RegisterServerEvent("propRemove")
AddEventHandler("propRemove",function(data)
	local _source = source
	local infos = vRP.getSData("realtor")
	infos = json.decode(infos) or {}
	infos['property'][data.name][data.index+1] = nil
	extract.realtor[1]['property'] = infos['property']
	vRP.setSData("realtor",json.encode(infos))
	TriggerClientEvent("Notify",_source,"sucesso","Propriedade removida.")
	-- TriggerClientEvent("xd_tablet:updateTable",-1,extract)
end)

RegisterServerEvent("removeRealtor")
AddEventHandler("removeRealtor",function(data)
	local _source = source
	local infos = vRP.getSData("realtor")
	infos = json.decode(infos) or {}
	infos['scheduling'][data.index+1] = nil
	extract.realtor[1]['scheduling'] = infos['scheduling']
	vRP.setSData("realtor",json.encode(infos))
	TriggerClientEvent("Notify",_source,"sucesso","Agendamento removido.")
	-- TriggerClientEvent("xd_tablet:updateTable",-1,extract)
end)

RegisterServerEvent("markChecked")
AddEventHandler("markChecked",function(data)
	local _source = source
	local user_id = vRP.getUserId(_source)

	for k,v in pairs(extract.restaurantes) do
		if v['name'] == data.rest then
			rest = k
		end
	end
	
	extract.restaurantes[rest]['pedidos'][data.id+1]['checked'] = true
	-- TriggerClientEvent("xd_tablet:updateTable",-1,extract)
end)

RegisterServerEvent("setDestination")
AddEventHandler("setDestination",function(data)
	local _source = source
	local rest = 0
	for k,v in pairs(extract.restaurantes) do
		if v['name'] == data.rest then
			rest = k
		end
	end
	if not extract.restaurantes[rest]['pedidos'][data.id+1]['action'] or extract.restaurantes[rest]['pedidos'][data.id+1]['action'] ~= "accepted" then
		extract.restaurantes[rest]['pedidos'][data.id+1]['action'] = "accepted"
		local psource = vRP.getUserSource(parseInt(data['pedido']['identity']['passport']))
		TriggerClientEvent('smartphone:createSMS',psource, data['rest'], 'Pedido aceito. Seu pedido está em preparação.')
		TriggerClientEvent('smartphone:createSMS',_source, 'Long Food', 'Voce aceitou o pedido.')
	else
		TriggerClientEvent("Notify",_source,"negado","Esse pedido ja foi aceito.")
	end
end)

RegisterServerEvent("isReady")
AddEventHandler("isReady",function(data)
	local _source = source
	local rest = 0
	for k,v in pairs(extract.restaurantes) do
		if v['name'] == data.rest then
			rest = k
		end
	end
	if not extract.restaurantes[rest]['pedidos'][data.id+1]['action'] or extract.restaurantes[rest]['pedidos'][data.id+1]['action'] ~= "ready" then
		extract.restaurantes[rest]['pedidos'][data.id+1]['action'] = "ready"
		local psource = vRP.getUserSource(parseInt(data['pedido']['identity']['passport']))
		TriggerClientEvent('smartphone:createSMS',psource, data['rest'], 'Pedido pronto. Seu pedido está a caminho.')
		-- TriggerClientEvent("Notify",_source,"sucesso","Marcação adicionada no GPS.")
	else
		TriggerClientEvent("Notify",_source,"negado","Esse pedido ja foi aceito.")
	end
end)


RegisterServerEvent("setScheduling")
AddEventHandler("setScheduling",function(data)
	local rest = 0
	local _source = source
	local user_id = vRP.getUserId(_source)
	if not shedulingLimit[user_id] or (shedulingLimit[user_id] and not shedulingLimit[user_id][data['rest']]) then
		if not shedulingLimit[user_id] then
			shedulingLimit[user_id] = {}
		end
		shedulingLimit[user_id][data['rest']] = true
		for k,v in pairs(extract.restaurantes) do
			if v['name'] == data.rest then
				rest = k
			end
		end

		local infos = vRP.getSData("restaurants"..data['rest'])
		infos = json.decode(infos) or {}
		if not infos['scheduling'] then
			infos['scheduling'] = {}
		end
		if not extract.restaurantes[parseInt(rest)]["scheduling"] then
			extract.restaurantes[parseInt(rest)]["scheduling"] = {}
		end
		if not infos['scheduling'][1] then
			infos['scheduling'][1] = data
		else
			infos['scheduling'][#infos['scheduling']+1] = data
		end
		extract.restaurantes[parseInt(rest)]["scheduling"] = infos['scheduling']
		vRP.setSData("restaurants"..data['rest'],json.encode(infos))
		TriggerClientEvent("Notify",_source,"sucesso","Agendamento realizado.")
		-- TriggerClientEvent("xd_tablet:updateTable",-1,extract)
	else
		TriggerClientEvent("Notify",_source,"negado","Voce atingiu o limite de agendamento.")
	end
end)

RegisterServerEvent("schedulingStatus")
AddEventHandler("schedulingStatus",function(data)
	local rest = 0
	local _source = source
	local user_id = vRP.getUserId(_source)
	data['id'] = parseInt(data['id'])
	for k,v in pairs(extract.restaurantes) do
		if v['name'] == data.rest then
			rest = k
		end
	end

	local infos = vRP.getSData("restaurants"..data['rest'])
	infos = json.decode(infos) or {}
	if not infos['scheduling'] then
		infos['scheduling'] = {}
	end
	if infos['scheduling'][data['id']+1] then
		if not infos['scheduling'][data['id']+1]['schedStatus'] then
			infos['scheduling'][data['id']+1]['schedStatus'] = data['schedStatus']
			extract.restaurantes[parseInt(rest)]["scheduling"] = infos['scheduling']
			vRP.setSData("restaurants"..data['rest'],json.encode(infos))
			TriggerClientEvent("Notify",_source,"sucesso","Acao realizada.")
		else
			TriggerClientEvent("Notify",_source,"negado","Esse pedido ja foi aceito/recusado.")
		end
	end
	

	
end)

RegisterServerEvent("setProperty")
AddEventHandler("setProperty",function(data)
	local _source = source

	local infos = vRP.getSData("realtor")
	infos = json.decode(infos) or {}
	if not infos['property'] then
		infos['property'] = {}
	end
	if not infos['property'][data.category] then
		infos['property'][data.category] = {}
	end
	if not infos['property'][data.category][1] then
		infos['property'][data.category][1] = {name = data.name, price = data.price, image = data.image}
	else
		infos['property'][data.category][#infos['property'][data.category]+1] = {name = data.name, price = data.price, image = data.image}
	end
	extract.realtor[1]['property'] = infos['property']
	vRP.setSData("realtor",json.encode(infos))
	TriggerClientEvent("Notify",_source,"sucesso","Propriedade registrada.")
	-- TriggerClientEvent("xd_tablet:updateTable",-1,extract)
end)

RegisterServerEvent("realtorSched")
AddEventHandler("realtorSched",function(data)
	local _source = source

	local infos = vRP.getSData("realtor")
	infos = json.decode(infos) or {}
	if not infos['scheduling'] then
		infos['scheduling'] = {}
	end
	if not infos['scheduling'] then
		infos['scheduling'] = {}
	end
	if not infos['scheduling'][1] then
		infos['scheduling'][1] = {name = data.name, passport = data.passport, phone = data.phone, district = data.district, home = data.home, hour = data.hour}
	else
		infos['scheduling'][#infos['scheduling']+1] = {name = data.name, passport = data.passport, phone = data.phone, district = data.district, home = data.home, hour = data.hour}
	end
	extract.realtor[1]['scheduling'] = infos['scheduling']
	vRP.setSData("realtor",json.encode(infos))
	TriggerClientEvent("Notify",_source,"sucesso","Propriedade registrada.")
	-- TriggerClientEvent("xd_tablet:updateTable",-1,extract)
end)

RegisterServerEvent("warningUser")
AddEventHandler("warningUser",function(data)
	local _source = source

	local puser_id = parseInt(data['user_id'])
	local player = vRP.getUserSource(parseInt(puser_id))
	local id = 0
	for k,v in pairs(extract.restaurantes) do
		if v['name'] == data['rest'] then
			rest = k
			for j,w in pairs(v['emps']) do
				if w['id'] == parseInt(data['user_id']) then
					id = j
				end
			end
		end
	end
	if id > 0 then
		if not extract.restaurantes[rest]['emps'][id]['warnings'] then
			extract.restaurantes[rest]['emps'][id]['warnings'] = {}
		end
		table.insert(extract.restaurantes[rest]['emps'][id]['warnings'],{['message'] = data['message']})
		-- TriggerClientEvent("Notify",source,"sucesso","Voce removeu o passaporte <b>"..puser_id.."</b> do <b>"..data['rest'].."</b>.")

		local infos = vRP.getSData("restaurants"..data['rest'])
		infos = json.decode(infos) or {}
		if not infos['warnings'] then
			infos['warnings'] = {}
		end
		infos['warnings'][data['user_id']] = extract.restaurantes[rest]['emps'][id]['warnings']
		vRP.setSData("restaurants"..data['rest'],json.encode(infos))
		TriggerClientEvent("Notify",_source,"sucesso","Aviso para funcionario: <strong>"..data['message'].."</strong>.")
	end
end)

RegisterServerEvent("removeUser")
AddEventHandler("removeUser",function(data)
	local _source = source

	local puser_id = parseInt(data['user_id'])
	local player = vRP.getUserSource(parseInt(puser_id))

	for k,v in pairs(extract.restaurantes) do
		if v['name'] == data['rest'] then
			rest = k
		end
	end
	
	TriggerClientEvent("Notify",source,"sucesso","Voce removeu o passaporte <b>"..puser_id.."</b> do <b>"..data['rest'].."</b>.")
	if player then
		for k,v in pairs(extract.restaurantes[rest]['removeGroups']) do
			vRP.removeUserGroup(parseInt(puser_id),v)
		end
	else
		for k,v in pairs(extract.restaurantes[rest]['removeGroups']) do
			local sgroups = vRP.getUData(parseInt(puser_id),"vRP:datatable")
			local gp = json.decode(sgroups) or 0
			if gp.groups then
				gp.groups[v] = nil
			end
			vRP.setUData(parseInt(puser_id),"vRP:datatable",json.encode(gp))
		end
	end
end)

RegisterServerEvent("finalizarPedido")
AddEventHandler("finalizarPedido",function(data,rest,total,status)
	local _source = source
	local user_id = vRP.getUserId(_source)
	local identity = vRP.getUserIdentity(user_id)
	local x,y,z = vRPclient.getPosition(_source)
	local restName = rest
	for k,v in pairs(extract.restaurantes) do
		if v['name'] == rest then
			rest = k
			
		end
	end

	-- if vRP.tryFullPayment(user_id,total) then
	if not extract.restaurantes[rest]['pedidos'] then
		extract.restaurantes[rest]['pedidos'] = {}
		if data then
			extract.restaurantes[rest]['pedidos'][1] = data
			extract.restaurantes[rest]['pedidos'][1]['total'] = total
			extract.restaurantes[rest]['pedidos'][1]['identity'] = {['name'] = identity.name.." "..identity.firstname,['phone'] = identity.phone,['passport'] = user_id}
			extract.restaurantes[rest]['pedidos'][1]['status'] = status
			extract.restaurantes[rest]['pedidos'][1]['coords'] = {x = x, y = y, z = z}
		end
	else
		if data then
			local next = #extract.restaurantes[rest]['pedidos']+1
			extract.restaurantes[rest]['pedidos'][next] = data
			extract.restaurantes[rest]['pedidos'][next]['total'] = total
			extract.restaurantes[rest]['pedidos'][next]['identity'] = {['name'] = identity.name.." "..identity.firstname,['phone'] = identity.phone,['passport'] = user_id}
			extract.restaurantes[rest]['pedidos'][next]['status'] = status
			extract.restaurantes[rest]['pedidos'][next]['coords'] = {x = x, y = y, z = z}
		end
	end
	local players = vRP.getUsersByPermission(extract.restaurantes[rest]['perm'])	
	for l,w in pairs(players) do
		local player = vRP.getUserSource(parseInt(w))
		if player then
			async(function()
				TriggerClientEvent("Notify",player,"importante","Novo pedido de <b>"..identity.name.." "..identity.firstname.." ("..identity.phone..")</b>.",30000)
				vRPclient.playSound(player,"Out_Of_Area","DLC_Lowrider_Relay_Race_Sounds")
			end)
		end
	end
	TriggerClientEvent('smartphone:createSMS',source, restName, 'Recebemos seu pedido. O pedido entrará em preparação em breve.')

	-- TriggerClientEvent("xd_tablet:updateTable",-1,extract)
	-- else
	-- 	TriggerClientEvent("Notify",_source,"negado","Dinheiro insuficiente.")
	-- end
	
end)
RegisterServerEvent("xd_tablet:vote")
AddEventHandler("xd_tablet:vote",function(data)
	if parseInt(data.num) >= 0 then
		local user_id = vRP.getUserId(source)
		local identity = vRP.getUserIdentity(user_id)
		local rest = 0
		for k,v in pairs(extract.restaurantes) do
			if v['name'] == data.rest then
				rest = k
			end
		end

		local votes = vRP.getSData("restaurants"..data['rest'])
		votes = json.decode(votes) or {}
		local message = ""
		if data.message then
			message = data.message
		end
		if not votes['votes'] then
			votes['votes'] = {}
			votes['voted'] = {}
			votes['quantVotes'] = 0
			votes['totalVotes'] = 0
			votes['totalStars'] = 0
		end
		if not votes['messages'] or not votes['order'] then
			votes['messages'] = {}
			votes['order'] = {}
		end
		if not votes['voted'][tostring(user_id)] then
			votes['voted'][tostring(user_id)] = true
			votes['votes'][#votes['votes']+1] = {num = parseInt(data.num), uid = user_id, message = message,date = data.curDate,name = identity.name.." "..identity.firstname}
			votes['quantVotes'] = votes['quantVotes'] + 1
			votes['totalVotes'] = votes['totalVotes'] + parseInt(data.num)
			votes['totalStars'] = votes['totalVotes']/votes['quantVotes']
			votes['order'][tostring(user_id)] =  votes['quantVotes']
			vRP.setSData("restaurants"..data['rest'],json.encode(votes))
		else
			for k,v in pairs(votes['votes']) do
				if v.uid == user_id then
					v.message = message
					votes['totalVotes'] = (votes['totalVotes'] - v.num) + parseInt(data.num)
					v.num = parseInt(data.num)
					votes['totalStars'] = votes['totalVotes']/votes['quantVotes']
					vRP.setSData("restaurants"..data['rest'],json.encode(votes))
				end
			end
		end
		extract.restaurantes[parseInt(rest)]["voting"] = {['votes'] = votes['votes'],['voted'] = votes['voted'],['messages'] = votes['messages'],['quantVotes'] = votes['quantVotes'],['quantVotes'] = votes['quantVotes'],['totalStars'] = votes['totalStars']}
		source = vRP.getUserSource(user_id)
		TriggerClientEvent("Notify",source,"sucesso","Voce votou <b>"..data.num.." estrelas</b> em <b>"..extract.restaurantes[rest].name.."</b>.")
		-- TriggerClientEvent("xd_tablet:updateTable",-1,extract)
	else
		TriggerClientEvent("Notify",source,"negado","Selecione a quantidade de estrelas desejada.")

	end
end)

RegisterServerEvent("restResp")
AddEventHandler("restResp",function(data)
	data['id'] = parseInt(data['id'])
	local user_id = vRP.getUserId(source)
	local identity = vRP.getUserIdentity(user_id)
	local rest = 0
	for k,v in pairs(extract.restaurantes) do
		if v['name'] == data.rest then
			rest = k
		end
	end

	local votes = vRP.getSData("restaurants"..data.rest)
	votes = json.decode(votes) or {}
	if votes['votes'][data['id']+1] and data['resp'] then
		votes['votes'][data['id']+1] = {resp = data['resp'],num = votes['votes'][data['id']+1]['num'], uid = votes['votes'][data['id']+1]['uid'], message = votes['votes'][data['id']+1]['message'],date = votes['votes'][data['id']+1]['date'],name = votes['votes'][data['id']+1]['name']}
		vRP.setSData("restaurants"..data['rest'],json.encode(votes))
		extract.restaurantes[parseInt(rest)]["voting"] = {['votes'] = votes['votes'],['voted'] = votes['voted'],['messages'] = votes['messages'],['quantVotes'] = votes['quantVotes'],['quantVotes'] = votes['quantVotes'],['totalStars'] = votes['totalStars']}
	end
	
	-- TriggerClientEvent("xd_tablet:updateTable",-1,extract)
end)

function src.getInfos()
	if extract.restaurantes[1]['canOpen'] then
		local user_id = vRP.getUserId(source)
		for k,v in pairs(extract.restaurantes) do
			if vRP.hasPermission(user_id,v['perm']) then
				if not extract['restaurantes'][parseInt(k)]['isnormal'] then
					extract['restaurantes'][parseInt(k)]['isnormal'] = {}
				end
				extract['restaurantes'][parseInt(k)]['isnormal'][tostring(user_id)] = true
			end
			if vRP.hasPermission(user_id,v['permleader']) then
				if not extract['restaurantes'][parseInt(k)]['isleader'] then
					extract['restaurantes'][parseInt(k)]['isleader'] = {}
				end
				extract['restaurantes'][parseInt(k)]['isleader'][tostring(user_id)] = true
			end
		end
		if not extract['realtor'][1]['perms'] then
			extract['realtor'][1]['perms'] = {
				['normal'] = {},
				['leader'] = {},
			}
		end
		if vRP.hasPermission(user_id,extract.realtor[1]['perm']) then
			extract['realtor'][1]['perms']['normal'][tostring(user_id)] = true
		end
		if vRP.hasPermission(user_id,extract.realtor[1]['permleader']) then
			extract['realtor'][1]['perms']['leader'][tostring(user_id)] = true
		end
		return extract,tostring(user_id)
	else
		TriggerClientEvent("Notify",source,"aviso","Carregando informacões do tablet, aguarde...")
		return false
	end
end

function tD(n)
    n = math.ceil(n * 100) / 100
    return n
end