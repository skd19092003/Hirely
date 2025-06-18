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


const Landingpage = () => {
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

      <div className='flex flex-row gap-3 sm:gap-y-5 sm:gap-x-8 lg:gap-x-16 lg:gap-y-8 mx-5 justify-center items-center'>
        {/* buttons */}
        <Link to="/job-listing">
          <Button variant="green" size="xl">Find Jobs</Button>
        </Link>
        <span>Or</span>
        <Link to="/post-job">
          <Button variant="blue" size="xl">Post a Job</Button>
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
            <CardHeader className="bg-blue-400 text-white flex items-center justify-center">
              <CardTitle className="font-bold">For Recruiters</CardTitle>
            </CardHeader>
            <CardContent className="bg-slate-200 text-black font-semibold flex  justify-center pt-4 items-end">
              Post jobs, manage applications, and find the best candidates.
            </CardContent>
          </Card>
        </section>
      




      {/* //banner */}
      <div className='flex flex-row justify-evenly w-full flex-wrap gap-y-5 gap-x-1 sm:gap-10 lg:gap-16 '>

        <img src="\public\ai-crowd.png" alt="banner1" className='aspect-square max-w-[120px]  sm:max-w-[380px] md:max-w-[420px] h-auto rounded-lg' />
        <img src="\public\dream-job-2904780_640.jpg" alt="banner2" className='aspect-square max-w-[120px] sm:max-w-[380px] md:max-w-[420px] h-auto rounded-lg ' />
        <img src="\public\japan-4141578_640.jpg" alt="banner3" className=' aspect-square max-w-[120px] sm:max-w-[380px] md:max-w-[420px] h-auto rounded-lg' />
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