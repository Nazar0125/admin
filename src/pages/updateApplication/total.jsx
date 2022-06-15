import React from "react";

export const Total = ({hours, price}) => {

    const [decomPrice, setDecomPrice] = React.useState();

    function getInteger(int){
        return int.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }


    return (
        <div className = "total">
            <p className = "comments-title">Итого</p>
            <div className = "total-info">
                <p className = "total-name">
                    Итого часов
                </p>
                <p className = "total-price">
                    {isNaN(hours) ? '' : hours}
                </p>
            </div>
            <div className = "total-info">
                <p className = "total-name">
                    Итого по стоимости
                </p>
                <p className = "total-price">
                    {isNaN(price) ? '' : getInteger(price)}
                </p>
            </div>
        </div>
    );
}