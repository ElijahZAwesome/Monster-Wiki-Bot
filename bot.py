import discord
import asyncio
from discord.ext import commands

client = commands.Bot(command_prefix='!')
client.remove_command('help')

@client.command(pass_context = True)
async def test(ctx):
    await ctx.send('I heard you! {0}'.format(ctx.author))

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
    embed = discord.Embed(title="Monster-Wiki", description="Thanks for using the Monster Wiki! To find out more about a monster, just type '!' plus the name of the monster you want to look up. For example, '!beholder' will give you info about the Beholder respectively. Here are a list of the monsters documented:", color=0x00ff00)
    embed.add_field(name="Category1", value="Beholder\nTest", inline=True)
    embed.add_field(name="Category2", value="Kobold\nTest2", inline=True)
    embed.set_image(url="https://cdn.discordapp.com/avatars/434165055316295690/d14d16e9f2314a6538711b3d9ef16040.png")
    await client.send_message(ctx.message.channel, embed=embed)
     
@client.command(pass_context = True)
async def beholder(ctx):
    embed = discord.Embed(title="Beholder", description='"It floats before you, a bulbous body with a central, unblinking eye, and a large maw filled with daggerlike teeth. Smaller eyes, attached to wriggling stalks, sprout from the top of the orblike body."', color=0x00ff00)
    embed.set_image(url="http://media.wizards.com/2014/images/dnd/newtodnd/Beholder_1E.jpg")
    await client.send_message(ctx.message.channel, embed=embed)
    if(ctx.message.author.server_permissions.administrator):
        embed.add_field(name="Size/Type", value="Large Aberration", inline=True)
        embed.add_field(name="Hit Dice", value="11d8+44 (93 hp)", inline=True)
        embed.add_field(name="Initiative", value="+6", inline=True)
        embed.add_field(name="Speed", value="5ft. (1 square), fly 20ft. (good)", inline=True)
        embed.add_field(name="Armor Class", value="26 (-1 size, +2 Dex, +15 natural), touch 11, flat-footed 24", inline=True)
        embed.add_field(name="Base Attack/Grapple", value="+8/+12", inline=True)
        embed.add_field(name="Attack", value="Eye rays +9 ranged touch and bite +2 melee (2d4)", inline=True)
        embed.add_field(name="Full Attack", value="Same as attack", inline=True)
        embed.add_field(name="Space/Reach", value="10ft./5ft.", inline=True)
        embed.add_field(name="Special Attacks", value="Eye rays", inline=True)
        embed.add_field(name="Special Qualities", value="All-around vision, antimagic cone, darkvision 60 ft., and flight.", inline=True)
        embed.add_field(name="Enviroment", value="Cold hills", inline=True)
        await client.send_message(ctx.message.author, embed=embed)
        
@client.command(pass_context = True)
async def kobold(ctx):
    embed = discord.Embed(title="Kobold", description='"Kobolds are craven reptilian humanoids that commonly infest dungeons. They make up for their physical ineptitude with a cleverness for trap making."', color=0x00ff00)
    embed.set_image(url="https://www.worldanvil.com/media/cache/cover/uploads/images/47d2592d7c95acf9461ff843084e9f0f.png")
    await client.send_message(ctx.message.channel, embed=embed)
    if(ctx.message.author.server_permissions.administrator):
        embed.add_field(name="Armor Class", value="12", inline=True)
        embed.add_field(name="Hit Points", value="5 (2d6 - 2)", inline=True)
        embed.add_field(name="Speed", value="30ft.", inline=True)
        embed.add_field(name="Strength", value="7 (-2)", inline=True)
        embed.add_field(name="Dexterity", value="15 (+2)", inline=True)
        embed.add_field(name="Constitution", value="9 (-1)", inline=True)
        embed.add_field(name="Intuition", value="8 (-1)", inline=True)
        embed.add_field(name="Wisdom", value="7 (-2)", inline=True)
        embed.add_field(name="Charisma", value="8 (-1)", inline=True)
        embed.add_field(name="Senses", value="Darkvision 60ft. Passive Perception 8", inline=True)
        embed.add_field(name="Languages", value="Common, Draconic", inline=True)
        embed.add_field(name="Challenge", value="1/8 (25 XP)", inline=True)
        await client.send_message(ctx.message.author, embed=embed)

client.run('NDM0MTY1MDU1MzE2Mjk1Njkw.DbGbUw.Tz665JQ8lnMKD8WIx6pcXko6TgA')
