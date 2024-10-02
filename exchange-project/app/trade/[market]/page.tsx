"use client";

import Depth from "@/app/components/Depth/Depth";
import MarketBar from "@/app/components/MarketBar";
import SwapUI from "@/app/components/SwapUI";
import TradeView from "@/app/components/TradeView";
import { useParams } from "next/navigation";

const page = () => {
    const { market } = useParams();

    return <div className="flex flex-row flex-1 jusfiy-center items-center">
        <div className="flex flex-col flex-1">
            <MarketBar market={market as string} />
            <div className="flex flex-row h-[620px] border-y border-slate-800">
                <div className="flex flex-col flex-1">
                    <TradeView market={market as string} />
                </div>
                <div className="w-[1px] flex-col border-slate-800 border-l"></div>
                <div className="flex flex-col w-[250px] overflow-hidden">
                    <Depth market={market as string} /> 
                </div>
            </div>
        </div>
        <div className="w-[1px] flex-col border-slate-800 border-l"></div>
        <div>
            <div className="flex flex-col w-[250px]">
                <SwapUI market={market as string} />
            </div>
        </div>
    </div>
}

export default page;