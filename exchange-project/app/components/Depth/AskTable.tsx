const AskTable = ({asks}: { asks: [string, string][] }) => {
    let currentTotal = 0;
    const releventAsks = asks.slice(0, 15)

    releventAsks.reverse()
    
    let askWithTotal: [string, string, number][] = []
    for(let i= releventAsks.length-1; i>=0;i--){{
        const [price, quantity] = releventAsks[i]
        askWithTotal.push([price, quantity, currentTotal += Number(quantity)])
    }
    const maxTotal = releventAsks.reduce((acc, [_, quantity]) => acc + Number(quantity), 0)

    askWithTotal.reverse()

    return (
        <div>
            {askWithTotal.map(([price, quantity, total]) => <Ask maxTotal={maxTotal} price={price} quantity={quantity} total={total} key={price}/>)}
        </div>
    );
}
}


function Ask({price, quantity, total, maxTotal}: {price: string, quantity: string, total: number, maxTotal: number}) {
    return <div
    style={{
        display: "flex",
        position: "relative",
        width: "100%",
        backgroundColor: "transparent",
        overflow: "hidden",
    }}>
    <div
        style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: `${(100 * total) / maxTotal}%`,
        height: "100%",
        background: "rgba(228, 75, 68, 0.325)",
        transition: "width 0.3s ease-in-out",
        }}
    ></div>
    <div className="flex justify-between text-xs w-full">
        <div>
            {price}
        </div>
        <div>
            {quantity}
        </div>
        <div>
            {total?.toFixed(2)}
        </div>
    </div>
    </div>
}


export default AskTable;