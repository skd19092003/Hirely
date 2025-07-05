import React, { useEffect, useState } from "react";
import { getRemotiveJobs } from "@/api/apiRemotive";
import RemoteJobCard from "@/components/remotejobcard";
import { BarLoader } from "react-spinners";
import { Link } from 'react-router-dom';

const RemotiveRemoteJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cache = localStorage.getItem('remotiveJobs');
    const cacheTime = localStorage.getItem('remotiveJobsTime');
    const now = Date.now();

    // 7 hours in milliseconds
    const maxAge = 7 * 60 * 60 * 1000;

    if (cache && cacheTime && now - cacheTime < maxAge) {
      setJobs(JSON.parse(cache));
      setLoading(false);
    } else {
      getRemotiveJobs({ page: 1, limit: 10 }).then((data) => {
        setJobs(data);
        setLoading(false);
        localStorage.setItem('remotiveJobs', JSON.stringify(data));
        localStorage.setItem('remotiveJobsTime', now);
      });
    }
  }, []);

  if (loading) return <BarLoader width="100%" color="#36d7b7" className="mt-10" />;

  return (
    <div className="flex flex-col gap-6 items-center justify-center mt-10 lg:mb-8 lg:mt-0">
      <h2 className="gradient-title text-4xl font-extrabold   sm:text-5xl lg:text-7xl">
        Remote Jobs 
      </h2>
      <h3 className="text-gray-300 text-xl flex flex-col sm:flex-row items-center justify-center">
        Find the latest remote jobs sourced from
        <Link to="https://remotive.com" target="_blank" className="text-blue-500 bg-blue-500/10 px-2 py-1 rounded-md ml-2 hover:bg-blue-500/50"> Remotive.com</Link>
      </h3>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-2">
        {jobs.map((job) => (
          <RemoteJobCard
            key={job.id}
            job={{
              id: job.id,
              title: job.title,
              description: job.description,
              company: {
                name: job.company_name,
              },
              candidate_required_location: job.candidate_required_location,
              external_url: job.url,
              salary: job.salary,
              publication_date: job.publication_date,
              category: job.category,
              company_logo: job.company_logo,
              
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RemotiveRemoteJobs;