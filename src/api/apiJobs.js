import supabaseClient from "@/utils/supabase";

//this __ means options={} ,not providing anything from the custom hook
// only token and ...args can be send thru function()

// Fetch Jobs
export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select("*, saved: saved_jobs(id), company: companies(name,logo_url)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}



// Save or Unsave Job
// This function will handle saving or unsaving a job based on the alreadySaved flag.
// It will either insert a new saved job or delete an existing one.
// The saveData object should contain the job_id and user_id.

// savedata will save into database the savedjob and alreadysaved will check whether the job is already saved or not
export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);

  if(alreadySaved){
    const { data, error: deleteerror } = await supabase
     .from("saved_jobs")
     .delete().eq("job_id", saveData.job_id)

      if (deleteerror) {
    console.error("Error failed to delete saved job:", deleteerror);
    return null;}
  
    return data;
  }else{
    const { data, error:inserterror } = await supabase
     .from("saved_jobs")
     .insert([saveData])
     .select();

      if (inserterror) {
    console.error("Error failed to delete saved job:", inserterror);
    return null;}

     return data;

  }

}



// Fetch single job 
export async function getSingleJob(token,{job_id}) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("jobs").select("*,company:companies(name,logo_url), applications: applications(*)").eq("id",job_id).single();
  //here we are fetching the job details along with the company details and the applications details 
  //the applications work here is that it will fetch all the applications for a single job
  //  eq compoares jobs id and applicatin job id AND single fetches only one job

  if (error) {
    console.error("Error fetching jobs:", error);
    return null;
  }

  return data;
} 
export async function updateHiringStatus(token,{job_id}, isopen) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("jobs").update({isopen:isopen}).eq("id",job_id).single();
  if (error) {
    console.error("Error fetching jobs:", error);
    return null;
  }

  return data;
} 
//this __ means options={} ,not providing anything from the custom hook
// only token and ...args can be send thru function()

export async function addNewJob(token, __ , jobData ) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("jobs")
  .insert([jobData])
  .select();
  
  if (error) {
    console.error("Error Creating Job:", error);
    return null;
  }

  return data;
} 