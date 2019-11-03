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
  const [_students, setStudents] = useState([]);
  const [formInput, setFormInput] = useState({ filterName: '', filterTag: '', addTag: '' });

  useEffect(() => {
    if (students.length) {
      setStudents(students);
    }
  }, [students]);

  const handleChange = ({ target: { name, value } }) => {
    setFormInput({ ...formInput, [name]: value });
    console.log(formInput);
  };

  console.log('display students: ', students);

  return students.length ? (
    <Layout>
      <Container>
        <input
          type="text"
          onChange={handleChange}
          placeholder="search by name"
          id="name-input"
          name="filterName"
          value={formInput.filterName}
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="search by tag"
          id="tag-input"
          name="filterTag"
          value={formInput.filterTag}
        />
        {_students.map((student) => {
          return (
            <StudentCard
              {...student}
              key={`student-card-${student.id}`}
              filterName={formInput.filterName}
              filterTag={formInput.filterTag}
            />
          );
        })}
      </Container>
    </Layout>
  ) : null;
}

export default DisplayStudents;
