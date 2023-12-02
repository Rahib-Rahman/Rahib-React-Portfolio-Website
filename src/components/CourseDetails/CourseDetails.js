import React, {Component, Fragment} from 'react';
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {Player,BigPlayButton} from 'video-react';
import ReactHtmlParser from "react-html-parser";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Loading from "../Loading/Loading";
import WentWrong from "../WentWrong/WentWrong";
class CourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state={
            MyCourseID:props.id,
            LongTitle:"",
            TotalLecture:" ",
            TotalStudent:" ",
            ShortDes:"",
            LongDes:" ",
            VideoURL: " ",
            MoreInfoURL:" ",
            SkillAll:" ",
            loading:true,
            error:false
        }
    }
    componentDidMount() {
        RestClient.GetRequest(AppUrl.CourseDetails+this.state.MyCourseID).then(result=>{
            if(result==null){
                this.setState({ error:true,loading:false})
            } else{
                this.setState({
                    LongTitle:result[0]['long_title'],
                    TotalLecture: result[0]['total_lecture'] ,
                    TotalStudent:result[0]['total_student']  ,
                    ShortDes: result[0]['short_des'] ,
                    LongDes: result[0]['long_des'],
                    VideoURL: result[0]['video_url'] ,
                    MoreInfoURL: result[0]['course_link'] ,
                    SkillAll:result[0]['skill_all'] ,
                    loading:false
                });
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
            return (
                <Fragment>
                    <Container fluid={true} className="topFixedPage p-0" >
                        <div className="topPageOverlay">
                            <Container className="topPageContentCourse">
                                <Row>
                                    <Col sm={12} md={6} lg={6}>
                                        <h3 className="CourseFullTitle">{this.state.LongTitle}</h3>
                                        <h5 className="CourseSubTitle">JavaScript={this.state.TotalLecture}</h5>
                                        <h5 className="CourseSubTitle mt-0">NodeJs={this.state.TotalStudent}</h5>
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <p className="CourseDes">{this.state.LongDes}</p>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Container>
                    <Container className="mt-5">
                        <Row>
                            <Col sm={12} md={6} lg={6}>
                                <h1 className="serviceName">All Skills You Need</h1>
                                { ReactHtmlParser(this.state.SkillAll) }
                                <Button  target="_blank" href={"//"+this.state.MoreInfoURL}  variant="primary">More Info</Button>
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <Player>
                                    <source src={this.state.VideoURL} />
                                    <BigPlayButton position="center"/>
                                </Player>
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

export default CourseDetails;