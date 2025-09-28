import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import faqs from "../data/faqs.json";
import { useSearchParams } from 'react-router-dom';


const Landingpage = () => {

  //used for url checking recruiter access and used on button landing
  const [search] = useSearchParams();
  const isRecruiter = search.get("recruiter") === "true";
    


  return (
     
    <main className='flex flex-col gap-10 py-10 px-5 sm:gap-20  sm:py-15 '>
      <section className='text-center'>
        <h1 className='flex flex-col items-center justify-center gradient-title text-2xl font-extrabold sm:text-5xl lg:text-7xl tracking-tighter py-2'>
          Get Hired. Get Ahead. Get Hirely.
          <span className='flex items-center gap-2 sm:gap-4 lg:gap-6 mt-2 sm:mt-5'>
            At One Click.  <img src="/logo.png" alt="logo" className='h-8 sm:h-14 lg:h-20 lg:mx-4' />
          </span>
        </h1>
        <p className='text-gray-300  sm:mt-4 text-xs sm:text-xl font-semibold'>
          HIRELY - One stop solution for job seekers and employers. Find your dream job or the perfect candidate with ease.
        </p>
      </section>

      <div className='flex flex-row gap-1 sm:gap-4 lg:gap-8 xl:gap-10 mx-2 sm:mx-6 justify-center items-center'>
        {/* buttons */}
        <Link to="/job-listing" className="flex-1 sm:flex-none">
          <Button variant="green" size="sm" className="w-full sm:w-auto px-2 sm:px-8 lg:px-12 xl:px-16 py-2 sm:py-4 lg:py-6 xl:py-7 text-xs sm:text-base lg:text-xl xl:text-2xl font-semibold" onClick={e => {if (isRecruiter) {e.preventDefault();window.openGuestAccessModal();}}}>
            Find Jobs</Button>
        </Link>
        <Link to="/remotiveRemoteJobs" className="flex-1 sm:flex-none">
          <Button variant="outline" size="sm" className="w-full sm:w-auto px-2 sm:px-8 lg:px-12 xl:px-16 py-2 sm:py-4 lg:py-6 xl:py-7 text-xs sm:text-base lg:text-xl xl:text-2xl font-semibold border-gray-400 text-gray-300 hover:bg-gray-700">
            Remote Jobs</Button>
        </Link>
        <Link to="/post-job" className="flex-1 sm:flex-none">
          <Button variant="blue" size="sm" className="w-full sm:w-auto px-2 sm:px-8 lg:px-12 xl:px-16 py-2 sm:py-4 lg:py-6 xl:py-7 text-xs sm:text-base lg:text-xl xl:text-2xl font-semibold" onClick={e => {if (isRecruiter) {e.preventDefault(); window.openGuestAccessModal();}}}>
            Post a Job</Button>
        </Link>

      </div>

      {/* //carousal */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 1000,
          }),
        ]}
        className="w-full  pb-15"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            // basically map compies json data as parameter given nd returned item with image .
            //one element per slide mi, rha tha toh basis 1/3 for small screens and basis  for large screens is 6 items
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                loading="lazy"
                //img ko chita kiya
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      
        {/* //cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="bg-green-600 text-white flex items-center justify-center">
              <CardTitle className="font-bold">For Job Seekers</CardTitle>
            </CardHeader>
            <CardContent className="bg-slate-200 text-black font-semibold flex  justify-center pt-4">
              Search and apply for jobs, track applications, and more.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="bg-gray-600 text-white flex items-center justify-center">
              <CardTitle className="font-bold">For Recruiters</CardTitle>
            </CardHeader>
            <CardContent className="bg-slate-200 text-black font-semibold flex  justify-center pt-4 items-end">
              Post jobs, manage applications, and find the best candidates.
            </CardContent>
          </Card>
        </section>
      




      {/* //banner */}
      <div className='flex flex-row justify-evenly w-full flex-wrap gap-y-5 gap-x-1 sm:gap-10 lg:gap-16 '>

        <img src="/ai-crowd.png" alt="banner1" loading="lazy" className='aspect-square max-w-[120px]  sm:max-w-[380px] md:max-w-[420px] h-auto rounded-lg' />
        <img src="/dream-job-2904780_640.jpg" alt="banner2" loading="lazy" className='aspect-square max-w-[120px] sm:max-w-[380px] md:max-w-[420px] h-auto rounded-lg ' />
        <img src="/japan-4141578_640.jpg" alt="banner3" loading="lazy" className=' aspect-square max-w-[120px] sm:max-w-[380px] md:max-w-[420px] h-auto rounded-lg' />
      </div>





      {/* accordion */}
      
       <Accordion type="multiple" className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    

    </main>
  )
}

export default Landingpage



//extra questions
// 1. What is window.openGuestAccessModal?
// window is the global object in browsers. Any property you attach to window can be accessed from anywhere in your app, even across different components and files.
// window.openGuestAccessModal is a custom global function you’re defining, so that any part of your app can call it to open the Guest Access modal.
// 2. Why is it written outside the Header component?
// This line initializes the function on the global window object, so it always exists (prevents errors if called before Header mounts).
// It’s a placeholder; the real function is set inside the Header component.

// 3. What does the useEffect inside Header do?
// When the Header component mounts, this useEffect overwrites the global function to actually open the Guest Access modal (setshowsignin2(true)).
// Now, whenever window.openGuestAccessModal() is called, it will open the Guest Access modal in the Header

// 4. How does the Landing page get access to it?
// Because window.openGuestAccessModal is on the global window object, any component (including your Landing page) can call it:
// In your Landing page, when a recruiter tries to click "Find Jobs" or "Post a Job", you call this function to open the Guest Access modal, even though the modal state is managed in the Header.
// 5. Why use window for this?
// It’s a quick way to allow communication between components that don’t have a direct parent-child relationship (like Header and Landing).
// It avoids prop-drilling or setting up a React Context for a simple modal trigger.