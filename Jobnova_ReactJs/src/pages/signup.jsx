import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

import bg1 from '../assets/images/hero/bg3.jpg'
import logo from '../assets/images/logo-dark.png'
import axios from "axios";

export default function Signup(){

    const navigate = useNavigate();

    const [role, setRole] = React.useState("Candidate")
    const [name, setName] = React.useState(null)
    const [email, setEmail] = React.useState(null)
    const [password, setPassword] = React.useState(null)

    const [lastName, setLastName] = React.useState("")
    function handleChangeRole(event){
        if(role !== event.target.value)
        {
            setRole(event.target.value)
            setName(null)
            setEmail(null)
            setPassword(null)
            setLastName(null)
        }
    }

    async function handleSubmit(e){
        e.preventDefault();

        const data = {
            firstName: name,
            lastName: (lastName === null)? "null" : lastName,
            email: email,
            role: role,
            password: password,
        }
        const response = await axios.post("http://localhost:5259/register", data,
            {
                headers:{
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                if(response.status === 200){
                    navigate("/login")
                }
            })
    }



    return(
        <section className="bg-home d-flex align-items-center" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'center'}}>
            <div className="bg-overlay bg-linear-gradient-2"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-5 col-12">
                        <div className="p-4 bg-white rounded shadow-md mx-auto w-100" style={{maxWidth:'400px'}}>
                            <form onSubmit={handleSubmit}>
                                <Link to="/"><img src={logo} className="mb-4 d-block mx-auto" alt=""/></Link>
                                <h6 className="mb-3 text-uppercase fw-semibold">Register your account</h6>

                                {role === "Candidate" && (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Your First Name</label>
                                            <input value={name || ''} onChange={event => setName(event.target.value)}
                                                   name="name" id="name" required={true} type="text"
                                                   className="form-control"
                                                   placeholder="Calvin"/>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Your First Name</label>
                                            <input value={lastName || ''} onChange={event => setLastName(event.target.value)}
                                                   name="name" id="name" required={true} type="text"
                                                   className="form-control"
                                                   placeholder="Clein"/>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Your Email</label>
                                            <input value={email || ''} onChange={event => setEmail(event.target.value)}
                                                   name="email" id="email" required={true} type="email"
                                                   className="form-control"
                                                   placeholder="example@website.com"/>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-semibold"
                                                   htmlFor="loginpass">Password</label>
                                            <input value={password || ''}
                                                   onChange={event => setPassword(event.target.value)}
                                                   type="password" minLength={8} className="form-control" id="loginpass"
                                                   required={true}
                                                   placeholder="Password"/>
                                        </div>
                                    </>
                                )}

                                {role === "Employer" && (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Company Name</label>
                                            <input value={name || ''} onChange={event => setName(event.target.value)}
                                                   name="name" id="name" required={true} type="text" className="form-control"
                                                   placeholder="Best Company"/>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Company Email</label>
                                            <input value={email || ''} onChange={event => setEmail(event.target.value)}
                                                name="email" id="email" required={true} type="email" className="form-control"
                                                   placeholder="example@website.com"/>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-semibold"
                                                   htmlFor="loginpass">Password</label>
                                            <input value={password || ''} onChange={event => setPassword(event.target.value)}
                                                type="password" minLength={8} className="form-control" id="loginpass" required={true}
                                                   placeholder="Password"/>
                                        </div>
                                    </>
                                )}


                                {/*Выбор ролей пользователя*/}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold" htmlFor="loginpass">Role</label>
                                    <div className="form-check mb-3">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-secondary btn-sm" value="Candidate"
                                                    onClick={event => handleChangeRole(event)}>Candidate
                                            </button>
                                            <button type="button" className="btn btn-secondary btn-sm" value="Employer"
                                                    onClick={event => handleChangeRole(event)}>Employer
                                            </button>
                                        </div>
                                    </div>

                                    {/* <div className="form-check mb-3">
                                        <input className="form-check-input" type="radio" value="Candidate"
                                               onSelect={() => setRole("Candidate")}
                                               id="role1"/>
                                        <label htmlFor="role1" className="form-label form-check-label text-muted"
                                               htmlFor="flexCheckDefault">Candidate</label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="radio" value="Employer"
                                               onSelect={() => setRole("Employer")}
                                               id="role1"/>
                                        <label htmlFor="role1" className="form-label form-check-label text-muted"
                                               htmlFor="flexCheckDefault">Employer</label>
                                    </div>
                                    */}

                                </div>


                                <button className="btn btn-primary w-100" type="submit">Register</button>

                                <div className="col-12 text-center mt-3">
                                    <span><span
                                        className="text-muted small me-2">Already have an account ? </span> <Link
                                        to="/login" className="text-dark fw-semibold small">Sign in</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}