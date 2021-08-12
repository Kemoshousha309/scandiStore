import { Component } from "react";
import style from "./CheckBtn.module.scss";

class CheckBtn extends Component {

    render () {
        let classes = [];
        if(this.props.disable){
            classes.push(style.disable) 
        }

        return (
            <div className={style.Container}>
                <input 
                disabled={this.props.disable} 
                onChange={(e) => this.props.changeHandler(e, this.props.id)} 
                type="checkbox" 
                id={this.props.id} 
                checked={this.props.checked}
                value={this.props.value} 
                />
                <label htmlFor={this.props.id} 
                    className={classes.join(" ")}
                >{this.props.children}</label>
            </div>
        )
    }
}


export default CheckBtn;