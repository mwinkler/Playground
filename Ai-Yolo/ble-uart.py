import asyncio
from bleak import BleakClient

address = "E2:F8:2B:39:49:B2"
MODEL_NBR_UUID = "2A24"
UUID_UART = "6e400003-b5a3-f393-e0a9-e50e24dcca9e"

async def main(address):
    async with BleakClient(address) as client:
        while True:
            ipt = input()
            await client.write_gatt_char(UUID_UART, bytes(ipt + ";", encoding='ascii'))
            #model_number = await client.read_gatt_char(MODEL_NBR_UUID)
            #print("Model Number: {0}".format("".join(map(chr, model_number))))


asyncio.run(main(address))