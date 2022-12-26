/* New cleaned up version of App.js */
import React from 'react';

// Importing react-router-dom to use the React Router
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';

import RegisterUser from './react-components/RegisterUser';
import ViewRecipe from './react-components/ViewRecipe';

import Navbar from './react-components/Nav';
import UserView from './react-components/UserView';
import UserProfile from './react-components/UserProfile';
import EditProfile from './react-components/EditProfile';
import ModView from './react-components/ModView'
import ModManage from './react-components/ModManage'
import ResponsiveAppBar from './react-components/Nav';
import GuestView from './react-components/GuestView';
import LoginCard from './react-components/LoginCard';
import EditName from './react-components/EditProfile/EditName';
import EditEmail from './react-components/EditProfile/EditEmail';
import UserAnnouncements from './react-components/UserAnnouncements';
import UploadRecipe from './react-components/AddRecipe';
import SavedRecipes from './react-components/SavedRecipes'
class App extends React.Component {

  // a 'global' state that you can pass through to any child componenets of App.
  //   In the Routes below they are passed to both the Home and Queue states.
  state = {
    currentUser: null,
    currentEmail: null,
    isMod: null
  }

  render() {
      const {currentUser, currentEmail, isMod } = this.state
      console.log(currentEmail)
      console.log(isMod)
    return (
        // <div>
        // <BrowserRouter>
        //   <Routes> { /* Similar to a switch statement - shows the component depending on the URL path */ }
        //     { /* Each Route below shows a different component depending on the exact path in the URL  */ }
        //     <Route exact path='/' element={<UserView />}/>

        //     <Route exact path='/user' element={<UserProfile />}/>

        //     <Route exact path='/edit' element={<EditProfile />}/>
            
        //   </Routes>
        // </BrowserRouter>
      <div>
        <Routes> { /* Similar to a switch statement - shows the component depending on the URL path */}
          { /* Each Route below shows a different component depending on the exact path in the URL  */}
          <Route path='/Home' element={<UserView announce={false} curr_id={currentUser}/>} />
          <Route path='/Announcements' element={<UserView announce={true}/>} />
          <Route path="/Feed" element={<ModView announce={false}/>}/>
          <Route path="/Manage" element={<ModManage/>}/>
          <Route path="/Announce" element={<ModView announce={true}/>}/>
          <Route path='/GuestHome' element={<GuestView/>} />
          <Route path='/' element={<LoginCard app={this}/>} />
          <Route path="/Profile" element={<UserProfile curr_id={currentUser}/>}/>
          <Route path="/EditProfile" element={<EditProfile/>}/>
          <Route path="/recipe/:id" element={<ViewRecipe/>}/>

          <Route path="/Upload" element={<UploadRecipe curr_id={currentUser} curr_email={currentEmail}/>}/>
          <Route path="/EditProfile" element={<EditProfile/>}/>
          <Route path="/EditName" element={<EditName curr_id={currentUser}/>}/>
          <Route path="/EditEmail" element={<EditEmail curr_id={currentUser}/>}/>
          <Route path="/Saved" element={<SavedRecipes isAdmin={isMod} curr_id={currentUser}/>}/>
        </Routes>
      </div>
    );
  }
}

export default App;
