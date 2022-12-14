import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth"; 

// styling & Components
import './App.css';
import CreatePost from "./pages/CreatePost";
import CreateUserPage from "./pages/CreateUser";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import UserProfilePage from "./pages/UserProfile";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOkKdMUmJ9BLEJrUdeR0r7YDFrUpLwJQk",
    authDomain: "final-project-fall-2022.firebaseapp.com",
    projectId: "final-project-fall-2022",
    storageBucket: "final-project-fall-2022.appspot.com",
    messagingSenderId: "689525929500",
    appId: "1:689525929500:web:cac62153cab83a8098d1d9"
};

function App() {
  const [appInitialized, setAppInitialized] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInformation, setUserInformation] = useState({});

  // ensure app is initialized when ready
  useEffect(() => {
    //Initialize firebase
    const app = initializeApp(firebaseConfig);
    setAppInitialized(app);
  }, []);

  // check to see if user is logged in
  // user loads page, check their status
  // set state accordingly
  useEffect(() => {
    if (appInitialized) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // user is signed in
          setUserInformation(user);
          setIsLoggedIn(true);
        } else {
          // user is signed out
          setUserInformation({});
          setIsLoggedIn(false);
        }
        // whenever state changes setLoading to false
        setIsLoading(false);
      });
    }
  }, [appInitialized]);

  // goes to page based on the file path
  const router = createBrowserRouter([
    // dashboard / home page
    {
      path: "/",
      element: (
        <Dashboard
          app={appInitialized}
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
          userInformation={userInformation}
        />
      ),
    },
    {
      // user profile page
      path: "/profile",
      element: (
        <UserProfilePage 
          app={appInitialized}
          isLoading={isLoading} 
          isLoggedIn={isLoggedIn} 
          userInformation={userInformation} 
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
        />
      ),
    },
    {
      // login page
      path: "/login",
      element: (
        <LoginPage 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
        />
      ),
    },
    {
      // create user page
      path: "/create",
      element: (
        <CreateUserPage 
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
        />
      ),
    },
    {
      // create post page
      path: "/new-post",
      element: (
        <CreatePost 
          app={initializeApp}
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserInformation={setUserInformation}
          userInformation={userInformation}
        />
      ),
    },    
  ]);
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;