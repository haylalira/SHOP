
import { useRouter } from "next/router"
import React from "react"
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import {ProductContainer,ImageContainer,ProductDetails } from "../../styles/pages/Product"
 
import dynamic from 'next/dynamic'


interface ProductProps {
  product:{ 
    id: string;
    name: string;
    imageUrl: string;
    price: string ;
    description: string;
    defaultPriceId: string;


  }
}


export default function Product( {product}:ProductProps) {
   function handleBuyproduct(){
     console.log(product.defaultPriceId)
   }
  const { query } = useRouter()
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt={""}  />
      </ImageContainer>
     <ProductDetails>
      <h1>{product.name}</h1>
      <span>{product.price}</span>
      <p>{product.description}</p>
      <button onClick={handleBuyproduct}>Comparar Agora</button>

     </ProductDetails>

    </ProductContainer>
  
         
  )
}

export const  getStaticPaths: GetStaticPaths = async () => {

  return{
    paths:[{ params: { id:`` } }],
    fallback: true,
  }
 
  
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
       description: product.description,
       defaultPriceId: price.id
      }},
      revalidate: 60 * 60 * 1 , //1hour,
    }
  }


