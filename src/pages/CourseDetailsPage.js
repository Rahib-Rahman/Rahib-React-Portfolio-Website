import React, {Component, Fragment} from 'react';
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Footer from "../components/Footer/Footer";
import CourseDetails from "../components/CourseDetails/CourseDetails";
import RestClient from "../RestAPI/RestClient";
import AppUrl from "../RestAPI/AppUrl";

class CourseDetailsPage extends Component {

    constructor({match}) {
        super();
        this.state={
            MyCourseID:match.params.CourseID,
        }
    }



    componentDidMount() {
        window.scroll(0,0)
    }


    render() {
        return (
            <Fragment>
                <TopNavigation title="Course Details"/>
                    <CourseDetails id={this.state.MyCourseID}/>
                <Footer/>
            </Fragment>
        );
    }
}

export default CourseDetailsPage;