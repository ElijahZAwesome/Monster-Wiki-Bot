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
        await client.send_message(ctx.message.author, embed=embed)

client.run('NDM0MTY1MDU1MzE2Mjk1Njkw.DbGbUw.Tz665JQ8lnMKD8WIx6pcXko6TgA')
