import { useUser } from '@clerk/clerk-react'

import React  from 'react'
import { Card, CardFooter, CardTitle } from './ui/card'
import { CardHeader } from '@/components/ui/card';
import { Heart, MapPin, Trash2Icon } from 'lucide-react';
import { CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom'
import { Button } from './ui/button';
import useFetch from '@/hooks/usefetch';
import { saveJob } from '@/api/apiJobs';
import { useState, useEffect } from 'react';




//curly braces are used to destructure the job object passed as a prop 
//     Why use destructuring?
// Cleaner and shorter code: You can use job directly instead of props.job.

const JobCard = ({
    job,
    isMyJob = false,
    savedInit = false,
    onJobSaved = () => { },
}) => {
    //here savedInit is a boolean prop that indicates whether the job is saved or not
    //and onJobSaved is a function that will be called when the job is saved what action will it perform

    const [saved, setSaved] = useState(savedInit);

    const { fn: fnsavedJob, data: savedJob, loading: loadingSavedJob } = useFetch(saveJob, { alreadySaved: saved });
    //alreadySaved is an option that will be passed to the saveJob api
    

    //here we are using useFetch to create a function fnsavedJob that will call the saveJob api
    //and we are passing the job id and user id to the api to save the job for the user
    //the data returned from the api will be saved in the savedJob variable and loadingSavedJob
    const { user } = useUser();
    const handleSaveJob = async () => {
        await fnsavedJob({ user_id: user.id, job_id: job.id });
        onJobSaved();
        //this will call the onJobSaved function passed as a prop to the JobCard component
        //this function can be used to update the UI or perform any other action after the job
    };
    //handleSaveJob is a function that will be called when the user clicks on the save job button
    //it will call the fnsavedJob function which will call the saveJob api with
    //the user id and job id to save the job for the user

     
    useEffect(() => {
        // This useEffect will run whenever the savedJob changes
        if (savedJob !== undefined) {
            //this will check if the savedJob is not undefined
            //if the savedJob is undefined then it means the job is not saved
            //if the savedJob is not undefined then it means the job is saved
            //so we will set the saved state to true or false based on the length of the savedJob array
            setSaved(savedJob?.length > 0);
            // This will update the saved state based on the length of the savedJob array
            // If savedJob has items, set saved to true; otherwise, set it to false
            // This is useful to reflect the saved state in the UI
            // This will also trigger a re-render of the component to reflect the updated saved state
        }
    }, [savedJob]);







    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between font-bold" >
                    {job.title}
                    {!isMyJob ? (
                        <Trash2Icon fill="grey" size={28} className='text-white cursor-pointer ' />
                    ) : null}

                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className='flex justify-between' >
                    {job.company && <img src={job.company.logo_url} alt={job.company.name} className=" h-10 " />}
                    <div className='flex items-center gap-2 '>
                        <MapPin size={16} /> {job.location || 'Remote'}

                    </div>
                </div>
                <hr className="border-t-2 border-white my-5 p-0" />
                {job.description.substring(0, job.description.indexOf("."))}
            </CardContent>

            <CardFooter className="flex gap-7">
                <Link to={`/job/${job.id}`} className="w-full ">
                    <Button variant="green" className="w-full rounded-b-lg p-4">
                        More Details
                    </Button>
                </Link>

                {!isMyJob && (
                    // If the job is not posted by the current user, show the save/unsave button
                    // If the job is posted by the current user, do not show the save/unsave button
                    // This is to prevent the user from saving their own job
                    <Button
                        variant=""
                        className="p-4 rounded-b-lg"
                        onClick={handleSaveJob}
                        disabled={loadingSavedJob}
                    >
                        {saved ? (
                            <Heart size={28} fill='red' stroke='red' className='cursor-pointer' />)
                            : (
                                <Heart size={28} stroke='black' className='cursor-pointer' />
                            )
                        }
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
//for saved job create  a policies in supabase to allow only the user to save itfor current user using reuresting_user_id to save or unsave for them only , for jobs and companies policies auth user is eno8ugh for all user to see the job and company details
//create a api savedjob to fetch and store
export default JobCard