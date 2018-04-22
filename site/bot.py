import discord
import asyncio
from discord.ext import commands
import os
from monsters import *

client = commands.Bot(command_prefix='!')
client.remove_command('help')
try:
    token = os.environ['TOKEN']
except KeyError:
    token = open("token.txt","r").readline()
try:
    password = os.environ['PASSWORD']
    user = os.environ['USER']
    # Read in the file
    with open('./site/login/index.php', 'r') as file :
      filedata = file.read()

    # Replace the target string
      filedata = filedata.replace('adminuser', user)
      filedata = filedata.replace('adminpass', password)

    # Write the file out again
      with open('./site/login/index.php', 'w') as file:
        file.write(filedata)
except KeyError:
    password = open("passwd.txt","r").readline()
    user = open("user.txt","r").readline()
    # Read in the file
    with open('./site/login/index.php', 'r') as file :
      filedata = file.read()

    # Replace the target string
      filedata = filedata.replace('adminuser', user)
      filedata = filedata.replace('adminpass', password)

    # Write the file out again
      with open('./site/login/index.php', 'w') as file:
        file.write(filedata)

@client.event
async def on_ready():
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('------')

@client.command(pass_context = True)
async def ping(ctx):
    await client.send_message(ctx.message.channel, 'Pong!')
    
@client.command(pass_context = True)
async def help(ctx):
    embed = discord.Embed(title="Monster-Wiki", description="Thanks for using the Monster Wiki! Check out the website here: https://monster-wiki-discord.herokuapp.com/ \n To find out more about a monster, just type '!' plus the name of the monster you want to look up. For example, '!beholder' will give you info about the Beholder respectively. Here are a list of the monsters documented:", color=0x00ff00)
    embed.add_field(name="5e", value="Beholder\nKobold\nAarakocra", inline=True)
    embed.set_image(url="https://cdn.discordapp.com/avatars/434165055316295690/d14d16e9f2314a6538711b3d9ef16040.png")
    await client.send_message(ctx.message.channel, embed=embed)
     
@client.command(pass_context = True)
async def beholder(ctx):
    embed = discord.Embed(title="Beholder", description=beholder_desc, color=0x00ff00)
    embed.set_image(url="http://monster-wiki-discord.herokuapp.com/monsters/beholder/pic.png")
    await client.send_message(ctx.message.channel, embed=embed)
    if ctx.message.author.server_permissions.administrator == True or ctx.message.author.id == "314124904737931275":
        embed.add_field(name="Size/Type", value=beholder_size, inline=True)
        embed.add_field(name="Hit Dice", value=beholder_dice, inline=True)
        embed.add_field(name="Initiative", value=beholder_initiative, inline=True)
        embed.add_field(name="Speed", value=beholder_speed, inline=True)
        embed.add_field(name="Armor Class", value=beholder_armor, inline=True)
        embed.add_field(name="Base Attack/Grapple", value=beholder_baseattack, inline=True)
        embed.add_field(name="Attack", value=beholder_attack, inline=True)
        embed.add_field(name="Full Attack", value=beholder_fullattack, inline=True)
        embed.add_field(name="Space/Reach", value=beholder_reach, inline=True)
        embed.add_field(name="Special Attacks", value=beholder_specialattack, inline=True)
        embed.add_field(name="Special Qualities", value=beholder_specialquality, inline=True)
        embed.add_field(name="Enviroment", value=beholder_enviroment, inline=True)
        await client.send_message(ctx.message.author, embed=embed)
        
@client.command(pass_context = True)
async def kobold(ctx):
    embed = discord.Embed(title="Kobold", description='"Kobolds are craven reptilian humanoids that commonly infest dungeons. They make up for their physical ineptitude with a cleverness for trap making."', color=0x00ff00)
    embed.set_image(url="http://monster-wiki-discord.herokuapp.com/monsters/kobold/pic.png")
    await client.send_message(ctx.message.channel, embed=embed)
    if(ctx.message.author.server_permissions.administrator):
        embed.add_field(name="Armor Class", value="12", inline=True)
        embed.add_field(name="Hit Points", value="5 (2d6 - 2)", inline=True)
        embed.add_field(name="Speed", value="30ft.", inline=True)
        embed.add_field(name="Strength", value="7 (-2)", inline=True)
        embed.add_field(name="Dexterity", value="15 (+2)", inline=True)
        embed.add_field(name="Constitution", value="9 (-1)", inline=True)
        embed.add_field(name="Intelligence", value="8 (-1)", inline=True)
        embed.add_field(name="Wisdom", value="7 (-2)", inline=True)
        embed.add_field(name="Charisma", value="8 (-1)", inline=True)
        embed.add_field(name="Senses", value="Darkvision 60ft. Passive Perception 8", inline=True)
        embed.add_field(name="Languages", value="Common, Draconic", inline=True)
        embed.add_field(name="Challenge", value="1/8 (25 XP)", inline=True)
        await client.send_message(ctx.message.author, embed=embed)
        
@client.command(pass_context = True)
async def aarakocra(ctx):
    embed = discord.Embed(title="Aarakocra", description='Birdlike Humanoids that are very dangerous.', color=0x00ff00)
    embed.set_image(url="http://monster-wiki-discord.herokuapp.com/monsters/aarakocra/pic.png")
    await client.send_message(ctx.message.channel, embed=embed)
    if(ctx.message.author.server_permissions.administrator):
        embed.add_field(name="Size/Type", value="Medium humanoid (aarakocra)", inline=True)
        embed.add_field(name="Alignment", value="Neutral good", inline=True)
        embed.add_field(name="Armor Class", value="12", inline=True)
        embed.add_field(name="Hit Points", value="13 (3d8)", inline=True)
        embed.add_field(name="Speed", value="20ft., fly 50ft.", inline=True)
        embed.add_field(name="Strength", value="10 (+0)", inline=True)
        embed.add_field(name="Dexterity", value="14 (+2)", inline=True)
        embed.add_field(name="Constitution", value="10 (+0)", inline=True)
        embed.add_field(name="Intelligence", value="11 (+0)", inline=True)
        embed.add_field(name="Wisdom", value="12 (+1)", inline=True)
        embed.add_field(name="Charisma", value="11 (+0)", inline=True)
        embed.add_field(name="Languages", value="Au ran", inline=True)
        embed.add_field(name="Challenge", value="1/4 (50 XP)", inline=True)
        await client.send_message(ctx.message.author, embed=embed)

client.run(token)