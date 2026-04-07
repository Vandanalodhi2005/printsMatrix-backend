const EasyPostClient = require('@easypost/api');
const fs = require('fs');

require('dotenv').config();
const client = new EasyPostClient(process.env.EASYPOST_API_KEY);

async function test() {
    try {
        const fromAddress = await client.Address.create({
            company: 'PrintsCarts',
            street1: '123 Business Rd', 
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'US',
            phone: '123-456-7890'
        });

        const toAddress = await client.Address.create({
            street1: '417 Montgomery Street',
            street2: '5th Floor',
            city: 'San Francisco',
            state: 'CA',
            zip: '94104',
            country: 'US',
            phone: '4153334445'
        });

        const parcel = await client.Parcel.create({
            weight: 20
        });

        const shipment = await client.Shipment.create({
                to_address: toAddress,
                from_address: fromAddress,
                parcel: parcel
        });

        fs.writeFileSync('result_us.json', JSON.stringify({
            rates: shipment.rates,
            messages: shipment.messages
        }, null, 2));

        const fromAddressCA = await client.Address.create({
            company: "Prints Matrix",
            street1: "95 Broadacre Dr",
            city: "Kitchener",
            state: "ON",
            zip: "N2R 0S5",
            country: "CA",
            phone: "+1 (651) 815-4630"
        });

        const shipmentCA = await client.Shipment.create({
                to_address: toAddress,
                from_address: fromAddressCA,
                parcel: parcel
        });

        fs.writeFileSync('result_ca.json', JSON.stringify({
            rates: shipmentCA.rates,
            messages: shipmentCA.messages
        }, null, 2));

        console.log("Done");
    } catch (e) {
        console.error("Error!!");
        console.error(e.message);
    }
}

test();
