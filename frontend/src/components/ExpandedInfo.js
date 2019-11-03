import React, { useState } from 'react';
import styled from 'styled-components/macro';

const Container = styled.div``;

const Grades = styled.div``;

const Tags = styled.div`
  display: flex;
  flex-direction: column;

  span {
    padding: 3px 8px;
    background-color: lightgray;
    border-radius: 10px;
    margin: 0 8px;
  }
`;

const TagContainer = styled.div`
  span {
    width: fit-content;
  }
`;

function ExpandedInfo({ grades, addTag, tags, studentId }) {
  const [tagValue, setTagValue] = useState('');

  const handleChange = (e) => {
    setTagValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTag(tagValue);
    setTagValue('');
  };
  return (
    <Container>
      <Grades>
        {grades.map((grade, i) => {
          return (
            <p key={`${studentId}-grade-${i}`}>
              Test {i}: <span>{grade}%</span>
            </p>
          );
        })}
      </Grades>
      <Tags>
        <TagContainer>
          {tags.map((tag) => {
            return <span>{tag}</span>;
          })}
        </TagContainer>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="add-tag-input"
            name="addTag"
            onChange={handleChange}
            value={tagValue}
          />
        </form>
      </Tags>
    </Container>
  );
}

export default ExpandedInfo;
