import React, { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import Modal from "../../components/modal/Modal"
import {ContactInput, ContactPreview} from "./Types/ToContact";
import {Links, ProfilePreview} from "./Types/ToDirectURL";
import ShopInfoForm from "./Types/ShopInfoForm";
import ShopLanding from "./Types/ShopLanding";
import Portfolio from "./Types/Portfolio";
import PortfolioLanding from "./Types/PortfolioLanding";
import { ExternalLink,EmbedLink } from "./Types/ExternalLink";
import axios from "axios";

const Step2 = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [webType, setWebType] = useState('contact')
    const [externalLink, setExternalLink] = useState("");
    const [contact, setContact] = useState({
        name: "",
        company: "",
        phone: "",
        email: "",
        address: "",
        gstn: "",
      });
    const [profileInfo, setProfileInfo] = useState({ 
        name: "",
        phone: "",
        email: "",
        address: "",
        bio: "", 
        profilePicture: "" ,
        backgroundImage:""
    });
    const [links, setLinks] = useState([]);
    const [shopInfo, setShopInfo] = useState({
        logo: null,
        name:"",
        phone: "",
        email: "",
        otherPictures: [],
        productCategories: [],
        businessHours: {
          Monday: { open: false, openingTime: "", closingTime: "" },
          Tuesday: { open: false, openingTime: "", closingTime: "" },
          Wednesday: { open: false, openingTime: "", closingTime: "" },
          Thursday: { open: false, openingTime: "", closingTime: "" },
          Friday: { open: false, openingTime: "", closingTime: "" },
          Saturday: { open: false, openingTime: "", closingTime: "" },
          Sunday: { open: false, openingTime: "", closingTime: "" },
        },
        inquiryPreference: "phone",
      });

      const [studentInfo, setStudentInfo] = useState({
        name: "",
        profession: "",
        description: "",
        email:"",
        phone:"",
        profilePicture: null,
        coverPicture: null,
        academics: [],
        address: "",
        skills: [],
        hobbies: [],
        links: [],
        certifications: [],
        languages: [],
        organizations: [],
        achievements: [],
        works: [],
        experiences: [],
      });

    const handleWebTypeChange = (type) => {
        setWebType(type);
       console.log(type)
    };

    const uploadImage = async (file, name) => {
        if (!file) return null; // If no file, return null

        const formData = new FormData();
        formData.append("image", file);
        formData.append("name", name); // Use a unique name for each image

        const response = await axios.post("http://localhost:8000/api/images/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        });

        return response.data; // Assuming the server responds with the uploaded image URL
    };
    console.log(profileInfo.backgroundImage)
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData;

        profileInfo.profilePicture = profileInfo.profilePicture ? await uploadImage(profileInfo.profilePicture,Date.now()) : null;
        profileInfo.backgroundImage = profileInfo.backgroundImage ? await uploadImage(profileInfo.backgroundImage, Date.now()) : null;

        studentInfo.profilePicture = studentInfo.profilePicture ? await uploadImage(studentInfo.profilePicture,Date.now()) : null;
        studentInfo.coverPicture = studentInfo.coverPicture ? await uploadImage(studentInfo.coverPicture, Date.now()) : null;
        
        shopInfo.logo = shopInfo.logo ? await uploadImage(shopInfo.logo, Date.now()) : null;


        shopInfo.otherPictures = shopInfo.otherPictures
            ? await Promise.all(
                shopInfo.otherPictures.map(async (picture) => 
                    await uploadImage(picture, Date.now())
                )
                )
            : [];

        shopInfo.productCategories = shopInfo.productCategories
            ? await Promise.all(
                shopInfo.productCategories.map(async (category) => ({
                    name: category.name,
                    image: await uploadImage(category.image, Date.now())
                }))
                )
            : [];
        

        if(webType === 'contact'){
            formData = contact
        }else if(webType === 'link'){
            formData = {...profileInfo,links}
        }else if(webType === 'shop'){
            formData = shopInfo
        }else if(webType === 'student'){
            formData = studentInfo
        }else {
            formData = {externalLink}
        }

        try {
            const response = await axios.post("http://localhost:8000/api/web", {formData,id,webType},{withCredentials:true});
            console.log(response)
            navigate(`/client/pay/${id}`);
        } catch (error) {
         console.log(error)
        }

        
    };
    

    return (
        <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Your Card</h1>
        <div className="mb-6">
            <div className="flex justify-between items-center">
            {[1, 2, 3].map((step) => (
                <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
                >
                {step}
                </div>
            ))}
            </div>
            <div className="mt-2 bg-gray-200 h-1 rounded">
            <div className="bg-blue-500 h-1 rounded" style={{ width: "70%" }}></div>
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
            {/* Left side */}
            <h3 className="text-lg font-semibold mb-4">Select Website Type</h3>
            <div className="flex gap-4 mb-6 overflow-x-auto">
                <button
                onClick={() => handleWebTypeChange("contact")}
                className={`flex-1 p-2 rounded-lg transition-colors ${
                    webType === "contact" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
                >
                VCard
                </button>
                <button
                onClick={() => handleWebTypeChange("link")}
                className={`flex-1 p-2 rounded-lg transition-colors ${
                    webType === "link" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
                >
                Links
                </button>
                <button
                onClick={() => handleWebTypeChange("shop")}
                className={`flex-1 p-2 rounded-lg transition-colors ${
                    webType === "shop" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
                >
                Shop
                </button>
                <button
                onClick={() => handleWebTypeChange("student")}
                className={`flex-1 p-2 rounded-lg transition-colors ${
                    webType === "student" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
                >
                Student
                </button>
                <button
                onClick={() => handleWebTypeChange("external")}
                className={`flex-1 p-2 rounded-lg transition-colors ${
                    webType === "external" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
                >
                External 
                </button>
            </div>
            {webType === "contact" && (
                <div className="w-full">
                    <ContactInput contact={contact} setContact={setContact} />
                </div>

            )}
            {webType === "link" && (
                <div className="w-full">
                    <Links profileInfo={profileInfo} setProfileInfo={setProfileInfo} links={links} setLinks={setLinks} Landing={false} />
                </div>

            )}
            {webType === "shop" && (
                <div className="w-full">
                    <ShopInfoForm shopInfo={shopInfo} setShopInfo={setShopInfo} />
                </div>

            )}
            {webType === "student" && (
                <div className="w-full">
                    <Portfolio studentInfo={studentInfo} setStudentInfo={setStudentInfo} />
                </div>

            )}
            {webType === "external" && (
                <div className="w-full">
                    <ExternalLink externalLink={externalLink} setExternalLink={setExternalLink} />
                </div>

            )}
            </div>

            <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
            {webType === "contact" && (
            <div className="w-full">
                    <ContactPreview contact={contact} />
                </div>
            )}
             {webType === "link" && (
                <ProfilePreview  profileInfo={profileInfo} links={links} />

            )}
             {webType === "shop" && (
                <ShopLanding  shopInfo={shopInfo} />
            )}
            {webType === "student" && (
                <div className="w-full">
                    <PortfolioLanding studentInfo={studentInfo}  />
                </div>

            )}
             {webType === "external" && (
                <div className="w-full">
                    <EmbedLink externalLink={externalLink} />
                </div>

            )}
            </div>
        </div>

        <div className="flex justify-end mt-6">
            <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleSubmit}
            >
                Next
            </button>
        </div>
        </div>
    );
    };

    export default Step2;