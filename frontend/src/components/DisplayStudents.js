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
`;

const StudentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

function DisplayStudents({ data: { students = [] } }) {
  // const [students, setStudents] = useState([]);
  // useEffect(() => {
  //   setStudents(data.students);
  //   console.log(data);
  // }, [data]);
  console.log(students);

  return students.length ? (
    <Layout>
      <Container>
        {students.map(({ firstName, lastName, email, company, skill, pic, id, grades }) => (
          <DataCard key={id}>
            <h1>{`${firstName} ${lastName}`}</h1>
            <StudentInfo>
              <p>Email: {email}</p>
              <p>Company: {company}</p>
              <p>Skill: {skill} </p>
              <p>
                Average: {grades.reduce((a, b) => parseInt(a) + parseInt(b), 0) / grades.length}%
              </p>
            </StudentInfo>
          </DataCard>
        ))}
      </Container>
    </Layout>
  ) : null;
}

export default DisplayStudents;
