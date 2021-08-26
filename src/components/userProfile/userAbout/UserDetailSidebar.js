import React, { useEffect, useMemo, useState } from 'react';
import './../../../App.css';
import AddressForm from "./addMoreDetailUserForm/AddressForm";
import AddressListing from "./addMoreDetailUserForm/AddressListing";
import Education from "./addMoreDetailUserForm/EducationForm";
import EducationListing from "./addMoreDetailUserForm/EducationListing";
import AboutMe from "./addMoreDetailUserForm/AboutMe";
import AboutMeListing from "./addMoreDetailUserForm/AboutMeListing";
import Profession from "./addMoreDetailUserForm/ProfessionsForm";
import ProfessionListing from "./addMoreDetailUserForm/ProfessionListing";
import Relationship from "./addMoreDetailUserForm/RelationshipStatusForm";
import RelationShipListing from "./addMoreDetailUserForm/RelationShipListing";
import WorkPlace from "./addMoreDetailUserForm/WorkPlaceForm";
import WorkPlaceListing from "./addMoreDetailUserForm/WorkPlaceListing";
import UserLikePostCount from "./UserLikePostCount";
import PhoneNum from "./addMoreDetailUserForm/PhoneNum";
import PhoneNoListing from "./addMoreDetailUserForm/PhoneNoListing";
import UserProfileSecurity from "./addMoreDetailUserForm/UserProfileSecurity"
import ContactInfo from "./addMoreDetailUserForm/ContactInfo";
import { useParams } from "react-router-dom";
import BlackUserAboutDetail from './BlackDetail/BlackUserAboutDetail';
import Loader from './../../loader/Loader';

import { getPhoneNo, postPhoneNo } from "../../../store/actions/about";
import {
    closeAboutDetailForm,
    closeEducaForm,
    closeAddreForm,
    closeProfessForm,
    closeWorkPlaceForm,
    closeRelaShipForm,
    closePhoNoForm
}
    from "../../../store/actions/closeForm";

import { accodionAction } from "../../../store/actions/accodionAction";
import { useSelector, useDispatch } from "react-redux";


const UserDetailSidebar = () => {
    const dispatch = useDispatch();
    const addPnoneNo = useSelector(state => state.aboutReducer.addPnoneNo);
    const phoneNo = useSelector(state => state.aboutReducer.phoneno);
    // const descStatus = useSelector(state => state.closeFormReducer.descStatus);
    // const educaStatus = useSelector(state => state.closeFormReducer.educaStatus);
    // const addressStatus = useSelector(state => state.closeFormReducer.addressStatus);
    // const profeStatus = useSelector(state => state.closeFormReducer.profeStatus);
    // const workPaceStatus = useSelector(state => state.closeFormReducer.workPaceStatus);
    // const relaShipStatus = useSelector(state => state.closeFormReducer.relaShipStatus);
    // const phoNoStatus = useSelector(state => state.closeFormReducer.phoNoStatus);
    const otherUserFlag = useSelector(state => state.userFlagReducer.userFlag);

    const { aboutMe, address, education, phone_no, relationship, work_place, profession } = useSelector(state => state.accordionReducer);

    let { id: otherUserId } = useParams();
    console.log("flag", phoneNo);

    // useEffect(() => {
    //     console.log("otherUserId", otherUserId, localStorage.getItem('userId'))
    //     if (otherUserId != localStorage.getItem('userId')) {
    //         console.log("userdata")
    //         // localStorage.setItem('flag', 0)
    //         localStorage.setItem('otherId',otherUserId)
    //         localStorage.setItem('flag',1);
    //     }
    // }, [otherUserId])
    const validateFormat = (type) => {
        if (phoneNo) {
            for (let i = 0; i < phoneNo.User.aboutus.length; i++) {
                if (phoneNo.User.aboutus[i].type.toUpperCase() === type.toUpperCase()) {
                    return true;
                }
            }
        }
    }

    const renderDescriptionForm = () => {
        const identifier = validateFormat('about_me');
        if (identifier) {
            return <AboutMeListing />
        }
        else {
            return (
                <>
                    {localStorage.getItem('flag') == 0 ?
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header" id="headingFourth">
                                    <h2 className="mb-0">
                                        <i className="fa fa-plus-circle" style={{ fontSize: '30px', color: '#007bff' }} data-toggle="collapse" data-target="#collapseFourth" aria-hidden="true"><button type="button" className="btn btn-link"
                                            onClick={() =>
                                                dispatch(accodionAction({ about_me: 'about_me', status: true }))
                                            }
                                        >

                                            About Me</button> </i>
                                    </h2>
                                </div>
                                {aboutMe.value != undefined && aboutMe.value &&
                                    <div id="collapseFourth" className="collapse" aria-labelledby="headingFourth" data-parent="#accordionExample">
                                        <AboutMe />
                                    </div>
                                }
                            </div>
                        </div>
                        :
                        <BlackUserAboutDetail />
                    }
                </>
            );
        }
    }

    const renderAddressForm = () => {
        const identifier = validateFormat('address');
        if (identifier) {
            return <AddressListing />
        }
        else {
            return (
                <>
                    {localStorage.getItem('flag') == 0 ?
                        //  phoneNo != undefined && phoneNo.User.aboutus.length ==  0 &&
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header" id="headingOne">
                                    <h2 className="mb-0">
                                        <i className="fa fa-plus-circle" style={{ fontSize: '30px', color: '#007bff' }} data-toggle="collapse" data-target="#collapseOne" aria-hidden="true"><button type="button" className="btn btn-link"

                                            onClick={() =>
                                                dispatch(accodionAction({ address: 'address', status: true }))
                                            }
                                        >
                                            Add Address</button> </i>
                                    </h2>
                                </div>
                                {address.value != undefined && address.value &&
                                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                        <AddressForm />
                                    </div>
                                }
                            </div>
                        </div>
                        :
                        <BlackUserAboutDetail />
                    }
                </>
            );
        }
    }


    const renderEducationForm = () => {
        const identifier = validateFormat('university');
        if (identifier) {
            return <EducationListing />
        }
        else {
            return (
                <>
                    {localStorage.getItem('flag') == 0 ?
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header" id="headingTwo">
                                    <h2 className="mb-0">
                                        <i className="fa fa-plus-circle" style={{ fontSize: '30px', color: '#007bff' }} data-toggle="collapse" data-target="#collapseTwo" aria-hidden="true"><button type="button" className="btn btn-link"
                                            onClick={() => {
                                                dispatch(accodionAction({ education: 'education', status: true }))
                                            }}>Add Education</button> </i>
                                    </h2>
                                </div>
                                {education.value != undefined && education.value &&
                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                        <Education />
                                    </div>
                                }
                            </div>
                        </div>
                        :
                        <BlackUserAboutDetail />
                    }
                </>
            );
        }
    }

    const renderProfessionForm = () => {
        const identifier = validateFormat('profession');
        if (identifier) {
            return <ProfessionListing />
        }
        else {
            return (
                <>
                    {localStorage.getItem('flag') == 0 ?
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header" id="headingSix">
                                    <h2 className="mb-0">
                                        <i className="fa fa-plus-circle" style={{ fontSize: '30px', color: '#007bff' }} data-toggle="collapse" data-target="#collapseSix" aria-hidden="true"><button type="button" className="btn btn-link" onClick={() => {
                                            dispatch(accodionAction({ profession: 'profession', status: true }))
                                        }}> Add Profession</button> </i>
                                    </h2>
                                </div>
                                {profession.value != undefined && profession.value &&
                                    <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
                                        <Profession />
                                    </div>
                                }
                            </div>
                        </div>
                        :
                        <BlackUserAboutDetail />
                    }
                </>
            );
        }
    }

    const renderWorkPlaceForm = () => {
        const identifier = validateFormat('work_place');
        if (identifier) {
            return <WorkPlaceListing />;
        }
        else {
            return (
                <>
                    {localStorage.getItem('flag') == 0 ?
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header" id="headingSeven">
                                    <h2 className="mb-0">
                                        <i className="fa fa-plus-circle" style={{ fontSize: '30px', color: '#007bff' }} data-toggle="collapse" data-target="#collapseSeven" aria-hidden="true"><button type="button" className="btn btn-link" onClick={() => {
                                            dispatch(accodionAction({ work_place: 'work_place', status: true }))
                                        }}>Add Work Place</button> </i>
                                    </h2>
                                </div>
                                {work_place.value != undefined && work_place.value &&
                                    <div id="collapseSeven" className="collapse" aria-labelledby="headingSeven" data-parent="#accordionExample">
                                        <WorkPlace />
                                    </div>
                                }
                            </div>
                        </div>
                        :
                        <BlackUserAboutDetail />
                    }
                </>
            );
        }
    }

    const renderRelationShipForm = () => {
        const identifier = validateFormat('relationship');
        if (identifier) {
            return <RelationShipListing />
        }
        else {
            return (
                <>
                    {localStorage.getItem('flag') == 0 ?
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header" id="headingEight">
                                    <h2 className="mb-0">
                                        <i className="fa fa-plus-circle" style={{ fontSize: '30px', color: '#007bff' }} data-toggle="collapse" data-target="#collapseEight" aria-hidden="true"><button type="button" className="btn btn-link" onClick={() => {
                                            dispatch(accodionAction({ relationship: 'relationship', status: true }))
                                        }}>Add Relationship</button> </i>
                                    </h2>
                                </div>
                                {relationship.value != undefined && relationship.value &&
                                    <div id="collapseEight" className="collapse" aria-labelledby="headingEight" data-parent="#accordionExample">
                                        <Relationship />
                                    </div>
                                }
                            </div>
                        </div>
                        :
                        <BlackUserAboutDetail />
                    }
                </>
            );
        }
    }

    const renderPhoneNoForm = () => {
        const identifier = validateFormat('phone_no');
        if (identifier) {
            return <PhoneNoListing />
        }
        else {
            return (
                <>
                    {localStorage.getItem('flag') == 0 ?
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header" id="headingNine">
                                    <h2 className="mb-0">
                                        <i className="fa fa-plus-circle" style={{ fontSize: '30px', color: '#007bff' }} data-toggle="collapse" data-target="#collapseNine" aria-hidden="true"><button type="button" className="btn btn-link" onClick={() => {
                                            dispatch(accodionAction({ phone_no: 'phone_no', status: true }))
                                        }}>Add phone number</button> </i>
                                    </h2>
                                </div>
                                {phone_no.value != undefined && phone_no.value &&
                                    <div id="collapseNine" className="collapse" aria-labelledby="headingNine" data-parent="#accordionExample">
                                        {/* {phoNoStatus} <PhoneNum /> */}
                                        <PhoneNum />
                                    </div>
                                }
                            </div>
                        </div>
                        :
                        <BlackUserAboutDetail />
                    }
                </>
            );
        }
    }

    useEffect(() => {
        dispatch(getPhoneNo());
    }, [addPnoneNo]);

    return (
        <React.Fragment>
            <div className="container-fluid gedf-wrapper">
                <div className="row">
                    <div className="col-sm-6 col-lg-4">
                        <ul className="list-group nav nav-pills nav-stacked">
                            <li className="list-group-item text-bold list-group-item list-group-item-action active"><h5>About</h5></li>
                            <li className="list-group-item cursor-pointer " style={{ backgroundColor: 'rgb(247, 240, 240)' }} onClick={() => { dispatch(accodionAction({ notMatch: 'notMatch' })) }}><a data-toggle="tab" href="#home">Overview</a></li>
                            <li className="list-group-item cursor-pointer " ><a data-toggle="tab" href="#aboutme" onClick={() => { dispatch(accodionAction({ about_me: 'about_me', status: false })) }}>About me</a></li>
                            <li className="list-group-item cursor-pointer " ><a data-toggle="tab" href="#address" onClick={() => { dispatch(accodionAction({ address: 'address', status: false })) }}>Address</a></li>
                            <li className="list-group-item cursor-pointer"><a data-toggle="tab" href="#education" onClick={() => { dispatch(accodionAction({ education: 'education', status: false })) }}>Education</a></li>
                            <li className="list-group-item cursor-pointer"><a data-toggle="tab" href="#profession" onClick={() => { dispatch(accodionAction({ profession: 'profession', status: false })) }}>Professions</a></li>
                            <li className="list-group-item cursor-pointer"><a data-toggle="tab" href="#workplace" onClick={() => { dispatch(accodionAction({ work_place: 'work_palce', status: false })) }}>Work Place</a></li>
                            <li className="list-group-item cursor-pointer"><a data-toggle="tab" href="#relationship" onClick={() => { dispatch(accodionAction({ relationship: 'relationship', status: false })) }}>Relationships</a></li>
                            <li className="list-group-item cursor-pointer"><a data-toggle="tab" href="#contactInfo" onClick={() => { dispatch(accodionAction({ security: 'contactInfo', status: false })) }}>Contact Info</a></li>
                            <li className="list-group-item cursor-pointer"><a data-toggle="tab" href="#security" onClick={() => { dispatch(accodionAction({ security: 'security', status: false })) }}>Security & Privacy</a></li>

                     </ul>
                        <UserLikePostCount />
                    </div>
                    <div class=" col-sm-6 col-lg-8 tab-content">
                        <div id="home" class="tab-pane fade show active">
                            <div className="card">
                                <div className="card-body" >
                                    {
                                        renderDescriptionForm()
                                    }
                                    {
                                        renderAddressForm()
                                    }
                                    {
                                        renderEducationForm()
                                    }
                                    {
                                        renderProfessionForm()
                                    }
                                    {
                                        renderWorkPlaceForm()
                                    }
                                    {
                                        renderRelationShipForm()
                                    }
                                    {
                                        renderPhoneNoForm()
                                    }
                                    {
                                         <ContactInfo />

                                    }
                                </div>


                            </div>
                        </div>
                        {/*start about me section*/}
                        <div id="aboutme" class="tab-pane ">
                            <div className="card">
                                <div className="card-body" >
                                    {
                                        renderDescriptionForm()
                                    }
                                </div>
                            </div>
                        </div>
                        {/*end user about me section*/}
                        {/*start address section*/}
                        <div id="address" class="tab-pane ">
                            <div className="card">
                                <div className="card-body" >
                                    {localStorage.getItem('flag') == 0 ?

                                        <div className="accordion" id="accordionExample">
                                            <div className="card">
                                                <div className="card-header" id="headingOne">
                                                    <h2 className="mb-0">
                                                        <i className="fa fa-plus-circle" style={{ fontSize: '30px', color: '#007bff' }} data-toggle="collapse" data-target="#collapseOne" aria-hidden="true"><button type="button" className="btn btn-link" onClick={() =>  dispatch(accodionAction({ address: 'address', status: true }))}>Add Address</button> </i>
                                                    </h2>
                                                </div>
                                                {address.value != undefined && address.value &&
                                                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                        <AddressForm />
                                                    </div>
                                                }
                                            </div>
                                        </div>

                                        :
                                        phoneNo != undefined && phoneNo.User.aboutus.map((aboutDetail) => (
                                            aboutDetail.type == 'address' && JSON.parse(aboutDetail.address).address == '' && <BlackUserAboutDetail />
                                        ))

                                    }
                                </div>
                                <AddressListing />
                            </div>
                        </div>
                        {/*start education section*/}
                        <div id="education" class="tab-pane ">
                            <div className="card">
                                <div className="card-body" >
                                    {localStorage.getItem('flag') == 0 ? <div className="accordion" id="accordionExample">
                                        <div className="card">
                                            <div className="card-header" id="headingFive">
                                                <h2 className="mb-0">
                                                    <i className="fa fa-plus-circle" style={{ fontSize: '30px', color: '#007bff' }} data-toggle="collapse" data-target="#collapseFive" aria-hidden="true"><button type="button" className="btn btn-link" onClick={() => dispatch(accodionAction({ education: 'education', status: true }))}>Add Education</button> </i>
                                                </h2>
                                            </div>
                                            {
                                                education.value != undefined && education.value &&
                                                <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                                                    <Education />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                        :
                                        phoneNo != undefined && phoneNo.User.aboutus.map((aboutDetail) => (
                                            aboutDetail.type == 'university' && JSON.parse(aboutDetail.university).qualifi == '' && <BlackUserAboutDetail />
                                        ))

                                    }
                                </div>
                                <EducationListing />
                            </div>
                        </div>
                        {/*end user education section*/}
                        {/*start profession section*/}
                        <div id="profession" class="tab-pane">
                            <div className="card">
                                <div className="card-body" >
                                    {/* <div className="accordion" id="accordionExample">
                                        <div className="card">
                                            <div className="card-header" id="headingSix">
                                                <h2 className="mb-0">
                                                    <i className="fa fa-plus-circle" style={{ fontSize: '30px', color: '#007bff' }} data-toggle="collapse" data-target="#collapseSix" aria-hidden="true"><button type="button" className="btn btn-link" onClick={() => dispatch(closeProfessForm(true))}>Profession</button> </i>
                                                </h2>
                                            </div>
                                            <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
                                                {profeStatus != undefined && profeStatus && <Profession />}
                                            </div>
                                        </div>
                                    </div> */}
                                    {
                                        renderProfessionForm()
                                    }
                                </div>
                                {/* <ProfessionListing /> */}
                            </div>
                        </div>
                        {/*end user profession section*/}
                        {/*start work place section*/}
                        <div id="workplace" class="tab-pane">
                            <div className="card">
                                <div className="card-body" >
                                    {localStorage.getItem('flag') == 0 ? <div className="accordion" id="accordionExample">
                                        <div className="card">
                                            <div className="card-header" id="headingSeven">
                                                <h2 className="mb-0">
                                                    <i className="fa fa-plus-circle" style={{ fontSize: '30px', color: '#007bff' }} data-toggle="collapse" data-target="#collapseSeven" aria-hidden="true"><button type="button" className="btn btn-link" onClick={() => dispatch(accodionAction({ work_place: 'work_place', status: true }))}>Add Work Place</button> </i>
                                                </h2>
                                            </div>
                                            {
                                                work_place.value != undefined && work_place.value &&

                                                <div id="collapseSeven" className="collapse" aria-labelledby="headingSeven" data-parent="#accordionExample">
                                                    <WorkPlace />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                        :
                                        phoneNo != undefined && phoneNo.User.aboutus.map((aboutDetail) => (
                                            aboutDetail.type == 'work_place' && JSON.parse(aboutDetail.work_place).companyName == '' && <BlackUserAboutDetail />
                                        ))
                                    }
                                </div>
                                <WorkPlaceListing />
                            </div>
                        </div>
                        {/*end user relationship section*/}
                        {/*start relationship section*/}
                        <div id="relationship" class="tab-pane">
                            <div className="card">
                                <div className="card-body" >
                                    {
                                        renderRelationShipForm()
                                    }
                                </div>
                                {/* <div className="card-body" > */}
                                {/* <div className="accordion" id="accordionExample">
                                        <div className="card">
                                            <div className="card-header" id="headingEight">
                                                <h2 className="mb-0">
                                                    <i className="fa fa-plus-circle" style={{ fontSize: '30px', color: '#007bff' }} data-toggle="collapse" data-target="#collapseEight" aria-hidden="true"><button type="button" className="btn btn-link" onClick={() => dispatch(closeRelaShipForm(true))}>Add Relationship</button> </i>
                                                </h2>
                                            </div>
                                            <div id="collapseEight" className="collapse" aria-labelledby="headingEight" data-parent="#accordionExample">
                                                {relaShipStatus != undefined && relaShipStatus && <Relationship />}
                                            </div>
                                        </div>
                                    </div> */}
                                {/* <RelationShipListing /> */}
                                {/* </div> */}
                            </div>
                        </div>
                        {/*end user relationship section*/}
                        {/*start user privacy & security section*/}

                        <div id="security" class="tab-pane">
                            <div className="card">
                                <div className="card-body" >
                                    <UserProfileSecurity />
                                </div>
                               
                            </div>
                        </div>
                        {/*end user privacy & security section*/}
                        {/*start user contact info section*/}
                        <div id="contactInfo" class="tab-pane">
                            <div className="card">
                            

                                <div className="card-body" >
                                <h6>Contact Information</h6>
                                    <ContactInfo />
                                </div>
                               
                            </div>
                        </div>
                        {/*end user contact info section*/}
                        </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UserDetailSidebar;