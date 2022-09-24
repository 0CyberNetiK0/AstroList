fx_version "cerulean"
game "gta5"

name "AstroList"
version "v1.0.0"

server_script { 
    "server.lua",
    "@oxmysql/lib/MySQL.lua"
}

dependency "oxmysql"