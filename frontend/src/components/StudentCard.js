import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import ExpandedInfo from './ExpandedInfo';

const Container = styled.div`
  border-top: 1px solid darkgray;
  border-bottom: 1px solid darkgray;
  padding: 20px;
  width: 100%;
  display: flex;
`;

const StudentImage = styled.div`
  width: 20%;
  border: 1px solid gray;
  border-radius: 500px;
  overflow: hidden;
  margin: 0 20px;
  min-width: 200px;
  height: 200px;
  img {
    width: 100%;
    height: auto;
  }
`;

const StudentInfo = styled.div`
  width: 80%;
`;

const StudentHeader = styled.header`
  display: flex;
  justify-content: space-between;
  span {
    font-size: 52px;
    color: lightgray;
    cursor: default;
    :hover {
      color: black;
    }
  }
`;

const StudentName = styled.h1`
  font-size: 40px;
  text-transform: uppercase;
`;

const StudentDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
`;

function DataCard({
  firstName,
  lastName,
  email,
  company,
  skill,
  pic,
  id,
  grades,
  filterName,
  filterTag,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [renderComponent, setRenderComponent] = useState(true);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const name = firstName + lastName;
    const nameIsNotFiltered = name.toLowerCase().includes(filterName);
    const tagIsNotFiltered =
      !filterTag || tags.some((tag) => tag.toLowerCase().includes(filterTag));

    setRenderComponent(nameIsNotFiltered && tagIsNotFiltered);
  }, [filterName, filterTag, firstName, lastName, tags]);

  const expandCard = () => {
    setIsExpanded(!isExpanded);
  };

  const addTag = (tag) => {
    setTags([...tags, tag]);
  };

  return renderComponent ? (
    <Container>
      <StudentImage>
        <img src={pic} alt="" />
      </StudentImage>
      <StudentInfo>
        <StudentHeader>
          <StudentName>{`${firstName} ${lastName}`}</StudentName>
          <span className="expand-btn" onClick={expandCard}>
            {isExpanded ? '-' : '+'}
          </span>
        </StudentHeader>
        <StudentDetails>
          <p>Email: {email}</p>
          <p>Company: {company}</p>
          <p>Skill: {skill} </p>
          <p>Average: {grades.reduce((a, b) => a + parseInt(b), 0) / grades.length}%</p>
          {isExpanded && (
            <ExpandedInfo grades={grades} addTag={addTag} tags={tags} studentId={id} />
          )}
        </StudentDetails>
      </StudentInfo>
    </Container>
  ) : null;
}

export default DataCard;
