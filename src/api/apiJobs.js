import supabaseClient from "@/utils/supabase";

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
