import "./TopUI.css";
import { totalProfitAtom } from "./../GameState/Economy";
import { useAtom } from "jotai";

export function TopUI(){

    const [totalProfit, setTotalProfit] = useAtom(totalProfitAtom);

    return(
        <span className = "topUI">
            this is topui
            <div className= "topStick">
                This is Topstick
                <span className="moneyCounter">
                    Profit: {totalProfit}
                </span>
                <span className="moneyRate">
                    Money Rate
                </span>
                <span className="satisf">
                    Customer Satisfaction
                </span>
                <span className="morale">
                    Worker Morale
                </span>
            </div>
        </span>
    )
}

/*
export function TopUI(){
    const draw = useCallback((g:gg) => {
        g.clear();
        g.beginFill(0xffffff);
        g.drawRect(0, 0, 500, 100);
        g.endFill();
    },[])

    return(
        <Container>
            <Container x={14} y={3} >
                <Graphics 
                    draw={draw}
                />
                <Sprite
                    image={image}
                    x={0}
                    y={0}
                    anchor={{ x: 0, y: 0 }}
                />
                <Text text="TopUI" anchor={{ x: 0, y: 0}} />
            </Container>

            <Container width={100} height={50}></Container>
            <Container width={100} height={50}></Container>
            <Container width={100} height={50}></Container>

        </Container>
    )
}
*/