export default function Die(props){
    return(
        <div className="die" style={props.isHeld ? {backgroundColor : "#59E391"} : {}} onClick={()=>props.hold(props.id)}>
            <p>{props.value}</p>
        </div>
    )
}