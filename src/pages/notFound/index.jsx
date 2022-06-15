import React from "react";
import { Helmet } from "react-helmet";
export const NotFound = () => {
    
    return (
        <>
            <Helmet>
                <html/>
                <title>
                    404
                </title>
            </Helmet>
            <div className = "notFound">
                <div className = "container">
                    404
                </div>
            </div>
        </>
    )
}