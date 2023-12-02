import React, {Component,Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {BarChart, Bar, ResponsiveContainer, XAxis, Tooltip} from "recharts";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import ReactHtmlParser from 'react-html-parser';
import Loading from "../Loading/Loading";
import WentWrong from "../WentWrong/WentWrong";

class Analysis extends Component {

    constructor(){
        super();
        this.state={
            data:[],
            desc:'',
            loading:true,
            error:false
        }
    }


    componentDidMount() {
        RestClient.GetRequest(AppUrl.ChartData).then(result=>{
            if(result==null){
                this.setState({ error:true})
            }
            else {
                this.setState({data:result, loading:false})
            }


        }).catch(error=>{
            this.setState({ error:true})
        })

        RestClient.GetRequest(AppUrl.TechDesc).then(result=>{
            if(result==null){
                this.setState({ error:true,loading:false})
            }
            else {
                this.setState({desc:result[0]['tech_description']})
            }

        }).catch(error=>{
            this.setState({ error:true,loading:false})
        })
    }

    render() {
        var blue = "rgba(0,115,230,0.8)";

        if(this.state.loading==true && this.state.error==false ){
            return <Loading/>
        }
        else if(this.state.loading==false  && this.state.error==false)  {
        return (
            <Fragment>
                <Container className="text-center">
                    <h1 className="serviceMainTitle">MY TOOLS & TECHNOLOGY</h1>
                    <Row>
                        <Col style={{width: '50%', height: '300px'}} lg={6} md={12} sm={12}>

                            <ResponsiveContainer>
                                <BarChart width={100} height={300} data={this.state.data}>
                                    <XAxis dataKey="technology"/>
                                    <Tooltip/>
                                    <Bar dataKey="projects" fill={blue}>
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                            <p id="desc" className="text-justify des">
                                {ReactHtmlParser(this.state.desc)}
                            </p>
                        </Col>

                    </Row>
                </Container>
            </Fragment>
        );
    }
   else if(this.state.error==true){
            return  <WentWrong/>
   }

    }
}

export default Analysis;