import React from "react";
import styled from "styled-components";

// Styled Components
const ProfileContainer = styled.div`
  font-family: "Arial", sans-serif;
  max-width: 900px;
  margin: 20px auto;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const CoverImageContainer = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileContent = styled.div`
  padding: 20px;
  text-align: center;
`;

const ProfileImageContainer = styled.div`
  margin: -60px auto 10px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid white;
  background-color: white;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const ProfileSection = styled.div`
  text-align: left;
  margin-top: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #444;
  margin-bottom: 8px;
`;

const SectionText = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
`;

const ProfileList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ProfileListItem = styled.li`
  background: #007bff;
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  display: inline-block;
`;

const ProfileLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const ResTemplate2 = ({ studentInfo }) => {
  if (!studentInfo) {
    return <p>No profile data available.</p>;
  }

  return (
    <ProfileContainer>
      {/* Cover Picture */}
      {studentInfo.coverPicture && (
        <CoverImageContainer>
          <CoverImage
            src={URL.createObjectURL(studentInfo.coverPicture)}
            alt="Cover"
          />
        </CoverImageContainer>
      )}

      <ProfileContent>
        {/* Profile Picture */}
        {studentInfo.profilePicture && (
          <ProfileImageContainer>
            <ProfileImage
              src={URL.createObjectURL(studentInfo.profilePicture)}
              alt="Profile"
            />
          </ProfileImageContainer>
        )}

        <ProfileName>Student Profile</ProfileName>

        {/* Description */}
        {studentInfo.description && (
          <ProfileSection>
            <SectionTitle>Description</SectionTitle>
            <SectionText>{studentInfo.description}</SectionText>
          </ProfileSection>
        )}

        {/* Address */}
        {studentInfo.address && (
          <ProfileSection>
            <SectionTitle>Address</SectionTitle>
            <SectionText>{studentInfo.address}</SectionText>
          </ProfileSection>
        )}

        {/* Dynamic Fields */}
        {[
          { label: "Skills", field: "skills" },
          { label: "Hobbies", field: "hobbies" },
          { label: "Certifications", field: "certifications" },
          { label: "Languages", field: "languages" },
          { label: "Organizations", field: "organizations" },
          { label: "Achievements", field: "achievements" },
        ].map(
          ({ label, field }) =>
            studentInfo[field]?.length > 0 && (
              <ProfileSection key={field}>
                <SectionTitle>{label}</SectionTitle>
                <ProfileList>
                  {studentInfo[field].map((item, index) => (
                    <ProfileListItem key={index}>{item}</ProfileListItem>
                  ))}
                </ProfileList>
              </ProfileSection>
            )
        )}

        {/* Links */}
        {studentInfo.links?.length > 0 && (
          <ProfileSection>
            <SectionTitle>Links</SectionTitle>
            <ProfileList>
              {studentInfo.links.map((link, index) => (
                <ProfileListItem key={index}>
                  <ProfileLink
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label || link.url}
                  </ProfileLink>
                </ProfileListItem>
              ))}
            </ProfileList>
          </ProfileSection>
        )}
      </ProfileContent>
    </ProfileContainer>
  );
};

export default ResTemplate2;
