import React, { useEffect } from 'react';
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { listTiers } from '../actions/tierActions';
import { changeUserTier } from '../actions/userActions';
import Cookie from 'js-cookie';
import './pricingTable.css';
import Button from '@mui/material/Button';

const data = [
    {
        name: '1',
        money: 1000,

    },
    {
        name: '2',
        money: 2000,

    },
    {
        name: '3',
        money: 3000,

    },
    {
        name: '4',
        money: 4000,

    },
    {
        name: '5',
        money: 3454,

    },
    {
        name: '6',
        money: 7878,

    },
    {
        name: '7',
        money: 1232,

    },
    {
        name: '8',
        money: 3434,

    },
    {
        name: '9',
        money: 8676,

    },
    {
        name: '10',
        money: 6757,

    },
    {
        name: '11',
        money: 4000,

    },
    {
        name: '12',
        money: 2425,

    },

];

function UserTier(props) {
    const userId = Cookie.getJSON('userInfo')?.userId
    const tierList = useSelector(state => state.tierList);
    const changeUserTierRes = useSelector(state => state.changeUserTier);
    console.log("payload UserTier: ", tierList, changeUserTierRes)
    const dispatch = useDispatch();

    const buttonHandle = (tier) => {
        console.log("buttonHandle")
        dispatch(changeUserTier(tier, userId));
    }

    useEffect(() => {
        console.log("useEffect")
        dispatch(listTiers());
    }, [changeUserTierRes])

    function PricingSlot(tier) {
        return (
            <div class="columns">
                <ul class="price">
                    <li class="header">{tier.name}</li>
                    <li class="grey">$ {tier.cost} / month</li>
                    {tier.pricingDetail.map(item => <li>{item}</li>)}
                    {tier.users?.indexOf(userId) > -1 ? <li><strong><p>Current Tier</p></strong></li> : <li><Button onClick={() => buttonHandle(tier.name)} variant="contained">CHOOSE</Button></li>}
                </ul>
            </div>
        )
    }

    return (
        <div>
            <div>
                {tierList?.tiers?.map(tier => PricingSlot(tier))}
            </div>
            {/* <div style={{ position: 'relative', height: '100%', width: "100%" }}>
                <ComposedChart
                    width={1800}
                    height={400}
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 0,
                        left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="name" scale="band" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="money" barSize={40} fill="#413ea0" />
                    <Line type="monotone" dataKey="money" stroke="#ff7300" />
                </ComposedChart>
            </div> */}
        </div>
    )
}



export default UserTier;