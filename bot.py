import discord
import asyncio
from discord.ext import commands

client = commands.Bot(command_prefix='!')

@client.command()
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

client.run('NDM0MTY1MDU1MzE2Mjk1Njkw.DbGbUw.Tz665JQ8lnMKD8WIx6pcXko6TgA')
