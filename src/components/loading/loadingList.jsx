import React from 'react'

const LoadingList = () => {
    return (
    <div className = 'templates-tabel__bodys'>
        <div className = 'templates-tabel__body LoadingTemplate-body'>
            <div className="LoadingTemplate-text" />
        </div>
        <div className = 'templates-tabel__body'>
            <div className="LoadingTemplate-text" />
        </div>
        <div className = 'templates-tabel__body'>
            <div className="LoadingTemplate-text" />
        </div>
        <div className = 'templates-tabel__body'>
            <div className="LoadingTemplate-text" />
        </div>
        <div className = 'templates-tabel__body templates-editDelete'>
            <div className="LoadingTemplate-text" />
        </div>
    </div>
    )
}

export const LoadingLists = () => {
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