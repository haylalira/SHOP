
import { useRouter } from "next/router"
import React from "react"
import Image from "next/image";
import { GetStaticProps } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import {ProductContainer,ImageContainer,ProductDetails } from "../../styles/pages/Product"



export default function Product() {
  const { query } = useRouter()
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={""} alt={""}></Image>
      </ImageContainer>
     <ProductDetails>
      <h1>camiseta x</h1>
      <span>R$ 59.90</span>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit voluptate doloremque nobis vitae mollitia dicta autem voluptatibus, perspiciatis beatae natus quas deleniti obcaecati dolore aspernatur tempora odit unde, possimus maiores.</p>
      <button>Comparar Agora</button>

     </ProductDetails>

    </ProductContainer>
  
         
  )
}

export const getStaticProps: GetStaticProps<any,{ id: string }>= async ({ params })=>{
//@ts-ignore
  const productId = params.id;

  const product = await stripe.products.retrieve( productId,{
    expand:['default_price'],
  });

  const price = product.default_price as Stripe.Price;
  

  return{ 
    props:{
      product:{ id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        
        price: new Intl.NumberFormat
        ("pt-BR", {
          style:"currency",
          currency:"BRL",
          //@ts-ignore
        }).format(price.unit_amount / 100),

       description: product.description
      }},

      revalidate: 60 * 60 * 1 , //1hour,

    }
  }


