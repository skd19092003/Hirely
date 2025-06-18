import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb, options = {}) => {

  // This custom hook is used to fetch data from an API
  // It takes a callback function (cb) that performs the fetch operation
  // and an optional options object that can contain additional parameters.
  // It returns an object with data, loading, error, and a function to call the fetch operation (fn).


  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
// What does loading do?
// loading is true when a fetch is in progress, and false when it’s done.
// You can use it in your component to show a loader/spinner while data is being fetched.

  const { session } = useSession();

  const fn = async (...args) => {
    // This function will be called to fetch data
    // It takes any number of arguments and passes them to the callback function (cb)
    // It will set the data state to the response from the callback function (cb)


    setLoading(true);
    // This sets the loading state to true, indicating that a fetch operation is in progress
    setError(null);

    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });
      const response = await cb(supabaseAccessToken, options, ...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;