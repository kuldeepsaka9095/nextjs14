import React from 'react'

const loading = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow" style={{ width: '3rem', height: '3rem', marginLeft: '1rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default loading