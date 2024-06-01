import React, {useEffect, useState} from "react";

import image1 from "../assets/images/team/01.jpg"
import bg1 from "../assets/images/hero/bg5.jpg"

import NavbarDark from "../componants/navbarDark";
import Footer from "../componants/footer";
import ScrollTop from "../componants/scrollTop";

import { FiCamera } from "../assets/icons/vander"
import {useDispatch, useSelector} from "react-redux";
import {getCandidateData, updateCandidateData} from "../store/userCandidateSlice";
import {getEmployerData, updateEmployerData} from "../store/userEmployerSlice";
import axios from "axios";
import {Link} from "react-router-dom";

export default function CandidateProfileSetting(){
    let [file, setFile] = useState(image1);
    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    //States for Candidate role
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [skills, setSkills] = useState([]);

    //States for Employer role
    const [employerName, setEmployerName] = useState("");
    const [employerEmail, setEmployerEmail] = useState("");
    const [founder, setFounder] = useState("");
    const [foundingDate, setFoundingDate] = useState("");
    const [address, setAddress] = useState("");
    const [numberOfEmployees, setNumberOfEmployees] = useState("");
    const [employerWebsite, setEmployerWebsite] = useState("");
    const [story, setStory] = useState("");
    const [emailToConnect, setEmailToConnect] = useState("");
    const [vacancies, setVacancies] = useState([]);

    //Stores
    const user = useSelector(state=>state.user);
    const userCandidate = useSelector(state=>state.candidate);
    const userEmployer = useSelector(state=>state.employer);
    const dispatch = useDispatch();

    // Resume Create consts
    const [skillSet, setSkillSet] = useState([
        { id: 1, name: 'HTML' },
        { id: 2, name: 'CSS' },
        { id: 3, name: 'JavaScript' }
    ]);
    const [skillName, setSkillName] = useState()
    const [skillDescription, setSkillDescription] = useState()


    function handleAddSkillToSkillSet(e){
        e.preventDefault();
        if(skillName)
        {
            console.log("SkillName: " + skillName)
            const newSkill = {
                id: skillSet.length + 1,
                name: skillName
            };
            setSkillSet([...skillSet, newSkill]);
            setSkillName("");
        }
    }

    function handleDeleteSkill(e)
    {
        e.preventDefault();
        setSkillSet(skillSet.filter(skill => skill.id != e.target.value))
        console.log(skillSet)
    }




    function handleSubmitCandidate(e){
        e.preventDefault();
        const data = {

            firstName: firstName,
            lastName: lastName,
            email: email,
            introduction: introduction,
            phoneNumber: phone,
            website: website,
            skills: skills
        }
        dispatch(updateCandidateData(data)).then((res) => {
            if(res.payload){
                dispatch(getCandidateData())
            }
        })
    }
    function handleSubmitEmployer(e) {
        e.preventDefault();

        const data = {
            employerName: employerName,
            founder: founder,
            foundingData: foundingDate,
            address: address,
            numberOfEmployees: numberOfEmployees,
            website: employerWebsite,
            story: story,
            emailToConnect: emailToConnect,
            vacancies: vacancies
        }
        dispatch(updateEmployerData(data)).then((res) => {
            if(res.payload){
                dispatch(getEmployerData())
            }
        })
    }

    async function handleCreateResume(e){
        if(skillDescription && skillSet) {
            e.preventDefault();
            const skills = skillSet.map(s => s.name)
            const data = {
                description: skillDescription,
                skills: skills
            }
            const response = await axios.post("http://localhost:5259/candidates/" + user.id + "/resume",
                data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                })
            window.location.reload();
        }
    }
    async function handleDeleteResume(e){
        e.preventDefault();

        await axios.delete(`http://localhost:5259/candidates/${user.id}/resume`,  {
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            params:{
                resumeId: e.target.value
            }
        })
        window.location.reload();
    }

    function setCandidateData(){
        dispatch(getCandidateData()).then((res) => {
            console.log(userCandidate.firstName)
            setFirstName(res.payload.firstName)
            setLastName(res.payload.lastName)
            setEmail(user.email)
            setIntroduction(res.payload.introduction)
            setPhone(res.payload.phoneNumber)
            setWebsite(res.payload.website)
        })
    }
    function setEmployerData(){

        dispatch(getEmployerData()).then((res) => {
            console.log(res)
            setEmployerName(res.payload.employerName)
            setEmployerEmail(user.email)
            setFounder(res.payload.founder)
            setFoundingDate(res.payload.foundingData)
            setAddress(res.payload.address)
            setNumberOfEmployees(res.payload.numberOfEmployees)
            setEmployerWebsite(res.payload.website)
            setStory(res.payload.story)
            setEmailToConnect(res.payload.emailToConnect)
            setVacancies(res.payload.vacancies)
        })
    }


    useEffect(() => {}, [skillSet])
    useEffect(() => {
        if(user.role === "Candidate") {
            setCandidateData()
        }
        if (user.role === "Employer"){
            setEmployerData()
        }
    },[])


    return(
        <>
        <NavbarDark/>
            {user.role === "Candidate" &&
                (
                    <section className="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="position-relative">
                                        <div className="candidate-cover">
                                            <div className="profile-banner relative text-transparent">
                                                <input id="pro-banner"/>
                                                <div className="relative shrink-0">
                                                    <img src={bg1} className="rounded shadow" id="profile-banner"
                                                         alt=""/>
                                                    <label className="profile-image-label" htmlFor="pro-banner"></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="candidate-profile d-flex align-items-end mx-2">
                                            <div className="position-relative">
                                                <input type="file" onChange={handleChange} style={{
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    opacity: '0.01',
                                                    zIndex: '11'
                                                }}/>
                                                <div className="position-relative d-inline-block">
                                                    <img src={file}
                                                         className="avatar avatar-medium img-thumbnail rounded-pill shadow-sm"
                                                         id="profile-image" alt=""/>
                                                    <label className="icons position-absolute bottom-0 end-0"
                                                           htmlFor="pro-img"><span
                                                        className="btn btn-icon btn-sm btn-pills btn-primary"><FiCamera
                                                        className="icons"/></span></label>
                                                </div>
                                            </div>

                                            <div className="ms-2">
                                                <h5 className="mb-0">
                                                    {user.role === "Candidate" && (
                                                    firstName + " " + lastName
                                                )}
                                                    {user.role === "Employer" && (
                                                        employerName
                                                    )}</h5>
                                                <p className="text-muted mb-0">Web Designer</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="rounded shadow p-4">
                                        <form onSubmit={(e) => handleSubmitCandidate(e)}>
                                            <h5>Personal Detail :</h5>
                                            <div className="row mt-4">
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label fw-semibold">First Name:<span
                                                            className="text-danger">*</span></label>
                                                        <input value={firstName || ''}
                                                               onChange={event => setFirstName(event.target.value)}
                                                               name="name" id="firstname" type="text"
                                                               className="form-control" placeholder="First Name :"/>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label fw-semibold">Last Name:<span
                                                            className="text-danger">*</span></label>
                                                        <input value={lastName || ''}
                                                               onChange={event => setLastName(event.target.value)}
                                                               name="name" id="lastname" type="text"
                                                               className="form-control" placeholder="Last Name :"/>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label fw-semibold">Your Email:<span
                                                            className="text-danger">*</span></label>
                                                        <input value={email || ''}
                                                               onChange={event => setEmail(event.target.value)}
                                                               name="email" id="email2" type="email"
                                                               className="form-control" placeholder="Your email :"/>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label fw-semibold">Occupation:</label>
                                                        <select className="form-control form-select" id="Type">
                                                            {/*map option from options state of sth*/}
                                                            <option value="WD">Web Designer</option>
                                                            <option value="WD">Web Developer</option>
                                                            <option value="UI">UI / UX Desinger</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                {/*
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Location:</label>
                                            <select className="form-control form-select" id="Country">
                                                <option value="USA">USA</option>
                                                <option value="CAD">Canada</option>
                                                <option value="CHINA">China</option>
                                            </select>
                                        </div>
                                    </div>
                                    */}

                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="formFile" className="form-label fw-semibold">Upload
                                                            Your Cv / Resume :</label>
                                                        <input className="form-control" type="file" id="formFile"/>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="mb-3">
                                                        <label className="form-label fw-semibold">Introduction :</label>
                                                        <textarea value={introduction}
                                                                  onChange={event => setIntroduction(event.target.value)}
                                                                  name="comments" id="comments2" rows="4"
                                                                  className="form-control"
                                                                  placeholder="Introduction :"></textarea>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <input type="submit" id="submit2" name="send"
                                                           className="submitBnt btn btn-primary" value="Save Changes"/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="rounded shadow p-4 mt-4">
                                        <div className="row">
                                            <div className="col-md-6 mt-2 pt-2">
                                                <h5>Resumes:</h5>
                                                <form>
                                                    <div>
                                                        <div className="col-lg-12">
                                                            <div className="mb-3">
                                                                <label
                                                                    className="form-label fw-semibold">Description:</label>
                                                                <input value={skillDescription || ''}
                                                                       onChange={event => setSkillDescription(event.target.value)}
                                                                       name="number" id="number" type="text"
                                                                       className="form-control"
                                                                       placeholder="Resume description :" required={true} minLength={10}/>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-12 ">
                                                            <div className="mb-3">
                                                                <label
                                                                    className="form-label fw-semibold">Skills:</label>
                                                                <div className="d-flex flex-row gap-2">
                                                                    <input name="number" id="number" type="text"
                                                                           value={skillName || ''}
                                                                           onChange={event => setSkillName(event.target.value)}
                                                                           className="form-control"
                                                                           placeholder="Skill :"/>
                                                                    <button className="btn btn-success"
                                                                            onClick={handleAddSkillToSkillSet}>Add
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/*Skills of resume*/}
                                                        <div className="col-lg-12 mt-2 mb-0 rounded shadow p-4 mt-4 ">
                                                            {skillSet.length > 0 && (
                                                                skillSet.map((skill) => (
                                                                    <button value={skill.id}
                                                                            onClick={event => handleDeleteSkill(event)}
                                                                            className="btn btn-secondary m-1">{skill.name}</button>
                                                                )))}
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-primary mt-4"
                                                            onClick={handleCreateResume}>Create Resume
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    {/*My Resumes*/}
                                    <div className="rounded shadow p-4 mt-4">
                                        <div className="row">
                                            <div className="col-md-6 mt-2 pt-2">
                                                <h5>My Resumes:</h5>
                                                {userCandidate.resumes && (
                                                    userCandidate.resumes.map((resume) => (
                                                        <div id={"resumeBox"+resume.id} className=" rounded shadow p-4 mt-4">
                                                            <div className="d-flex flex-row justify-content-between mb-2">
                                                                <p className="text-body fw-semibold">{resume.description}</p>
                                                                <button value={resume.id} onClick={handleDeleteResume} className="btn btn-danger btn-sm">Delete</button>
                                                            </div>


                                                            <div className="d-flex flex-row gap-2">
                                                            {resume.skills.map((skill) => (
                                                                    <div className="btn btn-secondary">{skill}</div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                          </div>
                                        </div>
                                    </div>

                                    <div className="rounded shadow p-4 mt-4">

                                        <div className="row">
                                            <div className="col-md-6 mt-4 pt-2">
                                                <h5>Contact Info :</h5>

                                                <form>
                                                    <div className="row mt-4">
                                                        <div className="col-lg-12">
                                                            <div className="mb-3">
                                                                <label className="form-label fw-semibold">Phone No.
                                                                    :</label>
                                                                <input name="number" id="number" type="number"
                                                                       className="form-control" placeholder="Phone :"/>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-12">
                                                            <div className="mb-3">
                                                                <label className="form-label fw-semibold">Website
                                                                    :</label>
                                                                <input name="url" id="url" type="url"
                                                                       className="form-control" placeholder="Url :"/>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-12 mt-2 mb-0">
                                                            <button className="btn btn-primary">Add</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                            <div className="col-md-6 mt-4 pt-2">
                                                <h5>Change password :</h5>
                                                <form>
                                                    <div className="row mt-4">
                                                        <div className="col-lg-12">
                                                            <div className="mb-3">
                                                                <label className="form-label fw-semibold">Old password
                                                                    :</label>
                                                                <input type="password" className="form-control"
                                                                       placeholder="Old password" required=""/>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-12">
                                                            <div className="mb-3">
                                                                <label className="form-label fw-semibold">New password
                                                                    :</label>
                                                                <input type="password" className="form-control"
                                                                       placeholder="New password" required=""/>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-12">
                                                            <div className="mb-3">
                                                                <label className="form-label fw-semibold">Re-type New
                                                                    password :</label>
                                                                <input type="password" className="form-control"
                                                                       placeholder="Re-type New password" required=""/>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-12 mt-2 mb-0">
                                                            <button className="btn btn-primary">Save password</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    {/*
                        <div className="rounded shadow p-4 mt-4">
                            <form>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h5>Account Notifications :</h5>

                                        <div className="d-flex justify-content-between mt-4">
                                            <h6 className="mb-0">When someone mentions me</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="noti1"/>
                                                <label className="form-check-label" htmlFor="noti1"></label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-4">
                                            <h6 className="mb-0">When someone follows me</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" defaultChecked id="noti2"/>
                                                <label className="form-check-label" htmlFor="noti2"></label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-4">
                                            <h6 className="mb-0">When shares my activity</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="noti3"/>
                                                <label className="form-check-label" htmlFor="noti3"></label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-4">
                                            <h6 className="mb-0">When someone messages me</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="noti4"/>
                                                <label className="form-check-label" htmlFor="noti4"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <h5>Marketing Notifications :</h5>

                                        <div className="d-flex justify-content-between mt-4">
                                            <h6 className="mb-0">There is a sale or promotion</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="noti5"/>
                                                <label className="form-check-label" htmlFor="noti5"></label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-4">
                                            <h6 className="mb-0">Company news</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="noti6"/>
                                                <label className="form-check-label" htmlFor="noti6"></label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-4">
                                            <h6 className="mb-0">Weekly jobs</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" defaultChecked id="noti7"/>
                                                <label className="form-check-label" htmlFor="noti7"></label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-4">
                                            <h6 className="mb-0">Unsubscribe News</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" defaultChecked id="noti8"/>
                                                <label className="form-check-label" htmlFor="noti8"></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        */}

                                    <div className="rounded shadow p-4 mt-4">
                                        <form>
                                            <h5 className="text-danger">Delete Account :</h5>
                                            <div className="row mt-4">
                                                <h6 className="mb-0">Do you want to delete the account? Please press
                                                    below "Delete" button</h6>
                                                <div className="mt-4">
                                                    <button className="btn btn-danger">Delete Account</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

            {user.role === "Employer" && (
                <section className="section">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="position-relative">
                                    <div className="candidate-cover">
                                        <div className="profile-banner relative text-transparent">
                                            <input id="pro-banner"/>
                                            <div className="relative shrink-0">
                                                <img src={bg1} className="rounded shadow" id="profile-banner"
                                                     alt=""/>
                                                <label className="profile-image-label" htmlFor="pro-banner"></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="candidate-profile d-flex align-items-end mx-2">
                                        <div className="position-relative">
                                            <input type="file" onChange={handleChange} style={{
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                opacity: '0.01',
                                                zIndex: '11'
                                            }}/>
                                            <div className="position-relative d-inline-block">
                                                <img src={file}
                                                     className="avatar avatar-medium img-thumbnail rounded-pill shadow-sm"
                                                     id="profile-image" alt=""/>
                                                <label className="icons position-absolute bottom-0 end-0"
                                                       htmlFor="pro-img"><span
                                                    className="btn btn-icon btn-sm btn-pills btn-primary"><FiCamera
                                                    className="icons"/></span></label>
                                            </div>
                                        </div>

                                        <div className="ms-2 d-flex flex-row align-items-end gap-5">
                                            <div>
                                                <h5 className="mb-0">{employerName}</h5>
                                                <p className="text-muted mb-0">{user.email}</p>
                                            </div>
                                            <Link to="/job-post"><button className="btn btn-primary">Create Vacancy</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="rounded shadow p-4">
                                    <form onSubmit={(e) => handleSubmitEmployer(e)}>
                                        <h5>Personal Detail :</h5>
                                        <div className="row mt-4">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold">Company Name:<span
                                                        className="text-danger">*</span></label>
                                                    <input value={employerName || ''}
                                                           onChange={event => setEmployerName(event.target.value)}
                                                           name="name" id="firstname" type="text"
                                                           className="form-control" placeholder="Company Name:"/>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold">Contact Email<span
                                                        className="text-danger">*</span></label>
                                                    <input value={emailToConnect || ''}
                                                           onChange={event => setEmailToConnect(event.target.value)}
                                                           name="name" id="lastname" type="email"
                                                           className="form-control" placeholder="Email to connect:"/>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold">Founder:<span
                                                        className="text-danger">*</span></label>
                                                    <input value={founder || ''}
                                                           onChange={event => setFounder(event.target.value)}
                                                           name="name" id="lastname" type="text"
                                                           className="form-control" placeholder="Founder Name:"/>
                                                </div>
                                            </div>


                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold">Date of Founding:<span
                                                        className="text-danger">*</span></label>
                                                    <input value={foundingDate || ''}
                                                           onChange={event => setFoundingDate(event.target.value)}
                                                           name="email" id="email2" type="date"
                                                           className="form-control" placeholder="Founding date"/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold">Address:<span
                                                        className="text-danger">*</span></label>
                                                    <input value={address || ''}
                                                           onChange={event => setAddress(event.target.value)}
                                                           name="email" id="email2" type="text"
                                                           className="form-control" placeholder="Headcenter address"/>
                                                </div>
                                            </div>


                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold">Amount of employees:</label>
                                                    <select value={numberOfEmployees || 0} onChange={event => setNumberOfEmployees(event.target.value)}
                                                        className="form-control form-select" id="Type">
                                                        {/*map option from options state of sth*/}
                                                        <option value={10}>{"Over 10"}</option>
                                                        <option value={1000}>{"Over 1000"}</option>


                                                    </select>
                                                </div>
                                            </div>

                                            {/*
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Location:</label>
                                            <select className="form-control form-select" id="Country">
                                                <option value="USA">USA</option>
                                                <option value="CAD">Canada</option>
                                                <option value="CHINA">China</option>
                                            </select>
                                        </div>
                                    </div>
                                    */}


                                            <div className="col-12">
                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold">Stoty :</label>
                                                    <textarea value={story || ''}
                                                              onChange={event => setStory(event.target.value)}
                                                              name="comments" id="comments2" rows="4"
                                                              className="form-control"
                                                              placeholder="Story :"></textarea>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <input type="submit" id="submit2" name="send"
                                                       className="submitBnt btn btn-primary" value="Save Changes"/>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="rounded shadow p-4 mt-4">

                                    <div className="row">
                                        <div className="col-md-6 mt-4 pt-2">
                                            <h5>Contact Info :</h5>

                                            <form>
                                                <div className="row mt-4">
                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label className="form-label fw-semibold">Phone No.
                                                                :</label>
                                                            <input name="number" id="number" type="number"
                                                                   className="form-control" placeholder="Phone :"/>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label className="form-label fw-semibold">Website
                                                                :</label>
                                                            <input name="url" id="url" type="url"
                                                                   className="form-control" placeholder="Url :"/>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 mt-2 mb-0">
                                                        <button className="btn btn-primary">Add</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                        <div className="col-md-6 mt-4 pt-2">
                                            <h5>Change password :</h5>
                                            <form>
                                                <div className="row mt-4">
                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label className="form-label fw-semibold">Old password
                                                                :</label>
                                                            <input type="password" className="form-control"
                                                                   placeholder="Old password" required=""/>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label className="form-label fw-semibold">New password
                                                                :</label>
                                                            <input type="password" className="form-control"
                                                                   placeholder="New password" required=""/>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label className="form-label fw-semibold">Re-type New
                                                                password :</label>
                                                            <input type="password" className="form-control"
                                                                   placeholder="Re-type New password" required=""/>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 mt-2 mb-0">
                                                        <button className="btn btn-primary">Save password</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/*
                        <div className="rounded shadow p-4 mt-4">
                            <form>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h5>Account Notifications :</h5>

                                        <div className="d-flex justify-content-between mt-4">
                                            <h6 className="mb-0">When someone mentions me</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="noti1"/>
                                                <label className="form-check-label" htmlFor="noti1"></label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-4">
                                            <h6 className="mb-0">When someone follows me</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" defaultChecked id="noti2"/>
                                                <label className="form-check-label" htmlFor="noti2"></label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-4">
                                            <h6 className="mb-0">When shares my activity</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="noti3"/>
                                                <label className="form-check-label" htmlFor="noti3"></label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-4">
                                            <h6 className="mb-0">When someone messages me</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="noti4"/>
                                                <label className="form-check-label" htmlFor="noti4"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <h5>Marketing Notifications :</h5>

                                        <div className="d-flex justify-content-between mt-4">
                                            <h6 className="mb-0">There is a sale or promotion</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="noti5"/>
                                                <label className="form-check-label" htmlFor="noti5"></label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-4">
                                            <h6 className="mb-0">Company news</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="noti6"/>
                                                <label className="form-check-label" htmlFor="noti6"></label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-4">
                                            <h6 className="mb-0">Weekly jobs</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" defaultChecked id="noti7"/>
                                                <label className="form-check-label" htmlFor="noti7"></label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-4">
                                            <h6 className="mb-0">Unsubscribe News</h6>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" defaultChecked id="noti8"/>
                                                <label className="form-check-label" htmlFor="noti8"></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        */}

                                <div className="rounded shadow p-4 mt-4">
                                    <form>
                                        <h5 className="text-danger">Delete Account :</h5>
                                        <div className="row mt-4">
                                            <h6 className="mb-0">Do you want to delete the account? Please press
                                                below "Delete" button</h6>
                                            <div className="mt-4">
                                                <button className="btn btn-danger">Delete Account</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <Footer top={true}/>
            <ScrollTop/>
        </>
    )
}