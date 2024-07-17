import React from 'react'
import { notFound } from 'next/navigation'
const ProductDetails = ({ params, }: { params: { productId: string } }) => {

    if (parseInt(params.productId) > 99) {
        notFound();
    }
    return (
        <div>ProductDetails {params.productId}</div>
    )
}

// export default ProductDetails


// for dynamic metadata 

// import React from 'react'
// import { notFound } from 'next/navigation'
// import { Metadata } from 'next';

// type Props = {
//     params: {
//         productId: string;
//     }
// };
// export const genrateMetaData = ({ params }: Props): Metadata => {
//     return {
//         title: `Product ${params.productId}`,
//     }
// }

// const ProductDetails = ({ params }: Props) => {

//     if (parseInt(params.productId) > 99) {
//         notFound();
//     }
//     return (
//         <div>ProductDetails {params.productId}</div>
//     )
// }

export default ProductDetails