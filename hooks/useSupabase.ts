import { useAuth } from "@clerk/expo";
import { useMemo } from "react";
import { createclerkSupabaseClient } from "../lib/supabase";

 export function useSupabase(){
    const {getToken}=useAuth();

    const client =useMemo(
        ()=>createclerkSupabaseClient(()=>getToken()),
        [getToken]
    )
    return client;
 }