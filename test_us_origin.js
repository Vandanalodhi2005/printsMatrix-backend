const EasyPostClient = require('@easypost/api');
const fs = require('fs');

require('dotenv').config();
const client = new EasyPostClient(process.env.EASYPOST_API_KEY);

async function test() {
    try {
        const fromAddressUS = await client.Address.create({
            company: 'Innovation Dynamics Group LLC',
            street1: '11397 Quincy St NE', 
            city: 'Blaine',
            state: 'MN',
            zip: '55434',
            country: 'US',
            phone: '651-815-4630'
        });

        const toAddress = await client.Address.create({
            name: 'Customer',
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
                from_address: fromAddressUS,
                parcel: parcel
        });

        fs.writeFileSync('result_us_origin.json', JSON.stringify({
            rates: shipment.rates,
            messages: shipment.messages
        }, null, 2));

        console.log("Done");
    } catch (e) {
        console.error("Error!!");
        console.error(e.message);
    }
}

test();
