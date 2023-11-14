import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter } from 'next/navigation';


const PaypalCheckoutBtn = ({ totalPayment }) => {

    const router = useRouter()
    return (
        <div className=' overflow-x-auto'>
            <PayPalScriptProvider options={{
                clientId: "AQmDEwC2vCyaFua47cuX4VlMPubJuMwKj_UXMzoKSwN3pb5kwan7GPcPpA5rhWcqmu6fi5p3rw6lzF_t"
            }}>
                <PayPalButtons
                    style={{ color: "blue", layout: "horizontal" }}
                    createOrder={async () => {
                        const res = await fetch('/api/checkout', {
                            method: "POST",
                            body: JSON.stringify({ description: "abcd", totalPayment: totalPayment })
                        })

                        const order = await res.json()
                        console.log(order)
                        return order.id
                    }}
                    onApprove={(data, actions) => {
                        console.log(data)
                        actions.order.capture();
                        router.push('/checkout/success')
                    }}
                    onCancel={(data) => {
                        console.log("Canceled: ", data)
                    }}
                />
            </PayPalScriptProvider>
        </div>
    )
}

export default PaypalCheckoutBtn