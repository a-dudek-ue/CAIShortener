import axios from 'axios';
import {AxiosRequestConfig} from "axios";
import '../helpers/helpers'
import {getIpAddress, getBrowserAgent,isUrlValid} from "../helpers/helpers";

export const API_URL = 'http://localhost:8000/api';
const urlValidButNotActive = "URL valid but not active";
const cannotGenerateLinkDueToInternalError = "Cannot generate link due to internal error, sorry";
const pleaseProvideValidURLToShorter = "Please Provide Valid URL to Shorter";
const authToken = '553aa51c20a52b1665026785338f958b58b4098d';


const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization':'Token  553aa51c20a52b1665026785338f958b58b4098d'
    },
});

export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Token  ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const createLink = async (full_link: string) => {
    var checkLink=await isUrlValid(full_link);
    if(!checkLink){
        return {"short_link": pleaseProvideValidURLToShorter,"success":false};
    }
    try {
        setAuthToken(authToken);
        var ip=await getIpAddress()
        if (ip===null){
            ip='Undefined'
        }
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
        console.error('Error creating link:', error);
        return {"short_link":cannotGenerateLinkDueToInternalError,"full_link":cannotGenerateLinkDueToInternalError,"success":false};
    }
};


export const retrieve_link =  async (short_link: string | undefined):Promise<boolean> =>{
    if(short_link == null){
        return false;
    }
    setAuthToken(authToken);
    var ip=await getIpAddress()
    if (ip===null){
        ip='Undefined'
    }
    try{
        const response = await api.post(`${API_URL}/click_link/`,{short_link:short_link,'ip':ip,'user_agent':getBrowserAgent()});

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
