import React, { useEffect, useState } from "react";
import { getRemotiveJobs } from "@/api/apiRemotive";
import RemoteJobCard from "@/components/remotejobcard";
import { BarLoader } from "react-spinners";
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Import pagination components
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";

const RemotiveRemoteJobs = () => {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
// Pagination state
const [currentPage, setCurrentPage] = useState(1);
const [jobsPerPage] = useState(9);


//   User A visits → API call to Remotive → Cache stored in User A's browser
// User A visits again → Uses cached data → No API call
  useEffect(() => {
    const cache = localStorage.getItem('remotiveJobs');
    const cacheTime = localStorage.getItem('remotiveJobsTime');
    const now = Date.now();

    // 7 hours in milliseconds
    const maxAge = 7 * 60 * 60 * 1000;

    if (cache && cacheTime && now - cacheTime < maxAge) {
      const cachedJobs = JSON.parse(cache);
      setJobs(cachedJobs);
      setFilteredJobs(cachedJobs);
      setLoading(false);
    } else {
      getRemotiveJobs({ page: 1, limit: 50 }).then((data) => {
        setJobs(data);
        setFilteredJobs(data);
        setLoading(false);
        localStorage.setItem('remotiveJobs', JSON.stringify(data));
        localStorage.setItem('remotiveJobsTime', now);
      });
    }
  }, []);



    // Calculate pagination values
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  
    // Reset to first page when search changes
    useEffect(() => {
      setCurrentPage(1);
    }, [searchQuery]);
  
    // Handle page changes
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
      // Generate page numbers for smart pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    return pages;
  };

  








  // Filter jobs based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  }, [searchQuery, jobs]);

  const clearSearch = () => {
    setSearchQuery("");
  };

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
    
      {/* Search Filter */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl px-4">
        <Input
          type="text"
          placeholder="Search by job title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button
          variant="outline"
          onClick={clearSearch}
          className="sm:w-auto sm:h-10"
        >
          Clear
        </Button>
      </div>

      {/* Results count */}
      {searchQuery && (
        <div className="text-gray-400 text-sm">
          Found {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} matching "{searchQuery}"
        </div>
      )}
    
       {/* Display current page jobs */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-2">
        {currentJobs.map((job) => (
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
       {/* Pagination component */}
       {totalPages > 1 && (
        <div className="flex justify-center mt-8 mb-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {getPageNumbers().map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => handlePageChange(pageNumber)}
                    isActive={currentPage === pageNumber}
                    className="cursor-pointer"
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {currentPage < totalPages - 3 && totalPages > 5 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
                <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Page info */}
      {filteredJobs.length > 0 && (
        <div className="text-center text-gray-400 text-sm mb-4">
          Showing {indexOfFirstJob + 1} to {Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length} jobs
        </div>
      )}

      {/* No results message */}
      {filteredJobs.length === 0 && searchQuery && (
        <div className="text-gray-400 text-center py-8">
          No jobs found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
};

export default RemotiveRemoteJobs;