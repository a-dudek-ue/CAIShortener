import axios, {AxiosResponse} from 'axios';
import {AxiosRequestConfig} from "axios";
import '../helpers/helpers'
import {getIpAddress, getBrowserAgent,isUrlValid} from "../helpers/helpers";

export const API_URL = process.env.REACT_APP_API_URL || 'http://center.ai:8000/api';
export const username = process.env.REACT_DJANGO_USER ||'andrzej';
export const password = process.env.REACT_DJANGO_PASSWORD ||'admin123';

const urlValidButNotActive = "URL valid but not active";
const cannotGenerateLinkDueToInternalError = "Cannot generate link due to internal error, sorry";
const pleaseProvideValidURLToShorter = "Please Provide Valid URL to Shorter";
var  authToken:string | null;


const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const getAuthToken = async(username:string, password:string) => {
 const response = await api.post(`${API_URL}/token/`, { "username":username, "password":password });
 if(response.data.access==null) {
     const response2 = await api.post(`${API_URL}/token/refresh`, { "refresh":"$response.data.refresh"});
     return response2.data.access;
 }
 return response.data.access;
};

export const setAuthToken = async (username:string, password:string) => {
  authToken = localStorage.getItem('authToken');
  if (authToken===null || authToken==="unknown") {
    authToken=await getAuthToken(username,password);
    localStorage.setItem('authToken',authToken===null?"unknown":authToken);
  }
  api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
};


export const createLink = async (full_link: string) => {
    var checkLink=await isUrlValid(full_link);
    if(!checkLink){
        return {"short_link": pleaseProvideValidURLToShorter,"success":false};
    }
    try {
        var ip=await getIpAddress()
        if (ip===null){
            ip='Undefined'
        }
        await setAuthToken(username,password);
        const response = await api.post('/create_link/',{full_link: full_link,'ip':ip,'user_agent':getBrowserAgent()});
        console.log(response.status.toString())
        if(response.status==201){
            let data=response.data;
            data["success"]=true
            return response.data;
        }
        else if(response.status==204){
            return {
                "short_link": urlValidButNotActive,
                "full_link": urlValidButNotActive,
                "success":false
            };
        }
        else {
            return {
                "short_link": cannotGenerateLinkDueToInternalError,
                "full_link": cannotGenerateLinkDueToInternalError,
                "success":false
            };
        }
    }
    catch(error){
        localStorage.removeItem('authToken');
        console.error('Error creating link:', error);
        return {"short_link":cannotGenerateLinkDueToInternalError,"full_link":cannotGenerateLinkDueToInternalError,"success":false};
    }
};


export const retrieve_link =  async (short_link: string | undefined):Promise<boolean> =>{
    if(short_link == null){
        return false;
    }
    var ip=await getIpAddress()
    if (ip===null){
        ip='Undefined'
    }
    await setAuthToken(username,password);

    try{
        const response = await api.post(`${API_URL}/click_link/`,{short_link:short_link,'ip':ip,'user_agent':getBrowserAgent()}
        );

        // Assuming the backend returns a JSON object with `full_link`
        if(response.status==204){
            return false;
        }
        else if (response.status==201) {
            console.log(response.data);
            const fullLink = response.data.full_link;

            if (fullLink) {
                // Redirect to the full link if it exists
                window.location.href = fullLink;
            } else {
                // Redirect to the home page if no full link is found
                return false;
            }
        }else {
            // Redirect to the home page if no full link is found
            return false;
        }

    } catch (error) {
        // Redirect to the home page in case of an error (e.g., link not found)
        console.log("Error fetching the full link:", error);
        return false;
    }
    return true;
    };

// GET methods to fetch link data by country and user agent
export const getLinksByCountry = async (country: string) => {
    const response = await api.get(`/links_by_country/${country}/`);
    return response.data;
};

export const getLinksByUserAgent = async (userAgent: string) => {
    const response = await api.get(`/links_by_user_agent/${userAgent}/`);
    return response.data;
};
