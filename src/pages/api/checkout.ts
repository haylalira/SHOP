// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stripe } from '@/lib/stripe'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest,res: NextApiResponse) {
 const priceId = 'price_1MyIixEZnKRysHMtL3tch2YQ';
 const successUrl='${process.env.NEXT_URL}/sucess';
 const cancelUrl='${process.NEXT_URL}/';

   const checkoutSession = await stripe.checkout.sessions.create({
    success_url:successUrl,
    cancel_url:cancelUrl,
    mode:'payment',
    line_items:[{

     price: priceId,
     quantity:1,

    }]

   })

    res.status(201).json({ 
     checkoutUrl: checkoutSession.url,
   })
}
