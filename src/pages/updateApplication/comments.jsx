import React from "react";

export const Comments = ({comments}) => {
    return (
        <div className = "comments">
            <p className = "comments-title">Комментарии</p>
            <ul className = "comments-items">
                {
                    comments && comments.map((item, i) => {
                        return <li className = "comments-item" key = {i}><span>{i + 1}.</span><p>{item.body}</p></li>
                    })
                }
                {
                    comments.length === 0 && 
                    <p className = "comments-text">Комментарии нету</p>
                }
            </ul>
        </div>
    );
}