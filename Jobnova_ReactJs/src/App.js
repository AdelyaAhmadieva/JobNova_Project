import React, {useEffect} from "react";
import { Route, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./assets/scss/style.scss"
import "./assets/css/materialdesignicons.min.css"
import Index from "./pages";
import IndexTwo from "./pages/index-two";
import IndexThree from "./pages/index-three";
import JobCategories from "./pages/job-categories";
import JobGridOne from "./pages/job-grid-one";
import JobGridTwo from "./pages/job-grid-two";
import JobGridThree from "./pages/job-grid-three";
import JobGridFour from "./pages/job-grid-four";
import JobListOne from "./pages/job-list-one";
import JobListTwo from "./pages/job-list-two";
import JobApply from "./pages/job-apply";
import JobPost from "./pages/job-post";
import Career from "./pages/career";
import JobDetailThree from "./pages/job-detail-three";
import JobDetailTwo from "./pages/job-detail-two";
import JobDetailOne from "./pages/job-detail-one";
import Employers from "./pages/employers";
import EmployerProfile from "./pages/employer-profile";
import Candidates from "./pages/candidates";
import CandidateProfile from "./pages/candidate-profile";
import CandidateProfileSetting from "./pages/candidate-profile-setting";
import AboutUs from "./pages/aboutus";
import Services from "./pages/services";
import Pricing from "./pages/pricing";
import HelpcenterOverview from "./pages/helpcenter-overview";
import HelpcenterFaq from "./pages/helpcenter-faqs";
import HelpcenterGuides from "./pages/helpcenter-guides";
import HelpcenterSupport from "./pages/helpcenter-support";
import Blogs from "./pages/blogs";
import BlogSidebar from "./pages/blog-sidebar";
import BlogDetail from "./pages/blog-detail";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ResetPassword from "./pages/reset-password";
import LockScreen from "./pages/lock-screen";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import ContactUs from "./pages/contactus";
import Error from "./pages/error";
import Comingsoom from "./pages/comingsoon";
import Maintenance from "./pages/maintenance";
import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "./store/userSlice";
import {getCandidateData} from "./store/userCandidateSlice";
import {getEmployerData} from "./store/userEmployerSlice";


function App() {
   const userStorage = useSelector(state => state.user);
   const dispatch = useDispatch();

   function handleAccount() {

      dispatch(getUserData(localStorage.getItem("token"))).then((res) => {
         if(res.payload){
            if(res.payload.role === "Candidate"){
               dispatch(getCandidateData())
            }
            if(res.payload.role === "Employer"){
               dispatch(getEmployerData())
            }
         }

      })
   }

   useEffect(() => {
      if(userStorage.role === null && localStorage.getItem("token")){
         handleAccount()
      }

   }, [])


   return (
   <>


   <Routes>
      {/*For Candidate*/}
      {userStorage.role === "Candidate" &&
          (<>
             <Route path='/job-categories' element={<JobCategories/>}/>
             <Route path='/jobs' element={<JobListTwo/>}/>
             <Route path='/job-detail-one/:id/vacancies/:employerId' element={<JobDetailOne/>}/>
             <Route path='/job-apply/:id' element={<JobApply/>}/>
             <Route path='/employers' element={<Employers/>}/>
             <Route path='/employer-profile/:id' element={<EmployerProfile/>}/>
          </>)
      }

      {/*For Employers*/}
      {userStorage.role === "Employer" &&
          (
              <>
                 <Route path='/candidates' element={<Candidates/>}/>
                 <Route path='/candidate-profile/:id' element={<CandidateProfile/>}/>
                 <Route path='/job-post' element={<JobPost/>}/>
              </>
          )}

      {/*For everyone authorized*/}
      {userStorage.role !== null &&
          (
              <>
                 <Route path='/candidate-profile-setting' element={<CandidateProfileSetting/>}/>
                 <Route path='/pricing' element={<Pricing/>}/>
                 <Route path='/contactus' element={<ContactUs/>}/>
              </>
          )
      }

      {/*For unauthorized*/}
      {userStorage.role === null &&
          (
              <>
                 <Route path='/login' element={<Login/>}/>
                 <Route path='/signup' element={<Signup/>}/>
              </>
          )}

      {/*For everyone*/}
      <Route path='/' element={<IndexThree/>}/>
      <Route path='/career' element={<Career/>}/>
      <Route path='/services' element={<Services/>}/>


      <Route path='*' element={<Error/>}/>

   </Routes>
   </>
  );
}

export default App;
