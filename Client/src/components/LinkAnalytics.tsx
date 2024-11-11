// TabsPage.tsx

import React, { useState } from 'react';
import './LinkAnalytics.css';

const LinksAnalytics: React.FC = () => {
    // State to track the active tab
    const [activeTab, setActiveTab] = useState<'links' | 'clicks'>('links');

    // Handler for switching tabs
    const handleTabClick = (tab: 'links' | 'clicks') => {
        setActiveTab(tab);
    };

    return (
        <div className="tabs-page">
            <div className="tabs">
                <button
                    className={`tab-button ${activeTab === 'links' ? 'active' : ''}`}
                    onClick={() => handleTabClick('links')}
                >
                    Links
                </button>
                <button
                    className={`tab-button ${activeTab === 'clicks' ? 'active' : ''}`}
                    onClick={() => handleTabClick('clicks')}
                >
                    Clicks
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'links' && (
                    <div>
                        <h2>Links</h2>
                        <p>This is the content for the Links tab.</p>
                        {/* Render list or table of links here */}
                    </div>
                )}
                {activeTab === 'clicks' && (
                    <div>
                        <h2>Clicks</h2>
                        <p>This is the content for the Clicks tab.</p>
                        {/* Render list or table of clicks here */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LinksAnalytics;
