import { PricingTable, PricingSlot, PricingDetail } from "react-pricing-table";
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
import Cookie from 'js-cookie';

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
    const Tier = Cookie.getJSON('userInfo')?.tier
    console.log(Tier)
    const tierList = useSelector(state => state.tierList);
    console.log("payload: ", tierList)
    const dispatch = useDispatch();

    const buttonHandle = (id, newTier) => {
        console.log("buttonHandle")
    }

    useEffect(() => {
        console.log("useEffect")
        dispatch(listTiers());
    }, [])

    return (
        <div>
            <div>
                <PricingTable highlightColor="#1976D2">
                    {tierList?.tiers?.map(tier => tier.name === Tier ? PriceSlotHightlight(tier) : PriceSlot(tier))}
                </PricingTable>
            </div>

            <div style={{ position: 'relative', height: '100%', width: "100%" }}>
                <ComposedChart
                    width={1800}
                    height={400}
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
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
            </div>
        </div>
    )
}

function PriceSlot(tier) {
    return (
        <PricingSlot buttonText="CHOOSE"  title={tier.name} priceText={"$" + tier.cost + "/month"}>
            <PricingDetail> Watch Free Content </PricingDetail>
            <PricingDetail> Hundreds of Episodes from our Library</PricingDetail>
            <PricingDetail> Hundres of Short Form Pieces</PricingDetail>
        </PricingSlot>
    )
}

function PriceSlotHightlight(tier) {
    return (
        <PricingSlot highlighted title={tier.name} priceText={"$" + tier.cost + "/month"}>
            <PricingDetail> Watch Free Content </PricingDetail>
            <PricingDetail> Hundreds of Episodes from our Library</PricingDetail>
            <PricingDetail> Hundres of Short Form Pieces</PricingDetail>
        </PricingSlot>
    )
}

export default UserTier;