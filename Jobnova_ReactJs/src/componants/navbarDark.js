import React,{useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom'
import logoDark from "../assets/images/logo-dark.png"
import logoLight from "../assets/images/logo-light.png"
import client from "../assets/images/team/01.jpg"
import { LuSearch,FiUser,FiSettings,FiLock,FiLogOut } from "../assets/icons/vander";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/userSlice";

export default function NavbarDark(){
    let [isOpen, setMenu] = useState(true);
    let [scroll, setScroll] = useState(false);
    let [search, setSearch] = useState(false);
    let [cartitem, setCartitem] = useState(false);

    let [manu , setManu] = useState('');
    let location = useLocation();
    useEffect(()=>{
        let current = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
        setManu(current)
    },[location.pathname.substring(location.pathname.lastIndexOf('/') + 1)])

    useEffect(() => {
        function scrollHandler() {
            setScroll(window.scrollY > 50)
          }
        window.addEventListener('scroll', scrollHandler);

        let searchModal = () => {setSearch(false)}
        document.addEventListener('mousedown',searchModal);

        let cartModal = () => {setCartitem(false)}
        document.addEventListener('null',cartModal);

        window.scrollTo(0, 0);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
            document.removeEventListener('mousedown',searchModal);
            document.removeEventListener(null,cartModal);
        };

    }, []);
    const toggleMenu = () => {
        setMenu(!isOpen)
        if (document.getElementById("navigation")) {
            const anchorArray = Array.from(document.getElementById("navigation").getElementsByTagName("a"));
            anchorArray.forEach(element => {
                element.addEventListener('click', (elem) => {
                    const target = elem.target.getAttribute("href")
                    if (target !== "") {
                        if (elem.target.nextElementSibling) {
                            var submenu = elem.target.nextElementSibling.nextElementSibling;
                            submenu.classList.toggle('open');
                        }
                    }
                })
            });
        }
    }

    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logOutHandler(){
        console.log("logout");
        dispatch(logout());
        navigate("/");
    }
    return(
    <header id="topnav" className={ `${scroll ? 'nav-sticky' :''} defaultscroll sticky`}>
        <div className="container">
                <Link className="logo" to="/">
                    <img src={logoDark} className="logo-light-mode" alt=""/>
                    <img src={logoLight} className="logo-dark-mode" alt=""/>
                </Link>
            <div className="menu-extras">
                <div className="menu-item">
                    <Link to='#' className="navbar-toggle" id="isToggle" onClick={toggleMenu}>
                        <div className="lines">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </Link>
                </div>
            </div>

            <ul className="buy-button list-inline mb-0">
                <li className="list-inline-item ps-1 mb-0">
                    <div className="dropdown">
                        <button type="button" onClick={() => setSearch(!search)} className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary">
                            <LuSearch className="icons"/>
                        </button>
                        <div style={{display: search === true ? 'block' : 'none'}}>
                            <div className={`dropdown-menu dd-menu dropdown-menu-end bg-white rounded border-0 mt-3 p-0 show`} style={{width:'240px', position:'absolute',right:'0'}}>
                                <div className="search-bar">
                                    <div id="itemSearch" className="menu-search mb-0">
                                        <form role="search" method="get" id="searchItemform" className="searchform">
                                            <input type="text" className="form-control rounded border" name="s" id="searchItem" placeholder="Search..."/>
                                            <input type="submit" id="searchItemsubmit" value="Search"/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <li className="list-inline-item ps-1 mb-0">
                    <div className="dropdown dropdown-primary">
                        <button type="button" onClick={()=>setCartitem(!cartitem)} className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary">
                            <img src={client} className="img-fluid rounded-pill" alt=""/>
                        </button>
                        <div style={{display: cartitem === true ? 'block' : 'none'}}>
                            <div className={` dropdown-menu dd-menu dropdown-menu-end bg-white rounded shadow border-0 mt-3 show`}>
                                <Link to="candidate-profile" className="dropdown-item fw-medium fs-6"><FiUser className="fea icon-sm me-2 align-middle" />Profile</Link>
                                <Link to="candidate-profile-setting" className="dropdown-item fw-medium fs-6"><FiSettings className="fea icon-sm me-2 align-middle"/>Settings</Link>
                                <div className="dropdown-divider border-top"></div>
                                <Link to="lock-screen" className="dropdown-item fw-medium fs-6"><FiLock className="fea icon-sm me-2 align-middle"/>Lockscreen</Link>
                                <Link to="login" className="dropdown-item fw-medium fs-6"><FiLogOut className="fea icon-sm me-2 align-middle"/>Logout</Link>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            <div id="navigation">
                <ul className="navigation-menu nav-right">
                    {(user.role === "Admin" || user.role === "Candidate") && (
                        <>
                            <li className={`${["employers", "employer-profile"].includes(manu) ? "active" : ""}  parent-menu-item`}>
                                <Link to="/employers">Employers</Link><span className="menu-arrow"></span>
                                <ul className="submenu">
                                    <li className={manu === "employers" ? "active" : ""}><Link to="/employers"
                                                                                               className="sub-menu-item">Employers</Link>
                                    </li>
                                    <li className={manu === "employer-profile" ? "active" : ""}><Link
                                        to="/employer-profile"
                                        className="sub-menu-item">Employer
                                        Profile</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={`${["job-categories", "job-grid-one", "job-grid-two", "job-grid-three", "job-grid-four", "job-list-one", "job-list-two", "job-detail-one", "job-detail-two", "job-detail-three", "job-apply", "job-post", "career"].includes(manu) ? "" : ""}  parent-menu-item`}>
                                <Link to="/jobs"> Jobs </Link>
                                <ul className="submenu">
                                    <li className={manu === "job-categories" ? "active" : ""}><Link to="/job-categories"
                                                                                                    className="sub-menu-item">Job
                                        Categories</Link></li>


                                    <li className={`${["job-grid-one", "job-grid-two", "job-grid-three", "job-grid-four"].includes(manu) ? "active" : ""} has-submenu parent-menu-item`}>
                                        <Link to="#"> Job Grids </Link><span className="submenu-arrow"></span>
                                        <ul className="submenu">
                                            <li className={manu === "job-grid-one" ? "active" : ""}><Link
                                                to="/job-grid-one"
                                                className="sub-menu-item">Job
                                                Grid One</Link></li>
                                            <li className={manu === "job-grid-two" ? "active" : ""}><Link
                                                to="/job-grid-two"
                                                className="sub-menu-item">Job
                                                Grid Two</Link></li>
                                            <li className={manu === "job-grid-three" ? "active" : ""}><Link
                                                to="/job-grid-three" className="sub-menu-item">Job Grid Three</Link>
                                            </li>
                                            <li className={manu === "job-grid-four" ? "active" : ""}><Link
                                                to="/job-grid-four" className="sub-menu-item">Job Grid Four </Link></li>
                                        </ul>
                                    </li>

                                    <li className={`${["job-list-one", "job-list-two"].includes(manu) ? "active" : ""} has-submenu parent-menu-item`}>
                                        <Link to="#"> Job Lists </Link><span className="submenu-arrow"></span>
                                        <ul className="submenu">
                                            <li className={manu === "job-list-one" ? "active" : ""}><Link
                                                to="/job-list-one"
                                                className="sub-menu-item">Job
                                                List One</Link></li>
                                            <li className={manu === "job-list-two" ? "active" : ""}><Link
                                                to="/job-list-two"
                                                className="sub-menu-item">Job
                                                List Two</Link></li>
                                        </ul>
                                    </li>

                                    <li className={`${["job-detail-one", "job-detail-two", "job-detail-three"].includes(manu) ? "active" : ""} has-submenu parent-menu-item`}>
                                        <Link to="#"> Job Detail </Link><span className="submenu-arrow"></span>
                                        <ul className="submenu">
                                            <li className={manu === "job-detail-one" ? "active" : ""}><Link
                                                to="/job-detail-one" className="sub-menu-item">Job Detail One</Link>
                                            </li>
                                            <li className={manu === "job-detail-two" ? "active" : ""}><Link
                                                to="/job-detail-two" className="sub-menu-item">Job Detail Two</Link>
                                            </li>
                                            <li className={manu === "job-detail-three" ? "active" : ""}><Link
                                                to="/job-detail-three" className="sub-menu-item">Job Detail Three</Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className={manu === "job-apply" ? "active" : ""}><Link to="/job-apply"
                                                                                               className="sub-menu-item">Job
                                        Apply</Link></li>

                                    <li className={manu === "job-post" ? "active" : ""}><Link to="/job-post"
                                                                                              className="sub-menu-item">Job
                                        Post </Link></li>

                                    <li className={manu === "career" ? "active" : ""}><Link to="/career"
                                                                                            className="sub-menu-item">Career </Link>
                                    </li>
                                </ul>
                            </li>
                        </>
                    )}

                    {(user.role == "Admin" || user.role == "Employer") && (
                        <>

                            <li className={`${["candidates", "candidate-profile", "candidate-profile-setting"].includes(manu) ? "active" : ""} parent-menu-item`}>
                                <Link to="/candidates">Candidates</Link><span className="menu-arrow"></span>
                                <ul className="submenu">
                                    <li className={manu === "candidates" ? "active" : ""}><Link to="/candidates"
                                                                                                className="sub-menu-item">Candidates</Link>
                                    </li>
                                    <li className={manu === "candidate-profile" ? "active" : ""}><Link
                                        to="/candidate-profile" className="sub-menu-item">Candidate Profile</Link></li>
                                    <li className={manu === "candidate-profile-setting" ? "active" : ""}><Link
                                    to="/candidate-profile-setting" className="sub-menu-item">Profile Setting</Link>
                                </li>
                            </ul>
                        </li>
                        </>
                    )}


                    <li className={`${["aboutus", "services","pricing","helpcenter-overview", "helpcenter-faqs","helpcenter-guides",'helpcenter-support'].includes(manu)? "active" : ""} has-submenu parent-menu-item,"blogs", "blog-sidebar","blog-detail","login", "signup","reset-password","lock-screen","terms", "privacy"`}>
                        <Link to="#">Pages</Link><span className="menu-arrow"></span>
                        <ul className="submenu">
                            <li className={manu === "aboutus"  ? "active" : ""}><Link to="/aboutus" className="sub-menu-item">About Us</Link></li>
                            <li className={manu === "services"  ? "active" : ""}><Link to="/services" className="sub-menu-item">Services</Link></li>
                            <li className={manu === "pricing"  ? "active" : ""}><Link to="/pricing" className="sub-menu-item">Pricing </Link></li>

                            <li className={`${["helpcenter-overview", "helpcenter-faqs","helpcenter-guides",'helpcenter-support'].includes(manu)? "active" : ""} has-submenu parent-menu-item`}>
                                <Link to="#"> Helpcenter </Link><span className="submenu-arrow"></span>
                                <ul className="submenu">
                                    <li className={manu === "helpcenter-overview"  ? "active" : ""}><Link to="/helpcenter-overview" className="sub-menu-item">Overview</Link></li>
                                    <li className={manu === "helpcenter-faqs"  ? "active" : ""}><Link to="/helpcenter-faqs" className="sub-menu-item">FAQs</Link></li>
                                    <li className={manu === "helpcenter-guides"  ? "active" : ""}><Link to="/helpcenter-guides" className="sub-menu-item">Guides</Link></li>
                                    <li className={manu === "helpcenter-support"  ? "active" : ""}><Link to="/helpcenter-support" className="sub-menu-item">Support</Link></li>
                                </ul>
                            </li>

                            <li className={`${["blogs", "blog-sidebar","blog-detail"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}><Link to="#"> Blog </Link><span className="submenu-arrow"></span>
                                <ul className="submenu">
                                    <li className={manu === "blogs"  ? "active" : ""}><Link to="/blogs" className="sub-menu-item"> Blogs</Link></li>
                                    <li className={manu === "blog-sidebar"  ? "active" : ""}><Link to="/blog-sidebar" className="sub-menu-item"> Blog Sidebar</Link></li>
                                    <li className={manu === "blog-detail"  ? "active" : ""}><Link to="/blog-detail" className="sub-menu-item"> Blog Detail</Link></li>
                                </ul>
                            </li>

                            <li className={`${["login", "signup","reset-password","lock-screen"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}><Link to="#"> Auth Pages </Link><span className="submenu-arrow"></span>
                                <ul className="submenu">
                                    <li className={manu === "login"  ? "active" : ""}><Link to="/login" className="sub-menu-item"> Login</Link></li>
                                    <li className={manu === "signup"  ? "active" : ""}><Link to="/signup" className="sub-menu-item"> Signup</Link></li>
                                    <li className={manu === "reset-password"  ? "active" : ""}><Link to="/reset-password" className="sub-menu-item"> Forgot Password</Link></li>
                                    <li className={manu === "lock-screen"  ? "active" : ""}><Link to="/lock-screen" className="sub-menu-item"> Lock Screen</Link></li>
                                </ul>
                            </li>

                            <li className={`${["terms", "privacy"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}><Link to="#"> Utility </Link><span className="submenu-arrow"></span>
                                <ul className="submenu">
                                    <li className={manu === "terms"  ? "active" : ""}><Link to="/terms" className="sub-menu-item">Terms of Services</Link></li>
                                    <li className={manu === "privacy"  ? "active" : ""}><Link to="/privacy" className="sub-menu-item">Privacy Policy</Link></li>
                                </ul>
                            </li>

                            <li className={`${["comingsoon", "maintenance","error"].includes(manu)? "active" : ""} has-submenu parent-menu-item`}><Link to="#"> Special </Link><span className="submenu-arrow"></span>
                                <ul className="submenu">
                                    <li className={manu === "comingsoon"  ? "active" : ""}><Link to="/comingsoon" className="sub-menu-item"> Coming Soon</Link></li>
                                    <li className={manu === "maintenance"  ? "active" : ""}><Link to="/maintenance" className="sub-menu-item"> Maintenance</Link></li>
                                    <li className={manu === "error"  ? "active" : ""}><Link to="/error" className="sub-menu-item"> 404! Error</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li className={manu === "contactus"  ? "active" : ""}><Link to="/contactus" className="sub-menu-item">Contact Us</Link></li>
                </ul>
            </div>
        </div>
    </header>
    )
}