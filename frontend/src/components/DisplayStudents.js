import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import StudentCard from './StudentCard';

const Layout = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  height: 90vh;
  width: 70vw;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin: auto;
  padding: 15px;
`;

function DisplayStudents({ data: { students = [] } }) {
  const [filterInput, setFilterInput] = useState({ filterName: '', filterTag: '' });

  const handleChange = ({ target: { name, value } }) => {
    setFilterInput({ ...filterInput, [name]: value.toLowerCase() });
  };

  return students.length ? (
    <Layout>
      <Container>
        <input
          type="text"
          onChange={handleChange}
          placeholder="search by name"
          id="name-input"
          name="filterName"
          value={filterInput.filterName}
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="search by tag"
          id="tag-input"
          name="filterTag"
          value={filterInput.filterTag}
        />
        {students.map((student) => {
          return (
            <StudentCard
              {...student}
              key={`student-card-${student.id}`}
              filterName={filterInput.filterName}
              filterTag={filterInput.filterTag}
            />
          );
        })}
      </Container>
    </Layout>
  ) : null;
}

export default DisplayStudents;
