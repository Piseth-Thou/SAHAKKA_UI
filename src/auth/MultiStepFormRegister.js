import React, { useState, useEffect } from "react";
import { useForm, useStep } from "react-hooks-helper";
import { BashPersonalInfoStep } from "./stepForm/BashPersonalInfoStep";
import { ContactStep } from "./stepForm/ContactStep";
import { PersonalInfoStep } from "./stepForm/PersonalInfoStep";
import { useHistory } from "react-router-dom";
import { CompanyInfoForBuss } from "./stepForm/CompanyInfoForBuss";
import { PersonalInfoFreelancer } from "./stepForm/freelancerSignUp/PersonalInfoFreelancer";
import { ContactInfoFreelancer } from "./stepForm/freelancerSignUp/ContactInfoFreelancer";
import { ExpertiseAndBackground } from "./stepForm/freelancerSignUp/ExpertiseAndBackground";
import { ExperianceAndAchivement } from "./stepForm/freelancerSignUp/ExperianceAndAchivement";
import { strings } from "../localization/localization";
import {
  handleRegister,
  handleRegisterFreelancer,
} from "../services/authService";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import { getCurrentFormType } from "../services/form.service";
import { uploadImage } from "../services/uploadImageService";

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

export const MultiStepFormRegister = () => {
  const [email, setEmail] = useState("");
  const [passwords, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "/assets/freelancer_pro/defual_img.png"
  );
  const [imageFile, setImageFile] = useState(null);
  const [email_address, setEmailAddress] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [social_media, setSocialMedia] = useState([]);
  const [facebook, setFacebook] = useState("");
  const [telegram, setTelegram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkIn, setLinkIn] = useState("");
  const [provider_type, setProviderType] = useState("NORMAL");

  const [company_contact, setCompanyContact] = useState("");
  const [company_description, setCompanyDescription] = useState("");
  const [company_location, setCompanyLocation] = useState("");
  const [company_logo, setCompanyLogo] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [company_logo_file, setCompanyLogoFile] = useState("");

  const [achievement, setAchievement] = useState("");
  const [education_background, setEducation_background] = useState("");
  const [work_experience, setWork_experience] = useState("");
  const [languages, setLanguages] = useState("");
  const [skills, setSkills] = useState("");
  const [address, setAddress] = useState("");
  const [nationality, setNationality] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [client] = useState([
    { id: "bashPersonalInfo" },
    { id: "personalInfo" },
    { id: "contactInfo" },
    { id: "companyInfo" },
  ]);
  const [freelancer] = useState([
    { id: "bashPersonalInfo" },
    { id: "personalInfoFreelancer" },
    { id: "contactInfoFreelancer" },
    { id: "expertiseAndBackground" },
    { id: "experinceAndBackground" },
  ]);
  const [formType, setFormType] = useState(1);

  const type = getCurrentFormType();

  let { step, navigation } = useStep({
    steps: type === 1 ? client : freelancer,
    initialStep: 0,
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const onSignUp = async (e) => {
    console.log(setOpen);
    setIsLoading(true);
    e.preventDefault();
    // let setSocialMedia = ([
    //   facebook,
    //   telegram,
    //   twitter,
    //   linkIn
    // ])

    console.log("test socieal media ", facebook, telegram, twitter, linkIn);
    console.log(social_media);

    // if (imageFile) {
    //   //  imageUrl = await uploadImage(imageFile);
    //   setImageUrl(await uploadImage(imageFile));
    // }
    if (company_logo_file) {
      setCompanyLogo(await uploadImage(company_logo_file));
    }

    uploadImage(imageFile)
      .then((url) => {
    handleRegister(
      username,
      email,
      passwords,
      bio,
      company_contact,
      company_description,
      company_location,
      company_logo,
      company_name,
      company_logo_file,
      email_address,
      gender,
      // imageUrl,
      url,
      provider_type,
      // social_media,
      facebook,
      telegram,
      twitter,
      linkIn,
      telephone,
      address,
      nationality
    ).then((success) => {
      if (success) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${strings.signUpClientSuccess}`,
          showConfirmButton: false,
          timer: 4000,
        });
        history.push("/login");
      }
      setOpen(true);
    });
  })
}

  const onSignUpFreelancer = async (e) => {
    console.log(setOpen);
    setIsLoading(true);
    e.preventDefault();
    // if (imageFile) {
    //   setImageUrl(await uploadImage(imageFile));
    // }
    uploadImage(imageFile)
      .then((url) => {
        handleRegisterFreelancer(
          telephone,
          username,
          email,
          passwords,
          achievement,
          address,
          bio,
          education_background,
          languages,
          nationality,
          email_address,
          gender,
          url,
          // imageUrl,
          skills,
          facebook,
          telegram,
          twitter,
          linkIn,
          work_experience,
          provider_type
        )
          .then((success) => {
            if (success) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: `${strings.signUpFlSuccess}`,
                showConfirmButton: false,
                timer: 4000,
              });
              history.push("/login");
            }
            setOpen(true);
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  };

  useEffect(() => {
    let formTypeID = JSON.parse(localStorage.getItem("formType"));
    setFormType(formTypeID);
    console.log(formType, " Local Storage");
  }, [formType]);

  const [formData, setForm] = useForm(
    telephone,
    username,
    email,
    passwords,
    bio,
    company_contact,
    company_description,
    company_location,
    company_logo,
    company_name,
    company_logo_file,
    email_address,
    gender,
    imageUrl,
    imageFile,
    provider_type,
    social_media,
    facebook,
    telegram,
    twitter,
    linkIn,
    achievement,
    education_background,
    work_experience,
    skills,
    languages,
    address,
    nationality
  );

  const props = {
    onSignUp,
    onSignUpFreelancer,
    formData,
    setForm,
    navigation,
    setEmail,
    setUsername,
    setPassword,
    setBio,
    setCompanyContact,
    setCompanyDescription,
    setCompanyLocation,
    setCompanyLogo,
    setCompanyLogoFile,
    setGender,
    setFacebook,
    setTelegram,
    setTwitter,
    setLinkIn,
    setEmailAddress,
    setCompanyName,
    setImageUrl,
    setImageFile,
    setLanguages,
    setWork_experience,
    setAchievement,
    setSkills,
    setEducation_background,
    setAddress,
    setNationality,
    setProviderType,
    setSocialMedia,
    setTelephone,
    setOpen,
    open,
    step,
  };
  // console.log(step.id, "sahaka step form id");
  // console.count(step.id, "Hello");
  switch (step.id) {
    case "bashPersonalInfo":
      return <BashPersonalInfoStep {...props} />;
    case "personalInfo":
      return <PersonalInfoStep {...props} />;
    case "contactInfo":
      return <ContactStep {...props} />;
    case "companyInfo":
      return <CompanyInfoForBuss {...props} />;
    // ======================================
    case "personalInfoFreelancer":
      return <PersonalInfoFreelancer {...props} />;
    case "contactInfoFreelancer":
      return <ContactInfoFreelancer {...props} />;
    case "expertiseAndBackground":
      return <ExpertiseAndBackground {...props} />;
    case "experinceAndBackground":
      return <ExperianceAndAchivement {...props} />;
  }
  console.log(step);
  return (
    <div>
      <h1>Multi step form</h1>
    </div>
  );
};
export default MultiStepFormRegister;
