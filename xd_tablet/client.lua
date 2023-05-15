


local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vSERVER = Tunnel.getInterface("xd_tablet")
src = {}
Tunnel.bindInterface("xd_tablet",src)
vRP = Proxy.getInterface("vRP")

-- local loadFile= LoadResourceFile(GetCurrentResourceName(), "nui/config/ifood.json")
-- local extract = {}
-- extract = json.decode(loadFile)
-- print(extract)

-- TriggerServerEvent("xd_tablet:saveInfos",extract)


-- for k,v in pairs(extract.restaurantes) do

-- end
local menuEnabled = false
local userPerms = {
	['normal'] = {},
	['leader'] = {},
}
local realtorPerms = {}

RegisterNetEvent("xd_tablet:updateTable")
AddEventHandler("xd_tablet:updateTable",function(table,perms,realtor)
	if menuEnabled then
		SendNUIMessage({ restaurants = table.restaurantes,realtor = table.realtor,dealership = table.dealership })
	end
end)

RegisterNUICallback("allInfos",function(data,cb)
	local tabletTable,pid = vSERVER.getInfos()
	if tabletTable then
		cb({ restaurants = tabletTable.restaurantes,realtor = tabletTable.realtor,dealership = tabletTable.dealership })
	end
end)


function ToggleActionMenu()
	menuEnabled = not menuEnabled
	if menuEnabled then
		CreateThread(function()
			while menuEnabled do
				local hour = GetClockHours()
				local minute = GetClockMinutes()
				SendNUIMessage({ hours = hour, minutes = minute })
					
				Citizen.Wait(200)
			end
		end)
		-- CreateThread(function()
		-- 	while menuEnabled do
		-- 		Citizen.Wait(10000)
		-- 		local tabletTable,pid = vSERVER.getInfos()
		-- 		if tabletTable then
		-- 			SendNUIMessage({ restaurants = tabletTable.restaurantes,realtor = tabletTable.realtor,dealership = tabletTable.dealership,myid = pid })
		-- 		end
		-- 	end
		-- end)
		local tabletTable,pid = vSERVER.getInfos()
		if tabletTable then
			SetNuiFocus(true,true)
			SendNUIMessage({ showmenu = true, restaurants = tabletTable.restaurantes,realtor = tabletTable.realtor,dealership = tabletTable.dealership, myid = pid })
		else
			vRP._DeletarObjeto()
			vRP._stopAnim(false)
		end
	else
		SetNuiFocus(false,false)
		SendNUIMessage({ hidemenu = true })
		vRP._DeletarObjeto()
		vRP._stopAnim(false)
	end
end



function src.checkDistance(x,y,z,x2,y2,z2)
	return CalculateTravelDistanceBetweenPoints(x,y,z,x2,y2,z2)
end

RegisterNUICallback("finalizarPedido",function(data,cb) 
	local cart = {
		['foods'] = {},
		['drinks'] = {},
		['candy'] = {},
		['others'] = {},
	}
	if data.data.cart['foods'] then
		for k,v in pairs(data.data.cart['foods']) do
			table.insert(cart['foods'],{index = v['id'],quant = v['quant']})
		end
	end
	if data.data.cart['drinks'] then
		for k,v in pairs(data.data.cart['drinks']) do
			table.insert(cart['drinks'],{index = v['id'],quant = v['quant']})
		end
	end
	if data.data.cart['candy'] then
		for k,v in pairs(data.data.cart['candy']) do
			table.insert(cart['candy'],{index = v['id'],quant = v['quant']})
		end
	end
	if data.data.cart['others'] then
		for k,v in pairs(data.data.cart['others']) do
			table.insert(cart['others'],{index = v['id'],quant = v['quant']})
		end
	end
	TriggerServerEvent("finalizarPedido",cart,data.data.rest,parseInt(data.data.total),data.data.noidea)
end)

RegisterNUICallback("markChecked",function(data,cb)
	TriggerServerEvent("markChecked",data.data)
end)

RegisterNUICallback("setDestination",function(data,cb)
	TriggerServerEvent("setDestination",data.data)
end)

RegisterNUICallback("isReady",function(data,cb)
	TriggerServerEvent("isReady",data.data)
	exports.smartphone:createSMS('Long Food', 'Localização de '..data.data['pedido']['identity']['name'],{data.data['coords'].x,data.data['coords'].y,0})
end)

RegisterNUICallback("setProfile",function(data,cb)
	TriggerServerEvent("setProfile",data.data)
end)

RegisterNUICallback("removeUser",function(data,cb)
	TriggerServerEvent("removeUser",data.data)
end)

RegisterNUICallback("warningUser",function(data,cb)
	TriggerServerEvent("warningUser",data.data)
end)

RegisterNUICallback("setProperty",function(data,cb)
	TriggerServerEvent("setProperty",data.data)
end)

RegisterNUICallback("schedulingStatus",function(data,cb)
	TriggerServerEvent("schedulingStatus",data.data)
end)

RegisterNUICallback("realtorSched",function(data,cb)
	TriggerServerEvent("realtorSched",data.data)
end)
RegisterNUICallback("setScheduling",function(data,cb)
	TriggerServerEvent("setScheduling",data.data)
end)

RegisterNUICallback("propRemove",function(data,cb)
	TriggerServerEvent("propRemove",data.data)
end)

RegisterNUICallback("removeRealtor",function(data,cb)
	TriggerServerEvent("removeRealtor",data.data)
end)

RegisterNUICallback("restVote",function(data,cb)
	TriggerServerEvent("xd_tablet:vote",data.data)
end)
RegisterNUICallback("restResp",function(data,cb)
	TriggerServerEvent("restResp",data.data)
end)

RegisterNUICallback("ButtonClick",function(data,cb)
	if data.data == "exit" then
		ToggleActionMenu()
	else
		-- SendNUIMessage({ showmenu = true, data = data.data, restaurants = vSERVER.getRests(),isrest = vSERVER.isRest(data.data), atts = vSERVER.getVars(data.data), restVote = vSERVER.getVote(data.data),est = vSERVER.getEst(data.data) })
	end
end)
RegisterNUICallback("marcacao",function(data,cb)
	local res = vSERVER.getRestInfos(data.data)
	if res then
		ToggleActionMenu()
		vRP.setGPS(res.x,res.y)
		TriggerEvent("Notify","sucesso","Marcação adicionada no seu GPS!")
	end
end)
RegisterNUICallback("votar",function(data,cb)
    TriggerServerEvent("xd_tablet:vote",data.data)
	-- SendNUIMessage({ showmenu = true, data = data.data.rest, restaurants = vSERVER.getRests(),isrest = vSERVER.isRest(data.data.rest), atts = vSERVER.getVars(data.data.rest), restVote = vSERVER.getVote(data.data.rest),est = vSERVER.getEst(data.data) })
end)
RegisterNUICallback("pedido",function(data,cb)
	ToggleActionMenu()
	TriggerServerEvent("fazerPedido",data.data)
end)
RegisterNUICallback("removeSet",function(data,cb)
	TriggerServerEvent("removeSet",data.data)
end)

RegisterKeyMapping ( 'vrp:tabletf9' , '[A] Abrir tablet' , 'keyboard' , 'f9' )

RegisterCommand('vrp:tabletf9', function()
    -- if IsControlJustPressed(0,56) then
		ToggleActionMenu()
		vRP._CarregarObjeto("amb@code_human_in_bus_passenger_idles@female@tablet@idle_a","idle_b","prop_cs_tablet",49,28422)
	-- end
end)