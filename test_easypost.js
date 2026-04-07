const EasyPostClient = require('@easypost/api');

require('dotenv').config();
const client = new EasyPostClient(process.env.EASYPOST_API_KEY);

async function test() {
    try {
        const fromAddress = await client.Address.create({
            company: process.env.COMPANY_NAME || 'PrintsCarts',
            street1: process.env.COMPANY_ADDRESS || '123 Business Rd', 
            city: process.env.COMPANY_CITY || 'New York',
            state: process.env.COMPANY_STATE || 'NY',
            zip: process.env.COMPANY_ZIP || '10001',
            country: process.env.COMPANY_COUNTRY || 'US',
            phone: process.env.COMPANY_PHONE || '123-456-7890'
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

        console.log("Rates Count:", shipment.rates.length);
        shipment.messages.forEach(msg => {
            console.log(`CARRIER: ${msg.carrier}, TYPE: ${msg.type}, MESSAGE: ${msg.message}`);
        });
    } catch (e) {
        console.error("Error!!");
        console.error(e.message);
        console.error(e);
    }
}

test();
