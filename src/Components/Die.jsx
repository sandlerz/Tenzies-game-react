export default function Die(props) {
  return (
     <div className="die" style={props.isHeld ? { backgroundColor: "#59E391"} : null} onClick={props.onClick}>
       <h1 className="die-num">{props.value}</h1>
     </div>
  );
}