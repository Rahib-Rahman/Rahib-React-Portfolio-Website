import React, {Component,Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import graphicsLogo from '../../asset/image/graphics.svg'
import webLogo from '../../asset/image/web.svg'
import mobileLogo from '../../asset/image/mobile.svg'
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Loading from "../Loading/Loading";
import WentWrong from "../WentWrong/WentWrong";
class Services extends Component {

    constructor() {
        super();
        this.state={
            myData:[],
            loading:true,
            error:false
        }
    }


    componentDidMount() {

        RestClient.GetRequest(AppUrl.Services).then(result=>{
            if(result==null){
                this.setState({ error:true,loading:false})
            }else{
                this.setState({myData:result,loading:false})
            }
        }).catch(error=>{
            this.setState({ error:true,loading:false})
        })
    }


    render() {
        if(this.state.loading==true && this.state.error==false ){
            return  <Loading/>
        }
        else if(this.state.loading==false  && this.state.error==false)  {
            const  myList=this.state.myData;
            const myView=myList.map(myList=>{
                return  <Col lg={4} md={6} sm={12}>
                    <div className="serviceCard text-center">
                        <img src={myList.service_logo}/>
                        <h2 className="serviceName">{myList.service_name}</h2>
                        <p className="serviceDescription">{myList.service_description}</p>
                    </div>
                </Col>
            })
            return (
                <Fragment>
                    <Container className="text-center">
                        <h1 className="serviceMainTitle">MY SERVICES</h1>
                        <Row>
                            {myView}
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

export default Services;