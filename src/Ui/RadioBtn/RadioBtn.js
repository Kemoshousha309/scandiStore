import { Component } from "react";
import style from "./RadioBtn.module.scss";

class RadioBtn extends Component {

    state = {
        checked: false
    }

    componentDidMount () {
        if(this.props.checked) {
            this.setState({checked: this.props.checked})
        }
    }



    render () {
        let classes = [style.small, style.unChecked, style.undisable];
        if(this.props.disable){
            classes[2] = style.disable
        }
        if(this.props.big){
            classes[0] = style.big
        }
        if(this.state.checked){
            classes[1] = style.checked
        }


        return (
            <div className={style.Container}>
                <label htmlFor={this.props.value} className={classes.join(" ")} >{this.props.children}</label>
                <input 
                disabled={!this.props.disable} 
                onChange={(e) => this.setState({checked: !this.state.checked, value: e.target.value})} 
                type="radio" id={this.props.value} 
                name={this.props.name} 
                value={this.props.value} />
            </div>
        )
    }
}


export default RadioBtn;