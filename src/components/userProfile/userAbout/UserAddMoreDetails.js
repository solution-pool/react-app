import React, { useEffect, useState } from 'react';
import './../../../App.css';
import UserDetailSidebar from "./UserDetailSidebar";
import UserLikePostCount from "./UserLikePostCount";
import WorkPlaceForm from "./addMoreDetailUserForm/WorkPlaceForm";
import SchoolDetailForm from "./addMoreDetailUserForm/EducationForm";
import AddressForm from "./addMoreDetailUserForm/AddressForm";
import CityForm from "./addMoreDetailUserForm/CityForm";
import HomeTownForm from "./addMoreDetailUserForm/HomeTownForm";
import RelationshipStatusForm from "./addMoreDetailUserForm/RelationshipStatusForm";
import PhoneNum from "./addMoreDetailUserForm/PhoneNum";
import ProfessionsForm from "./addMoreDetailUserForm/ProfessionsForm";
import AddressListing from "./addMoreDetailUserForm/AddressListing";
import ProfessionListing from "./addMoreDetailUserForm/ProfessionListing";
import PhoneNoListing from "./addMoreDetailUserForm/PhoneNoListing";
const UserAddMoreDetails = () => {

    return (
        <React.Fragment>
            <div className="container-fluid gedf-wrapper">
                <div className="row">
                    <div className="col-sm-6 col-lg-4">
                        <UserDetailSidebar />
                        <UserLikePostCount />
                    </div>
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="accordion" id="accordionExample">
                                    <div className="card">
                                        <div className="card-header" id="headingOne">
                                            <h2 className="mb-0">
                                                <i className="fa fa-plus-circle" style={{ fontSize: '30px', color: '#007bff' }} data-toggle="collapse" data-target="#collapseOne" aria-hidden="true"><button type="button" className="btn btn-link">Add a workplace</button> </i>
                                            </h2>
                                        </div>
                                        <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                            <WorkPlaceForm />
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header" id="headingTwo">
                                            <h2 className="mb-0">
                                                <i className="fa fa-plus-circle" style={{ fontSize: '30px', color: '#007bff' }} data-toggle="collapse" data-target="#collapseTwo" aria-hidden="true"><button type="button" className="btn btn-link collapsed" data-toggle="collapse" >Education</button></i>
                                            </h2>
                                        </div>
                                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                            <SchoolDetailForm />
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header" id="headingThree">
                                            <h2 className="mb-0">
                                                <i className="fa fa-plus-circle" style={{ fontSize: '30px', color: '#007bff' }} data-toggle="collapse" data-target="#collapseThree" aria-hidden="true"><button type="button" className="btn btn-link collapsed" data-toggle="collapse" >Address</button></i>
                                            </h2>
                                        </div>
                                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                            <AddressForm />
                                        </div>
                                    </div>
                                    <AddressListing />
                                    <div className="card">
                                        <div className="card-header" id="headingThree">
                                            <h2 className="mb-0">
                                                <i className="fa fa-plus-circle" style={{ fontSize: '30px', color: '#007bff' }} data-toggle="collapse" data-target="#collapseFourth" aria-hidden="true"><button type="button" className="btn btn-link collapsed" data-toggle="collapse" >Professions</button></i>
                                            </h2>
                                        </div>
                                        <div id="collapseFourth" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                            <ProfessionsForm />
                                        </div>
                                    </div>
                                    <ProfessionListing />
                                    <div className="card">
                                        <div className="card-header" id="headingThree">
                                            <h2 className="mb-0">
                                                <i className="fa fa-plus-circle" style={{ fontSize: '30px', color: '#007bff' }} data-toggle="collapse" data-target="#collapseFive" aria-hidden="true"><button type="button" className="btn btn-link collapsed" data-toggle="collapse" >Add phone number</button></i>
                                            </h2>
                                        </div>
                                        <div id="collapseFive" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                        <PhoneNum />
                                        </div>
                                    </div>
                                    <PhoneNoListing />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </React.Fragment >
    )
}

export default UserAddMoreDetails;