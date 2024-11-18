import React, {useEffect, useState} from 'react';
import { createLink } from '../api/api';
import "./LinkShortener.css";
import {ShortLink,getLocalItems,saveLocalItems} from "../helpers/helpers";
import { MdCopyAll } from 'react-icons/md';

const LinkShortener: React.FC = () => {
    const [fullLink, setFullLink] = useState('');
    const [shortLink, setShortLink] = useState();
    const [localLinks, setLocalLinks] = useState<ShortLink[]>([]);

    const handleShorten = async () => {
        const result = await createLink(fullLink);
        setShortLink(result.short_link);
        if(result.success) {
            if(!localLinks.some((item) => item.short_link === result.short_link)) {
                const newLocal: ShortLink = {
                    short_link: result.short_link,
                    full_link: result.full_link,
                    datetime: new Date().toISOString(),
                };
                setLocalLinks((prevLinks) => [...prevLinks, newLocal]);
            }
        }
    };
    useEffect(() => {
        setLocalLinks(getLocalItems());
    }, []);

    useEffect(() => {
        if(localLinks.length>0) {
            saveLocalItems(localLinks);
        }
    }, [localLinks]);

    return (
        // <div className="home-container">
            <div className="Frame1">
                <div className="container">
                    <div className="Logo">
                        <div className="Vector"><span className="f1">cen</span> <span className="f2">t</span>
                            <span className="f1">er_a</span><span className="f3">i</span>
                        </div>
                    </div>
                    <div className="Content">
                        <div className="Title">Short link</div>
                        <div className="input-filled">
                        <label htmlFor="fullLink" className="fullLink">Link to shortcut:</label>
                        <input
                            type="text"
                            className="underline-input"
                            id="fullLink"
                            value={fullLink}
                            onChange={(e) => setFullLink(e.target.value)}
                        />
                        </div>
                        <div className="button_primary">

                        <button onClick={handleShorten}
                                // style={{backgroundColor: 'darkblue', borderRadius: '5px', color: 'white',"width":"100%", "minHeight":"40px"}}>
                                className="Rectangle_67">
                            Shorten It
                        </button>
                        </div>

                        {shortLink && (
                            <div className="result">
                                <p className="result-text"> <a href={shortLink}>{shortLink}</a></p>
                                <button onClick={() => navigator.clipboard.writeText(shortLink)}><MdCopyAll/></button>
                            </div>
                        )}
                    </div>
                </div>

                    {(localLinks && localLinks.length > 0 ) && (
                        <div className="container">
                            <p> Last links</p>
                            {localLinks.map((link, index) => index<3?(

                                <div className="result_old" id={"local_" + index}>
                                    <div className="result-text2">{link.full_link}</div>
                                    <div className="result2">
                                        <div className="result-text"><a href={link.short_link}>{link.short_link}</a>
                                        </div>
                                        <button className="copy_old"
                                                onClick={() => navigator.clipboard.writeText(link.short_link)}>
                                            <MdCopyAll className="copy-icon"/></button>
                                    </div>
                                </div>
                            ):null)}
                        </div>)};
            </div>
    )};

export default LinkShortener;
