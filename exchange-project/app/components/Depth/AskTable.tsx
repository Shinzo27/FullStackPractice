const AskTable = ({asks}: { asks: [string, string][] }) => {
    let currentTotal = 0;
    const releventAsks = asks.slice(0, 15)
    
    return (
        <div>
            AskTable
        </div>
    );
}

export default AskTable;