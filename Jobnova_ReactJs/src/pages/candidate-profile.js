import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";


import bg1 from "../assets/images/hero/bg5.jpg"
import company1 from "../assets/images/company/linkedin.png"
import company2 from "../assets/images/company/lenovo-logo.png"
import pdf from "../assets/images/calvin-carlo-resume.pdf"
import image1 from "../assets/images/team/01.jpg"

import NavbarDark from "../componants/navbarDark";
import Footer from "../componants/footer";
import ScrollTop from "../componants/scrollTop";

import { candidateSkill, candidatesData } from "../data/data";
import {FiSettings, FiMail, FiGift, FiHome, FiMapPin, FiGlobe,FiPhone, FiDribbble, FiLinkedin, FiFacebook, FiInstagram, FiTwitter,FiDownload, FiMessageCircle, FiFileText} from "../assets/icons/vander"
import axios from "axios";

export default function CandidateProfile(){
    let params = useParams();
    let id = params.id
    let data = candidatesData.find((candidates)=>candidates.id === parseInt(id))

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [introduction, setIntroduction] = useState(null);
    const [skills, setSkills] = useState([]);
    const [resumes, setResumes] = useState([])



   async function getCandidateData(){
        const response = axios.get("http://localhost:5259/getCandidateInformation", {
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            params:{
                id: params.id.slice(1)
            }

        })

       return response;
    }

    useEffect(() =>{getCandidateData().then(res=>
    {
        setFirstName(res.data.firstName)
        setLastName(res.data.lastName)
        setEmail(res.data.email)
        setIntroduction(res.data.introduction)
        setSkills(res.data.skills)
        setResumes(res.data.resumes)

    })},[])

    return(
        <>
        <NavbarDark/>
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="position-relative">
                            <div className="candidate-cover">
                                <img src={bg1} className="img-fluid rounded shadow" alt=""/>
                            </div>
                            <div className="candidate-profile d-flex align-items-end justify-content-between mx-2">
                                <div className="d-flex align-items-end">
                                    <img src={data?.image ? data.image : image1} className="rounded-pill shadow border border-3 avatar avatar-medium" alt=""/>

                                    <div className="ms-2">
                                        <div className="d-flex flex-row gap-1">
                                            <h5 className="mb-0">{firstName}</h5>
                                            <h5 className="mb-0">{lastName}</h5>
                                        </div>
                                        <p className="text-muted mb-0">{data?.post ? data.post : 'Web Designer'}</p>
                                    </div>
                                </div>

                                <Link to="/candidate-profile-setting" className="btn btn-sm btn-icon btn-pills btn-soft-primary"><FiSettings className="icons"/></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-4">
                <div className="row g-4">
                    <div className="col-lg-8 col-md-7 col-12">
                        {introduction !== null && (
                            <>
                                <h5 className="mb-4">Introduction:</h5>
                                <div>
                                    <p className="text-muted">{introduction}</p>
                                </div>
                            </>
                        )}

                        <h5 className="mt-4">Skills:</h5>
                        <div>
                            {skills?.map((skill, index) => (
                                <h2>{skill?.description}</h2>
                            ))}
                        </div>

                        <h5 className="mt-4">Experience:</h5>

                        <div className="row">
                            <div className="col-12 mt-1">
                                <div className="d-flex flex-column">
                                    {resumes.map((resume, index) => (
                                        <div className="p-4 rounded shadow mt-4">
                                            <h5>{resume.description}</h5>
                                            <div className="container">
                                                {resume.skills.map((skill, index) => (
                                                    <div className="card">{skill}</div>
                                                ))}
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            </div>
                            
                            <div className="col-12 mt-4">
                                <div className="d-flex">
                                    <div className="text-center">
                                        <img src={company2} className="avatar avatar-small bg-white shadow p-2 rounded" alt=""/>
                                        <h6 className="text-muted mt-2 mb-0">2017-19</h6>
                                    </div>

                                    <div className="ms-3">
                                        <h6 className="mb-0">Back-end Developer</h6>
                                        <p className="text-muted">Lenovo - China</p>
                                        <p className="text-muted mb-0">It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time certain letters were added or deleted at various positions within the text.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded shadow mt-4">
                            <h5>Get in touch !</h5>
                            <form className="mt-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Your Name <span className="text-danger">*</span></label>
                                            <input name="name" id="name" type="text" className="form-control" placeholder="Name :"/>
                                        </div>
                                    </div>
    
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Your Email <span className="text-danger">*</span></label>
                                            <input name="email" id="email" type="email" className="form-control" placeholder="Email :"/>
                                        </div> 
                                    </div>
    
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Subject</label>
                                            <input name="subject" id="subject" className="form-control" placeholder="Subject :"/>
                                        </div>
                                    </div>
    
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Comments <span className="text-danger">*</span></label>
                                            <textarea name="comments" id="comments" rows="4" className="form-control" placeholder="Message :"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="d-grid">
                                            <button type="submit" id="submit" name="send" className="btn btn-primary">Send Message</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-md-5 col-12">
                        <div className="card bg-light p-4 rounded shadow sticky-bar">
                            <h5 className="mb-0">Personal Detail:</h5>
                            <div className="mt-3">
                                {email !== "" && (
                                    <>
                                        <div className="d-flex align-items-center justify-content-between mt-3">
                                            <span
                                                className="d-inline-flex align-items-center text-muted fw-medium"><FiMail
                                                className="fea icon-sm me-2"/> Email:</span>
                                            <span className="fw-medium">{email}</span>
                                        </div>
                                    </>
                                )}


                                <div className="d-flex align-items-center justify-content-between mt-3">
                                    <span className="d-inline-flex align-items-center text-muted fw-medium"><FiGift
                                        className="fea icon-sm me-2"/> D.O.B.:</span>
                                    <span className="fw-medium">31st Dec, 1996</span>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-3">
                                    <span className="d-inline-flex align-items-center text-muted fw-medium"><FiHome className="fea icon-sm me-2"/> Address:</span>
                                    <span className="fw-medium">15 Razy street</span>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-3">
                                    <span className="d-inline-flex align-items-center text-muted fw-medium"><FiMapPin className="fea icon-sm me-2"/> City:</span>
                                    <span className="fw-medium">London</span>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-3">
                                    <span className="d-inline-flex align-items-center text-muted fw-medium"><FiGlobe className="fea icon-sm me-2"/> Country:</span>
                                    <span className="fw-medium">UK</span>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-3">
                                    <span className="d-inline-flex align-items-center text-muted fw-medium"><FiPhone className="fea icon-sm me-2"/> Mobile:</span>
                                    <span className="fw-medium">(+125) 1542-8452</span>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-3">
                                    <span className="text-muted fw-medium">Social:</span>
                                    
                                    <ul className="list-unstyled social-icon text-sm-end mb-0">
                                        <li className="list-inline-item"><Link to="https://dribbble.com/shreethemes" target="_blank" className="rounded"><FiDribbble className="fea icon-sm align-middle"/></Link></li>
                                        <li className="list-inline-item"><Link to="http://linkedin.com/company/shreethemes" target="_blank" className="rounded"><FiLinkedin className="fea icon-sm align-middle"/></Link></li>
                                        <li className="list-inline-item"><Link to="https://www.facebook.com/shreethemes" target="_blank" className="rounded"><FiFacebook className="fea icon-sm align-middle"/></Link></li>
                                        <li className="list-inline-item"><Link to="https://www.instagram.com/shreethemes/" target="_blank" className="rounded"><FiInstagram className="fea icon-sm align-middle"/></Link></li>
                                        <li className="list-inline-item"><Link to="https://twitter.com/shreethemes" target="_blank" className="rounded"><FiTwitter className="fea icon-sm align-middle"/></Link></li>
                                    </ul>
                                </div>

                                <div className="p-3 rounded shadow bg-white mt-2">
                                    <div className="d-flex align-items-center mb-2">
                                        <FiFileText className="fea icon-md"/>
                                        <h6 className="mb-0 ms-2">calvin-carlo-resume.pdf</h6>
                                    </div>

                                    <Link to={pdf} download="pdf" target='_blank' className="btn btn-primary w-100"><FiDownload className="fea icon-sm me-1"/> Download CV</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-100 mt-60">
                <div className="row justify-content-center mb-4 pb-2">
                    <div className="col-12">
                        <div className="section-title text-center">
                            <h4 className="title mb-3">Related Candidates</h4>
                            <p className="text-muted para-desc mx-auto mb-0">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide.</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {candidatesData.slice(0,4).map((item,index)=>{
                        return(
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-4 pt-2" key={index}>
                            <div className="candidate-card position-relative overflow-hidden text-center shadow rounded p-4">
                                <div className="content">
                                    <img src={item.image} className="avatar avatar-md-md rounded-pill shadow-md" alt=""/>

                                    <div className="mt-3">
                                        <Link to={`/candidate-profile/${item.id}`} className="title h5 text-dark">{item.name}</Link>
                                        <p className="text-muted mt-1">{item.post}</p>

                                        <span className="badge bg-soft-primary rounded-pill">Design</span>
                                        <span className="badge bg-soft-primary rounded-pill">UI</span>
                                        <span className="badge bg-soft-primary rounded-pill">UX</span>
                                        <span className="badge bg-soft-primary rounded-pill">Digital</span>
                                    </div>

                                    <div className="mt-2 d-flex align-items-center justify-content-between">
                                        <div className="text-center">
                                            <p className="text-muted fw-medium mb-0">Salary:</p>
                                            <p className="mb-0 fw-medium">{item.salary}</p>
                                        </div>

                                        <div className="text-center">
                                            <p className="text-muted fw-medium mb-0">Experience:</p>
                                            <p className="mb-0 fw-medium">{item.experience}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-3">
                                        <Link to="/candidate-profile" className="btn btn-sm btn-primary me-1">View Profile</Link>
                                        <Link to="/contactus" className="btn btn-sm btn-icon btn-soft-primary"><FiMessageCircle className="icons"/></Link>
                                    </div>

                                    <Link to="#" className="like"><i className="mdi mdi-heart align-middle fs-4"></i></Link>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </section>
        <Footer top={true}/>
        <ScrollTop/>
        </>
    )
}