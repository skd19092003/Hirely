import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignInButton, SignIn, UserButton, SignUp } from '@clerk/clerk-react'
import { BriefcaseBusiness, Heart, PenBox, HouseIcon } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
// useUser is a hook that provides information about the currently signed-in user, such as their profile and authentication status.

const Header = () => {

  //for preventing candidate to visit postjob .
  const {user} = useUser();

  //to create a modal for login and signup instead of new page would be use state
  const [showsignin, setshowsignin] = useState(false);
  //for demo account
  const [showsignin2, setshowsignin2] = useState(false);
  //signup
  const [showsignup3, setshowsignup3] = useState(false);

  //to hide guestaccess and only provide it in url
  const [search2] = useSearchParams();
  const showGuestButton = search2.get('recruiter') === 'true';


  const [search, setsearch] = useSearchParams();
  // useSearchParams is a hook that allows you to read and modify the query parameters in the URL.
  useEffect(() => {
    if (search.get('sign-in')) {
      setshowsignin(true);
//this is when we we are not login and tey to visit other pages
    }
  }, [search]);
  // useEffect is used to run code when the component mounts or when the search parameters change.
  // search.get('sign-in') checks if the URL has a query parameter sign-in, and if it does, it sets showsignin to true.
  // This is useful for showing the sign-in modal when the user is redirected to the page with that query parameter.

  // Why do we need this?
  // Sometimes you want to open the sign-in modal automatically when a user visits a certain URL (for example, after clicking a "Sign In" link from another page, or after being redirected).
  // By using a URL like /?sign-in=true, you can control the modal from the URL—this is called "deep linking" or "URL-driven UI".
  // What does useEffect do here?
  // useEffect watches for changes in the URL query parameters.
  // If it sees sign-in in the URL, it opens the modal by setting showsignin to true.



  const handleoverlayclick = (e) => {
    //if the click is on the overlay div then close the modal
    if (e.target === e.currentTarget) {
      setshowsignin(false);
      setshowsignin2(false);
      setshowsignup3(false);
      setsearch({});
      //setsearch({}) clears the query parameters in the URL, so the sign-in modal won't show again when you refresh the page.
    }
  }

  // question:explain this how this differs the div region from other region in easyb way
  //   e.currentTarget is the overlay <div> (the big background).
  // e.target is the exact element you clicked.
  // So:

  // If you click directly on the overlay (the dark background), e.target === e.currentTarget is true and the modal closes.
  // If you click on something inside the modal (like a button or input), e.target is not the overlay, so the modal does not close.
  // //Great question!
  // e.currentTarget refers to the element that the event handler is attached to—in your case, the big overlay <div> (the dark background).

  // When you click directly on the overlay, both e.target and e.currentTarget are the overlay, so the modal closes.

  // When you click inside the modal content (like a button or input), e.target is the inner element (the button, input, etc.), but e.currentTarget is still the overlay.
  // So e.target === e.currentTarget is false and the modal does not close.



  return (
    <>
      <nav className='mt-5 ml-3 sm:p-4  sm:m-5 flex justify-between items-center'>
        <Link to="/" className='bg-slate-300 hover:bg-slate-700 rounded-lg p-2 gap-x-2 px-5 flex items-center justify-center sm:gap-5'>
          <img src="/logo.png" className='h-7 sm:h-10 lg:h-20' alt="Logo" />
          <span className='text-[15px] sm:text-[20px] md:text-[20px] lg:text-2xl font-bold text-slate-900 flex flex-row justify-center items-center'><HouseIcon size={20} className='mr-2' />Home</span>


        </Link>



        <div className='flex flex-wrap gap-2 pr-3 sm:gap-5 md:gap-8'>

          <SignedOut>

            {showGuestButton && (
              <Button
                variant="outline"
                onClick={() => {
                  setshowsignin2(true)
                }}
                className='text-[12px] p-2 sm:text-[14px] md:text-[15px] lg:text-[20px] font-semibold text-white bg-green-700  hover:bg-green-800 py-6  md-px-6'>
                Guest Access
              </Button>)}

            <Button variant="gray" onClick={() => setshowsignup3(true)} className='text-[12px] p-2 sm:text-[14px]  md:text-[15px] lg:text-[20px] py-6 font-semibold md:px-6'>
              Signup
            </Button>
            <Button variant="blue" onClick={() => setshowsignin(true)} className='text-[12px] p-2 sm:text-[14px] md:text-[15px] lg:text-[20px]  py-6 font-semibold md:px-6'>
              Login
            </Button>

          </SignedOut>

          <SignedIn>

            {/* //add a c0nditional  post job button using the optional chaining */}
           {user?.unsafeMetadata?.role === "recruiter" && <Link to="/post-job">
              <Button variant="blue" className='text-[12px] p-2 sm:text-[14px]  md:text-[15px] lg:text-[20px] bg-blue-900 text-white hover:bg-blue-400 py-6 font-semibold  md:px-6'>
                <PenBox size={20} className='mr-2' />
                Post a Job
              </Button>
            </Link>}

            <UserButton appearance={
              {
                elements: {
                  avatarBox: 'h-10 w-10',
                }
              }}>
              <UserButton.MenuItems>
                <UserButton.Link
                  label='My jobs'
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label='saved jobs'
                  labelIcon={<Heart size={15} />}
                  href="/saved-job"
                />
              </UserButton.MenuItems>
            </UserButton>

          </SignedIn>
        </div>
      </nav>




      {/* fixed: The element is positioned fixed relative to the viewport (stays in place when scrolling).
inset-0: Sets top: 0; right: 0; bottom: 0; left: 0; — It makes the element stretch to cover the entire parent (or screen, if fixed or absolute), touching all edges.
bg-black/50: Sets the background color to black with 50% opacity (a semi-transparent black overlay).
z-50: Sets a high z-index (50), so the element appears above most other conten */}
      {showsignin && (<div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center' onClick={handleoverlayclick}>
        {/* simple onlcick div par lagNE SE due to inset pure screen se kahi bhii click krne par band hoga will not be able to use handle signin email google github button so use a function handleoverlay*/}
        <SignIn

          //signin ke baad force krega to onboarding page pe
          signUpForceRedirectUrl='/onboarding'
          fallbackRedirectUrl='/onboarding'
        />
      </div>)}

      {showsignup3 && (<div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center' onClick={handleoverlayclick}>
        {/* simple onlcick div par lagNE SE due to inset pure screen se kahi bhii click krne par band hoga will not be able to use handle signin email google github button so use a function handleoverlay*/}
        <SignUp

          //signin ke baad force krega to onboarding page pe
          signUpForceRedirectUrl='/onboarding'
          fallbackRedirectUrl='/onboarding'
        />
      </div>)}


      {showsignin2 && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center' onClick={handleoverlayclick}>
          <div className="absolute top-8 right-8 bg-white text-black p-4 lg:p-8 rounded shadow-lg z-50 w-[260px] lg:w-[450px] flex flex-col items-center justify-center">
            <div className="font-bold mb-1 text-base lg:py-3 lg:text-4xl">Demo Account</div>
        
          <div className='bg-slate-300 p-5 mb-3  flex flex-col items-center justify-center'>
             <p className='font-extrabold py-2'><li> USE THIS if onboarding= JOB SEEKER</li></p>
            <div className="flex items-center justify-center gap-2 mb-2 lg:text-2xl ">
              Email: <span className="font-mono lg:text-2xl">demo@yourapp.com</span>
              <button
                className="text-xs lg:text-xl px-2 py-1 lg:px-5   bg-slate-200 rounded hover:bg-green-500"
                onClick={() => navigator.clipboard.writeText("demo@yourapp.com")}
              >
                Copy
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2 lg:text-2xl lg:gap-3">
              Password: <span className="font-mono">demopassword</span>
              <button
                className="text-xs lg:text-xl px-2 py-1 bg-slate-200 rounded hover:bg-green-500 lg:px-5"
                onClick={() => navigator.clipboard.writeText("demopassword")}
              >
                Copy
              </button>
            </div>
            
</div>

 <div className='bg-slate-300 p-5 mb-3  flex flex-col items-center justify-center'>
             <p className='font-extrabold py-2'><li> USE THIS if onboarding= EMPLOYER</li></p>
            <div className="flex items-center justify-center gap-2 mb-2 lg:text-2xl ">
              Email: <span className="font-mono lg:text-2xl">demo2@yourapp.com</span>
              <button
                className="text-xs lg:text-xl px-2 py-1 lg:px-5   bg-slate-200 rounded hover:bg-green-500"
                onClick={() => navigator.clipboard.writeText("demo2@yourapp.com")}
              >
                Copy
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2 lg:text-2xl lg:gap-3">
              Password: <span className="font-mono">demo2password</span>
              <button
                className="text-xs lg:text-xl px-2 py-1 bg-slate-200 rounded hover:bg-green-500 lg:px-5"
                onClick={() => navigator.clipboard.writeText("demo2password")}
              >
                Copy
              </button>
            </div>
           
            </div>


            <div className="text-xs text-slate-600 mt-2 lg:text-xl font-semibold">Copy & paste these to sign in instantly!</div>
          </div>
          <SignIn
            initialValues={{ emailAddress: "demo@yourapp.com" }}
            signUpForceRedirectUrl='/onboarding'
            fallbackRedirectUrl='/onboarding'
          />
        </div>
      )}



    </>
  )
}

export default Header