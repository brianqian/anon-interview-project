import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ExpandedInfo from './ExpandedInfo';

const Container = styled.div`
  border-top: 1px solid darkgray;
  border-bottom: 1px solid darkgray;
  display: flex;
  padding: 20px;
`;

const StudentInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
`;

const StudentText = styled.div`
  flex: 8;
  header {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 40px;
    }
  }
  h1 {
    font-size: 40px;
  }
`;

const StudentImage = styled.div`
  flex: 2;
  border: 1px solid gray;
  border-radius: 500px;
  overflow: hidden;
  margin: 0 20px;
  height: 200px;
  img {
    height: auto;
    width: 100%;
  }
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
      tags.some((tag) => tag.includes(filterTag)) || (!tags.length && !filterTag);
    setRenderComponent(nameIsNotFiltered && tagIsNotFiltered);
  }, [filterName, filterTag]);

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
      <StudentText>
        <header>
          <h1>{`${firstName} ${lastName}`}</h1>
          <span onClick={expandCard}>{isExpanded ? '-' : '+'}</span>
        </header>
        <StudentInfo>
          <p>Email: {email}</p>
          <p>Company: {company}</p>
          <p>Skill: {skill} </p>
          <p>Average: {grades.reduce((a, b) => a + parseInt(b), 0) / grades.length}%</p>
          {isExpanded && (
            <ExpandedInfo grades={grades} addTag={addTag} tags={tags} studentId={id} />
          )}
        </StudentInfo>
      </StudentText>
    </Container>
  ) : null;
}

export default DataCard;
