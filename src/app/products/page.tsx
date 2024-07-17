import React from 'react'
import Link from 'next/link'
const ProductList = () => {
    return (


        <main className='container py-4'>
            <h1>ProductList</h1>
            <p className="fs-5 col-md-8">Quickly and easily get started with Bootstrap's compiled, production-ready files with this barebones example featuring some basic HTML and helpful links. Download all our examples to get started.</p>
            <div className="row">
                <Link className="col-12" href="/products/1">Product 1</Link>
                <Link className="col-12" href="/products/2">Product 2</Link>
                <Link className="col-12" href="/products/3">Product 3</Link>
            </div>
        </main>
    )
}

export default ProductList