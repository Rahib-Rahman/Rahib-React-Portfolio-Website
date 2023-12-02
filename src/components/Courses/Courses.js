import React, {Component,Fragment} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Loading from "../Loading/Loading";
import WentWrong from "../WentWrong/WentWrong";

class Courses extends Component {
    constructor() {
        super();
        this.state={
            myData:[],
            loading:true,
            error:false
        }
    }


    componentDidMount() {

        RestClient.GetRequest(AppUrl.CourseHome).then(result=>{
            if(result==null){
                this.setState({ error:true,loading:false})
            }
            else {
                this.setState({myData:result,loading:false})
            }
        }).catch(error=>{
            this.setState({ error:true,loading:false})
        })
    }



    render() {



        if(this.state.loading==true && this.state.error==false ){
            return <Loading/>
        }
        else if(this.state.loading==false  && this.state.error==false)  {

            const  myList=this.state.myData;
            const myView=myList.map(myList=>{
                return  <Col lg={6} md={12} sm={12} className="p-2">
                    <Row className="p-3">
                        <Col  className="p-2" lg={6} md={6} sm={12}>
                            <img className="courseImg" src={myList.small_img}/>
                        </Col>
                        <Col className="p-2" lg={6} md={6} sm={12}>
                            <h5 className="text-justify courseTitle">{myList.short_title}</h5>
                            <p className="text-justify courseDes">{myList.short_des}</p>
                            <Link  className="courseDetails float-left" to={"/CourseDetails/"+myList.id}>Details</Link>
                        </Col>
                    </Row>
                </Col>
            })
            return (
                <Fragment>
                    <Container className="text-center">
                        <h1 className="serviceMainTitle">MY DEVELOPMENT SKILLS</h1>
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
export default Courses;