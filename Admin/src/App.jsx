import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Profile from './pages/Profile';
import Gallery from './pages/Gallery';
import News from './pages/News';
import Events from './pages/Events';
import Curriculum from './pages/Curriculum';
import Tender from './pages/Tender/Tender';
import TenderEdits from './pages/Tender/TenderEdits';
import AddRecruitments from './pages/Recruitments/AddRecruitments';
import RecruitmentEdits from './pages/Recruitments/EditRecruitment';
import FacultyAdd from './pages/Faculty/FacultyAdd';
import FacultyEdit from './pages/Faculty/FacultyEdit';
import FacultyAllEdit from './pages/Faculty/FacultyAllEdit';
import Admissions from './pages/Admissions';
import SignupAdmin from './pages/Authentication/SignupAdmin';
import Clubs from './pages/Clubs';
import ClubsPage from './pages/ClubsPage';
import PrintMedia from './pages/PrintMedia';
import EventsPage from './pages/EventsPage';
import CurriculumPage from './pages/CurriculumPage.jsx';
import Research from './pages/Research/Research.jsx';
import EditResearch from './pages/Research/EditResearch.jsx';
import ForgotAdmin from './pages/Authentication/Forgot';
import VerifyOTP from './pages/Authentication/VerifyOTP.jsx';
import Reset from './pages/Authentication/Reset.jsx';
import Minutes from './pages/Minutes.jsx';
import Forms from './pages/Forms.jsx';
import Calendar from './pages/Calendar.jsx';
import Organization from './pages/Organisation.jsx';
import OrganizationEdit from './pages/OrganizationEdit.jsx';
import Carousel from './pages/Carousel.jsx';
import Policy from './pages/Policies.jsx';
import Notice from './pages/Notice.jsx';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Carousel | IIITU - Admin" />
              <Carousel />
            </>
          }
        />
        <Route
          path="/gallery"
          element={
            <>
              <PageTitle title="Gallery | IIITU - Admin" />
              <Gallery />
            </>
          }
        />
        <Route
          path="/clubs"
          element={
            <>
              <PageTitle title="Clubs | Clubs Dashboard" />
              <Clubs />
            </>
          }
        />

        <Route
          path="/clubs/:id"
          element={
            <>
              <PageTitle title="Clubs-Page | Clubs Dashboard" />
              <ClubsPage />
            </>
          }
        />

        <Route
          path="/curriculum"
          element={
            <>
              <PageTitle title="Curriculum | IIITU - Admin" />
              <Curriculum />
            </>
          }
        />
        <Route
          path="/curriculum/:id"
          element={
            <>
              <PageTitle title="Curriculum-Page | Curriculum Dashboard" />
              <CurriculumPage />
            </>
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <PageTitle title="Authentication | Admin Login" />
              <SignupAdmin />
            </>
          }
        />
        <Route
          path="/forgot"
          element={
            <>
              <PageTitle title="Reset Password | Admin Login" />
              <ForgotAdmin />
            </>
          }
        />
        <Route
          path="/news"
          element={
            <>
              <PageTitle title="News | IIITU - Admin" />
              <News />
            </>
          }
        />
        <Route
          path="/printmedia"
          element={
            <>
              <PageTitle title="Print Media | IIITU - Admin" />
              <PrintMedia />
            </>
          }
        />

        <Route
          path="/events"
          element={
            <>
              <PageTitle title="Events | IIITU - Admin" />
              <Events />
            </>
          }
        />
        <Route
          path="/events/:id"
          element={
            <>
              <PageTitle title="Events-Page | Events Dashboard" />
              <EventsPage />
            </>
          }
        />
        <Route
          path="/admissions"
          element={
            <>
              <PageTitle title="Admissions | IIITU - Admin" />
              <Admissions />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | IIITU - Admin" />
              <Profile />
            </>
          }
        />
        {/* <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | IIITU - Admin" />
              <Settings />
            </>
          }
        /> */}
        {/* <Route
          path="/signup"
          element={
            <>
              <PageTitle title="Signup | IIITU - Admin" />
              <SignUp />
            </>
          }
        /> */}
        <Route
          path="/tender/add"
          element={
            <>
              <PageTitle title="Tender | Tender Add" />
              <Tender />
            </>
          }
        />
        <Route
          path="/tender/edit"
          element={
            <>
              <PageTitle title="Tender | Tender Edits and Delete" />
              <TenderEdits />
            </>
          }
        />
        <Route
          path="/recruitment/add"
          element={
            <>
              <PageTitle title="Recruitment | Recruitment ADD" />
              <AddRecruitments />
            </>
          }
        />
        <Route
          path="/recruitment/edit"
          element={
            <>
              <PageTitle title="Recruitment | Recruitment Edit and Delete" />
              <RecruitmentEdits />
            </>
          }
        />
        <Route
          path="/faculty/add"
          element={
            <>
              <PageTitle title="Faculty | Faculty Add" />
              <FacultyAdd />
            </>
          }
        />
        <Route
          path="/faculty/edit"
          element={
            <>
              <PageTitle title="Faculty | Faculty Edit" />
              <FacultyEdit />
            </>
          }
        />
        <Route
          path="/faculty/edit/:id"
          element={
            <>
              <PageTitle title="Faculty | Faculty Edits" />
              <FacultyAllEdit />
            </>
          }
        />
        <Route
          path="/research/add"
          element={
            <>
              <PageTitle title="Research | Research Add" />
              <Research />
            </>
          }
        />
        <Route
          path="/research/edit"
          element={
            <>
              <PageTitle title="Research | Research Edit and Delete" />
              <EditResearch />
            </>
          }
        />
        <Route
          path="/minutes"
          element={
            <>
              <PageTitle title="Minutes | Minutes Dashboard" />
              <Minutes />
            </>
          }
        />
        <Route
          path="/forms"
          element={
            <>
              <PageTitle title="Forms | Forms Dashboard" />
              <Forms />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | Calendar Dashboard" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/organisation"
          element={
            <>
              <PageTitle title="Organisation | IIITU - Admin" />
              <Organization />
            </>
          }
        />
        <Route
          path="/organisation/:id"
          element={
            <>
              <PageTitle title="Organisation Edit | IIITU - Admin" />
              <OrganizationEdit />
            </>
          }
        />
        <Route
          path="/policies"
          element={
            <>
              <PageTitle title="Policies | IIITU - Admin" />
              <Policy />
            </>
          }
        />
        <Route
          path="/verifyOTP"
          element={
            <>
              <PageTitle title="Verify OTP | Faculty Login" />
              <VerifyOTP />
            </>
          }
        />
        <Route
          path="/reset"
          element={
            <>
              <PageTitle title="Reset Password | Faculty Login" />
              <Reset />
            </>
          }
        />
        <Route 
          path = "/notice"
          element={
            <>
              <PageTitle title="Notice | IIITU - Admin" />
              <Notice />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
