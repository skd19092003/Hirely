import { useRef } from 'react';

// to check if a user is signin or not we get bunch of hooks from clerk
import { useUser } from '@clerk/clerk-react'
import { Navigate, useLocation } from 'react-router-dom';
// Navigate is used to redirect the user to a different page

import React from 'react'

const Protectedroute = ({ children }) => {
    //har usestate useeffect ya usesearchparams return ke pehle likhte h 
    const { isSignedIn, user, isLoaded } = useUser();
    const { pathname } = useLocation();
    
    //the useref is used just for making alert run once=, use useRef instead of useState here 
    //because useRef does not cause a re-render when its value changes.
    // useState does cause a re-render when you update it.
    //useRef is perfect for tracking a value across renders without causing re-renders.
    // useState is for values that should trigger a UI update when changed.
    const alerted = useRef(false);

    if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
        //if user is loaded means the user data is fetched and if user is not signed in then we redirect to sign-in page
        return <Navigate to="/?sign-in=true" />;
    }
    //the children will be the protected route

    


    //later on checking onbioarding status whethere user candidate or recruiter
    if (isLoaded && user !== undefined && user?.unsafeMetadata?.role === undefined && pathname !== '/onboarding') {
        //if user is loaded and user role is undefined then we redirect to onboarding page
        return <Navigate to="/onboarding" />;
    }

    //if candidate wants to go to post job through post joblink button then we redirect to job listing page and send a alert that cannot access this page
    if (isLoaded && user?.unsafeMetadata?.role === 'candidate' && pathname === '/post-job') {
        //keep the order of statements in mind
       if (!alerted.current) {
            alerted.current = true;
//             The first time this code runs, alerted.current is false, 
// so the alert shows and alerted.current is set to true.
// On any further renders (while the component is mounted), alerted.current stays true,
//  so the alert does not show again.
            alert("You are not allowed to access this page as a Candidate. Please go to job listing page.");
        }
        return <Navigate to="/" />;

    }

    return children;
}

export default Protectedroute;