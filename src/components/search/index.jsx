import React from 'react'
import { useDispatch } from 'react-redux';
import {GetSearch} from '../../store/ducks/templates/actionCreators'

export const Search = () => {
    const dispatch = useDispatch()

    const [text, setText] = React.useState('');
    const onChangeText = (e) => {
        setText(e.target.value)
    }
    /* const onBlurText = (e) => {
        dispatch(GetSearch(text))
    } */
    const eventEnter = (e) => {
        if (e.charCode === 13) {
            dispatch(GetSearch(text))
        }
    }

    return (
        <input
            type = 'search'
            value = {text}
            onChange = {(e) => onChangeText(e)}
            onKeyPress = {(e) => eventEnter(e)}
            className = 'search'
            placeholder = "Поиск"
        />
    )
}