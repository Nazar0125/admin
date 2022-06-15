import React from "react";

export const LoadingSlide = () => {
    return (
        <div className="LoadingSlide">
            <div className="LoadingSlide-header">
                <div className="LoadingSlide-titel">
                </div>
                <div className="LoadingSlide-delete">
                </div>
            </div>
            <div className="LoadingSlide-items">
                <div className="LoadingSlide-item">
                    <div className="LoadingTemplate-wrapper">
                        <div className="LoadingTemplate-text"></div>
                        <div className="LoadingTemplate-input"></div>
                    </div>
                    <div className="LoadingTemplate-wrapper">
                        <div className="LoadingTemplate-text"></div>
                        <div className="LoadingTemplate-textare"></div>
                    </div>
                </div>
                <div className="LoadingSlide-item">
                    <div className="LoadingTemplate-wrapper">
                        <div className="LoadingTemplate-text"></div>
                        <div className="LoadingTemplate-file">
                        </div>
                    </div>
                    <div className="LoadingTemplate-images">
                        <div className="LoadingTemplate-image"></div>
                        <div className="LoadingTemplate-image"></div>
                    </div>
                </div>
            </div>
            <div className="LoadingSlide-fotter">
                
            </div>
        </div>
    )
};
