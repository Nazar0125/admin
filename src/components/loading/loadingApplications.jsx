import React from 'react'

const LoadingList = () => {
    return (
        <div className = 'applications-tabel__bodys'>
            <div className = 'applications-tabel__body  LoadingTemplate-body'>
                <div className="LoadingTemplate-text" />
            </div>
            <div className = 'applications-tabel__body'>
                <div className="LoadingTemplate-text" />
            </div>
            <div className = 'applications-tabel__body'>
                <div className="LoadingTemplate-text" />
            </div>
            <div className = 'applications-tabel__body'>
                <div className="LoadingTemplate-text" />
            </div>
            <div className = 'applications-tabel__body'>
                <div className="LoadingTemplate-text" />
            </div>
            <div className = 'applications-tabel__body'>
                <div className="LoadingTemplate-text" />
            </div>
            <div className = 'applications-tabel__body'>
                <div className="LoadingTemplate-text" />
            </div>
        </div>
    )
}

export const LoadingApplications = () => {
    return (
    <>
        <LoadingList />
        <LoadingList />
        <LoadingList />
        <LoadingList />
        <LoadingList />
    </>
    )
}