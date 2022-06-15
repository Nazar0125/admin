import React from "react";
import {Title} from '../../components/title'
import {Price} from './price';
import { Helmet } from "react-helmet";
import {PricesApi} from '../../utils/api/pricesApi'
import { Loading } from "../../components/loading";
import {LogOffAc} from '../../store/ducks/user/actionCreators';
import { useDispatch } from 'react-redux';

export const Prices = () => {
    const [data, setData] = React.useState()
    const dispatch = useDispatch()

    const getData = async () => {
        try {
            const obj = await PricesApi.fetchPriesApi();
            setData(obj.content.items)
        } catch(error) {
            if (error.response) {
                if (error.response.status === 500) {
                    dispatch(LogOffAc())
                }
            }
        }
    }
    
    React.useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <Helmet>
                <html/>
                <title>
                    Цены
                </title>
            </Helmet>
            <div className = "prices">
                <div className = "container">
                    <div className="prices-head">
                        <Title title = "Цены"/>
                    </div>
                    <article className = "prices-bg mt-38">
                        {
                            !data ?
                            <Loading />
                            :
                            data && data.map((item, i) => {
                                return <Price key = {i} price = {item} />
                            })
                        }
                    </article>
                </div>
            </div>
        </>
    )
}