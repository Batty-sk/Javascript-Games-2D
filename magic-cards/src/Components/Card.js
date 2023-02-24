function Card(props){
    return (
        <div className="col-md-2 col-5 card-space" id={props.id} onClick={props.plrselect}> 
        <div className="card-outer outer-parent " id={props.id2}>
                <div className="card-inner" >
                    <div className="card-front" >
                        <img src={props.pattern} alt="" srcset="" />
                    </div>
                    <div className="card-back card-transform-back" >
                        <img src={props.back} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Card