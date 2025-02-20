import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ContactPreview } from './CardLanding/Types/ToContact';
import { ProfilePreview } from './CardLanding/Types/ToDirectURL';
import ShopLandingPage from './CardLanding/Types/ShopLanding';
import PortfolioLanding from './CardLanding/Types/PortfolioLanding';
import { EmbedLink } from './CardLanding/Types/ExternalLink';

function Response() {
  const { uname } = useParams(); // Get uname from route params
  const [response, setResponse] = useState(null);
  const [webType, setWebType] = useState("");

  useEffect(() => {
    const fetchWebData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/web/getWebData/${uname}`);
        setResponse(data.responseData);
        console.log(data)
        setWebType(data.webType);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
      }
    };

    fetchWebData();
  }, [uname]);

  if (!response) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div>
      <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
        {webType === "contact" && <ContactPreview contact={response} landing={true}/>}
        {webType === "link" && <ProfilePreview profileInfo={response} links={response.links} landing={true}/>}
        {webType === "shop" && <ShopLandingPage shopInfo={response} landing={true}/>}
        {webType === "student" && <PortfolioLanding studentInfo={response} landing={true}/>}
        {webType === "external" && <EmbedLink externalLink={response.externalLink} landing={true}/>}
      </div>
    </div>
  );
}

export default Response;
