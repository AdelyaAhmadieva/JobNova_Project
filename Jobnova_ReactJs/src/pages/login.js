import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import bg1 from '../assets/images/hero/bg3.jpg'
import logo from '../assets/images/logo-dark.png'
import {useDispatch, useSelector} from "react-redux";
import {getToken} from "../store/tokenSlice";
import {getUserData} from "../store/userSlice";
import {getCandidateData} from "../store/userCandidateSlice";
import {getEmployerData} from "../store/userEmployerSlice";

export default function Login(){
    //States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Global states
    const token = useSelector(state=>state.token);
    const user = useSelector(state=>state.user);

    const userCandidate = useSelector(state=>state.candidate);
    const userEmployer = useSelector(state => state.employer);

    function handleLogin(e){
        e.preventDefault();
        localStorage.removeItem("token")
        let credentials ={
            Email: email,
            Password: password
        }
        dispatch(getToken(credentials)).then(res=>{
            if(res.payload){
                dispatch(getUserData(localStorage.getItem("token"))).then((res) => {
                    if(res.payload.role === "Candidate"){
                        dispatch(getCandidateData())
                    }
                    if(res.payload.role === "Employer"){
                        dispatch(getEmployerData())
                    }
                })
                navigate("/")
            }
        });


    }


    return(
        <section className="bg-home d-flex align-items-center" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'center'}}>
            <div className="bg-overlay bg-linear-gradient-2"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-5 col-12">
                        <div className="p-4 bg-white rounded shadow-md mx-auto w-100" style={{maxWidth:'400px'}}>
                            <form onSubmit={handleLogin}>
                                <Link to="/"><img src={logo} className="mb-4 d-block mx-auto" alt=""/></Link>
                                <h6 className="mb-3 text-uppercase fw-semibold">Please sign in</h6>
                            
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Your Email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)}
                                           name="email" id="email" type="email" className="form-control" placeholder="example@website.com"/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold" htmlFor="loginpass">Password</label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)}
                                           type="password" className="form-control" id="loginpass" placeholder="Password"/>
                                </div>
                            
                                <div className="d-flex justify-content-between">
                                    <div className="mb-3">
                                        <div className="form-check">
                                            {token.error === "ERR_BAD_REQUEST" &&
                                                (
                                                    <label className="form-label form-check-label text-danger"
                                                           htmlFor="flexCheckDefault">Incorrect Password or Email</label>
                                                )}

                                        </div>
                                    </div>
                                </div>


                                <button className="btn btn-primary w-100" type="submit">Sign in</button>





                                <div className="col-12 text-center mt-3">
                                    <span><span className="text-muted me-2 small">Don't have an account ?</span> <Link to="/signup" className="text-dark fw-semibold small">Sign Up</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}