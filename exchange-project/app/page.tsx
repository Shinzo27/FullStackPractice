import Image from "next/image";
import MarketBar from "./components/MarketBar";
import TradeView from "./components/TradeView";
import Depth from "./components/Depth/Depth";
import SwapUI from "./components/SwapUI";

export default function Home() {
  return (
    <div className="flex flex-row flex-1 justify-center items-center">
      <div className="flex flex-col flex-1">
        <MarketBar/>
        <div className="flex flex-row h-[620px] border-y border-slate-800">
          <div className="flex flex-col flex-1">
            <TradeView/>
          </div>
          <div className="w-[1px] flex-col border-slate-800 border-l"></div>
          <div className="flex flex-col w-[250px] overflow-hidden">
            <Depth market="BTC_USDC"/>
          </div>
        </div>
      </div>
      <div className="w-[1px] flex-col border-slate-800 border-l"></div>
      <div>
        <div className="flex flex-col w-[250px]">
          <SwapUI/>
        </div>
      </div>
    </div>
  );
}
