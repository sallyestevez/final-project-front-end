import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth"; 

// styling & Components
import './App.css';
import CreateUserPage from "./pages/CreateUser";
import LoginPage from "./pages/Login";
import UserProfilePage from "./pages/UserProfile";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr1IopijrEwo6pV_kthcG6ZmOxngwPpis",
  authDomain: "exercise-six-fall-2022-18788.firebaseapp.com",
  projectId: "exercise-six-fall-2022-18788",
  storageBucket: "exercise-six-fall-2022-18788.appspot.com",
  messagingSenderId: "530220437413",
  appId: "1:530220437413:web:ea3ddd86e918b1801ce24c"
};

function App() {
  const [appInitialized, setAppInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInformation, setUserInformation] = useState({});


  // ensure app is initialized when ready
  useEffect(() => {
    //Initialize firebase
    initializeApp(firebaseConfig);
    setAppInitialized(true);
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

  console.log({ userInformation });

  // goes to page based on the file path
  const router = createBrowserRouter([
    {
      // home page
      path: "/",
      element: (
        <UserProfilePage 
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
  ]);
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;