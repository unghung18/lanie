import paypal from '@paypal/checkout-server-sdk';
import { NextResponse } from 'next/server';

const clientId = "AQmDEwC2vCyaFua47cuX4VlMPubJuMwKj_UXMzoKSwN3pb5kwan7GPcPpA5rhWcqmu6fi5p3rw6lzF_t"
const clientSecret = "EItTcS8yA3vbnYUBJ5j1GA53e5-H1x0sHIbZqFUgehT02GDZJ6w_oNaFJyo2MWYbloHMzU34C9I2o1Kf"

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);

const client = new paypal.core.PayPalHttpClient(environment);

export const POST = async (request) => {

    const orderRequest = new paypal.orders.OrdersCreateRequest();

    const reqData = await request.json()

    /*  const result = reqData.map((e) => {
         return {
             name: "Book of React",
             description: "A book about React",
             quantity: 2,
             unit_amount: {
                 currency_code: "USD",
                 value: "50"
             }
         }
     })
     console.log(reqData); */

    orderRequest.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: `${(reqData.totalPayment / 24380).toFixed(2)}`,
                    breakdown: {
                        item_total: {
                            currency_code: "USD",
                            value: `${(reqData.totalPayment / 24380).toFixed(2)}`
                        }
                    },
                    description: reqData.description
                },
                /*  items: [
                     {
                         name: "Book of React",
                         description: "A book about React",
                         quantity: 2,
                         unit_amount: {
                             currency_code: "USD",
                             value: "50"
                         }
                     },
                     {
                         name: "Book of Next",
                         description: "A book about Next",
                         quantity: 1,
                         unit_amount: {
                             currency_code: "USD",
                             value: "50"
                         }
                     }
                 ] */
            }
        ]
    })

    const response = await client.execute(orderRequest);

    return NextResponse.json({
        id: response.result.id
    })
}