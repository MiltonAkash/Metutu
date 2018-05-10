import React, {Component} from 'react';
// import Select from 'react-select';
// import 'react-select/dist/react-select.css';
import firebase from '../firebase';
import config from '../config';
import Titlebar from "./Titlebar";
class AddSkills extends Component {
    constructor(props){
        super(props);

        this.state={
            skillset:[],
            newSkillset:[],
            query:''
        };

        this.submit = ()=>{
            firebase.database().ref(`users/${props.user.uid}/skillset`).set(this.state.newSkillset
            );
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        firebase.database().ref(`users/${this.props.user.uid}/skillset`).once('value',snapshot=>{
            let val = snapshot.val();
            if(val){
                this.setState({skillset:val,newSkillset:val});
            }
        })
    }

    render() {
        return (
            <div className='full'>
                <Titlebar/>
                <div className={'flex-1'}>
                <div className='skillpicker'>
                    <div className={'selected 16p-8p'}>
                        <h3>Skills Selected</h3>
                        {this.state.newSkillset.map(x=><div onClick={()=>{
                            let {skillset} = this.state;
                            let i = skillset.indexOf(x);
                            skillset.splice(i,1);
                            this.setState({newSkillset:skillset});
                        }}>{x}</div>)}
                    </div>
                    <div className='searchbar row y-center'>
                        <i className={'fas fa-search fa-2x Grey'}></i>
                        <input onChange={(e)=>{this.setState({query:e.target.value})}} className={'search'} type='search'/>
                    </div>
                    <div className={'col list'}>
                        {config.skills.filter(x =>
                            x.includes(this.state.query.toLowerCase()) && !this.state.newSkillset.includes(x)).map(x =>
                            <div onClick={()=>{
                                this.setState({
                                    newSkillset:this.state.newSkillset.concat(x)
                                });
                            }} className={'list-item'}>
                            {x}
                        </div>)}
                    </div>
                </div>
                </div>
                <div className={'btn text-center'} onClick={this.submit}>Update</div>
            </div>
        );
    }
}


export default AddSkills;
