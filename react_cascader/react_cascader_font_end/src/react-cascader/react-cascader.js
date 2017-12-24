import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './react-cascader.css'
class ReactCascader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            headerData:[
                {
                    name:"省",
                    type:"province",
                    pid:"0"
                },
                {
                    name:"市",
                    type:"city",
                    pid:null
                },
                {
                    name:"县",
                    type:"district",
                    pid:null
                }
            ],
            area:[],
            province:{},
            city:{},
            district:{},
            areaType:"province",
            currentHeader:"province"

        };
    }
    toggleHeader(v,i){

        if(this.state.headerData[i].pid){
            this.setState({
                currentHeader:v.type
            });
            this.props.getData(this.state.headerData[i].pid)
            for(let k=i+1;k<this.state.headerData.length;k++){
                this.state.headerData[k].pid = null
            }
            this.setState({})
        }

    }
    loadData(id,name,areaType){
        let current = "";
        if(areaType === "province"){
            current =  "city"
        }else if(areaType === "city" || areaType === "district" ){
            current = "district"
        }
        this.setState({
            [areaType]:{id,name},
            currentHeader:current
        },()=>{
            if(areaType === 'district'){
                this.props.onOk([this.state.province,this.state.city,this.state.district])
            }else{
                this.props.getData(id);
                this.state.headerData.forEach(v=>{
                    if(v.type === this.state.currentHeader){
                        v.pid = id
                    }
                })
            }
        });

    }
    render() {
        const currentHeader={
            background:'#2ea7dc',
            color:'#fff'
        }

        return (
            <div id="react-cascader">
                <ReactCSSTransitionGroup
                    transitionName="cascader-modal-show"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={300}>
                    {
                        this.props.cascaderShow?
                            <div className="cascader-modal" onClick={this.props.onCancel}></div>
                            :
                            null
                    }

                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup
                    transitionName="cascader-show"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>

                    {
                        this.props.cascaderShow ?
                            <div className="cascader-wrapper">
                                <div className="cascader-header">
                                    {
                                        this.state.headerData.map((v,i)=>(
                                            <div className="cascader-title" key={v.name} style={v.type === this.state.currentHeader?currentHeader:null} onClick={this.toggleHeader.bind(this,v,i)}>{v.name}</div>
                                        ))
                                    }

                                </div>
                                <div className="cascader-body" >
                                    {
                                        this.props.data.map(v=>(
                                            <div className="cascader-item" key={v.id} onClick={this.loadData.bind(this,v.id,v.name,v.areaType)} >{v.name}</div>
                                        ))
                                    }

                                </div>
                            </div>
                            :
                            null

                    }
                </ReactCSSTransitionGroup>

            </div>
        );
    }
}
export default ReactCascader