import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';

const Layout = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  height: 80vh;
  width: 70vw;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin: auto;
  padding: 15px;
`;

const DataCard = styled.div`
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
  img {
    height: 100%;
    width: 100%;
  }
`;

function DisplayStudents({ data: { students = [] } }) {
  const [_students, setStudents] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    setStudents(students);
  }, [students]);

  const handleChange = (e) => {
    setFilterValue(e.target.value);
  };

  console.log('display students: ', students);

  return students.length ? (
    <Layout>
      <Container>
        <input type="text" onChange={handleChange} placeholder="search by name" id="name-input" />
        {_students.map(({ firstName, lastName, email, company, skill, pic, id, grades }) => {
          if (!(firstName + lastName).toLowerCase().includes(filterValue)) return null;
          return (
            <DataCard key={id}>
              <StudentImage>
                <img src={pic} alt="" />
              </StudentImage>
              <StudentText>
                <h1>{`${firstName} ${lastName}`}</h1>
                <StudentInfo>
                  <p>Email: {email}</p>
                  <p>Company: {company}</p>
                  <p>Skill: {skill} </p>
                  <p>Average: {grades.reduce((a, b) => a + parseInt(b), 0) / grades.length}%</p>
                </StudentInfo>
              </StudentText>
            </DataCard>
          );
        })}
      </Container>
    </Layout>
  ) : null;
}

export default DisplayStudents;
