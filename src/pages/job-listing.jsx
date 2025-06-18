import { getJobs } from '@/api/apiJobs';
import useFetch from '@/hooks/usefetch';
import { useUser } from '@clerk/clerk-react';
import { useState, useEffect  } from 'react';
import { BarLoader } from 'react-spinners';
import  JobCard  from '@/components/jobcard';
//so jobcard is withut curly braces because it is a default export in jobcard.jsx
//if it was a named export const jobcard = {} then we would have to use curly braces like {JobCard}
//because There can be only one default export per file.
// You can name the import whatever you want (but usually match the original name for clarity).


const Joblisting = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [companyId, setCompanyId] = useState('');

  const { isLoaded } = useUser();
 
  // const {session} = useSession();
  // //session is used to get the user data from clerk basically the token of the user

  // const  fetchjobs = async ()=>{
  //   const supabaseAccessToken = await session?.getToken({
  //     template: 'supabase',
  //   });
  //   const data =  await getJobs(supabaseAccessToken)
  //   console.log("Jobs data:", data);

  //instead of doing  the above thing repreatedly we can create a custom hook to fetch the jobs and use it in the component
  const { fn: fnjobs, data: jobs, loading: loadingjobs } = useFetch(getJobs, { location, companyId, searchQuery });



  //useEffect hook is used to fetch the jobs from the api when the component is mounted
  useEffect(() => {
    if (isLoaded) fnjobs();
    // This will call the fnjobs function to fetch jobs when the component mounts
    // The empty dependency array ensures this runs only once when the component mounts
  }, [isLoaded, location, companyId, searchQuery]);


  if (!isLoaded) {
    return (
      <div className="flex w-full justify-center items-center py-10 min-h-[200px]">
        <BarLoader width="90%" color="#36d7b7" />
      </div>
    );
  }

  return (
    <div>
    <div className='flex flex-col items-center justify-center m-10 lg:mb-16 lg:mt-0'>
      <h1 className='gradient-title text-4xl font-extrabold   sm:text-5xl lg:text-7xl'>Latest Jobs</h1>
   </div>
   {loadingjobs && (
    <div className="flex w-full justify-center items-center py-10 min-h-[200px]">
        <BarLoader width="90%" color="#36d7b7" />
      </div>)}
      {/* for loading jobs */}

      {loadingjobs === false && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-2">
          {jobs?.length ?(
            jobs.map((job)=>{
              //component created called jobcard to display job details
              //we can use the key prop to identify each job uniquely

              return  <JobCard key={job.id} job={job} savedInit={job?.saved?.length>0} />


            })
          ):(
            <div>No jobs found.</div>
          )}

          
          
        </div>)}
     </div>)
  





};



export default Joblisting;


