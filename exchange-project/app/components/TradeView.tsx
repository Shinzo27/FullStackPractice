import { useEffect, useRef, useState } from "react";
import { KLine, Ticker } from "../utils/types";
import { getKlines, getTicker } from "../utils/httpClient";
import { ChartManager } from "../utils/ChartManager";

const TradeView = ({ market }: { market: string }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartManagerRef = useRef<ChartManager>(null);

    const init = async () => {
        let klinesData: KLine[] = [];

        try {
            klinesData = await getKlines(market, "1h", Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24 * 7) / 1000), Math.floor(new Date().getTime() / 1000));
        } catch (error) {
            console.log(error);
        }

        if(chartRef){
            if(chartManagerRef.current){
                chartManagerRef.current.destroy();
            }
            const chartManager = new ChartManager(
                chartRef.current,
                [
                  ...klinesData?.map((x) => ({
                    close: parseFloat(x.close),
                    high: parseFloat(x.high),
                    low: parseFloat(x.low),
                    open: parseFloat(x.open),
                    timestamp: new Date(x.end), 
                  })),
                ].sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1)) || [],
                {
                  background: "#0e0f14",
                  color: "white",
                }
            );
            //@ts-ignore 
            chartManagerRef.current = chartManager;
        }
    }

    useEffect(() => {
        init();
    }, [market, chartRef]);

    return (
        <div>
            <div ref={chartRef} style={{ height: "520px", width: "100%", marginTop: 4 }}></div>
        </div>
    );
}

export default TradeView;