AddEventHandler("playerConnecting", function(name, setCallback, deferrals) 
    deferrals.defer()
    local player = source
    local identifierDiscord = ""
    deferrals.update("Searching for your whitelist data...")

    Citizen.Wait(0)
    
    for k, v in ipairs(GetPlayerIdentifiers(player)) do
        if string.sub(v, 1, string.len("discord:")) == "discord:" then
            identifierDiscord = v
        end
    end

    local allowedEntry = false
    local discordId = string.gsub(identifierDiscord, "discord:", "")
    if identifierDiscord then
        local result = MySQL.query.await("SELECT * FROM user_data WHERE discordId = ?", {discordId})
        if result[1]  then
            print("[AstroList] " .. GetPlayerName(player) .. " has been given access to the server")
            allowedEntry = true
        else
            print("[AstroList] " .. GetPlayerName(player) .. " has been denied access to the server")
            allowedEntry = false
        end
    end

    if allowedEntry then
        deferrals.done()
    else
        deferrals.done("You are not whitelisted on this server.")
    end
end)