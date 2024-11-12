import axios from 'axios';
export const isUrlValid = async (url: string):Promise<boolean> => {
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
    if (! urlRegex.test(url)){
        return false;
   };
    return true;
};


export const getIpAddress = async (): Promise<string | null> => {
    try {
        const response = await axios.get('https://api.ipify.org/?format=json');
        return response.data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return null;
    }
}

export const getBrowserAgent = (): string => {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Firefox")) {
        return "Firefox";
    } else if (userAgent.includes("Edg")) {
        return "Edge";
    } else if (userAgent.includes("Chrome") && !userAgent.includes("Edg") && !userAgent.includes("OPR")) {
        return "Chrome";
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
        return "Safari";
    } else if (userAgent.includes("OPR") || userAgent.includes("Opera")) {
        return "Opera";
    } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
        return "Internet Explorer";
    } else {
        return "Unknown";
    }
};

export interface ShortLink {
    short_link: string;
    full_link: string;
    datetime: string;
}

export const getLocalItems=(): ShortLink[] => {
    const savedLinks = localStorage.getItem('shortLinks');
    if (savedLinks) {
        // console.log(savedLinks);
        return (JSON.parse(savedLinks));
    }
    else{
        return [];
    }
}

export const saveLocalItems=(items:ShortLink[]): void=> {
    if(items.length>3) {
        items = items.slice()
            .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
            .slice(0, 3);
    }
    localStorage.setItem('shortLinks', JSON.stringify(items));
}
