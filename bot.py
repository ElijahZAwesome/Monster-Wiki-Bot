import discord
import asyncio

client = discord.Client()

@client.event
async def on_ready():
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('------')

@client.event
async def on_message(message):
    if message.content.startswith('!ping'):
        await client.send_message(message.channel, 'Pong!')
    if message.content.startswith('!beholder'):
        embed = discord.Embed(title="Beholder", description='"It floats before you, a bulbous body with a central, unblinking eye, and a large maw filled with daggerlike teeth. Smaller eyes, attached to wriggling stalks, sprout from the top of the orblike body."', color=0x00ff00)
        embed.set_image(url="https://media.discordapp.net/attachments/434149762296446977/434172885037219840/Cacodemon.jpg")
        embed.add_field(name="Field1", value="hi", inline=False)
        embed.add_field(name="Field2", value="hi2", inline=False)
        await client.send_message(message.channel, embed=embed)

client.run('NDM0MTY1MDU1MzE2Mjk1Njkw.DbGbUw.Tz665JQ8lnMKD8WIx6pcXko6TgA')
