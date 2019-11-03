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

const DataCard = styled.section`
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

const ExpandedSection = styled.section``;

const ExpandedGrades = styled.div``;

const ExpandedTags = styled.div`
  display: flex;
  flex-direction: column;

  p {
    padding: 3px 8px;
    background-color: lightgray;
    border-radius: 10px;
    margin: 0 8px;
  }
`;

const TagContainer = styled.div`
  display: flex;
`;

function DisplayStudents({ data: { students = [] } }) {
  const [_students, setStudents] = useState([]);
  const [formInput, setFormInput] = useState({ filterName: '', filterTag: '', addTag: '' });
  const [studentMap, setStudentMap] = useState({});

  useEffect(() => {
    if (students.length) {
      setStudents(students);
      const newStudentMap = students.reduce((acc, student) => {
        return { ...acc, [student.id]: { expanded: false, tags: [] } };
      }, {});
      setStudentMap(newStudentMap);
    }
  }, [students]);

  const handleChange = ({ target: { name, value } }) => {
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = e.target.name;
    const updatedTags = [...studentMap[id].tags, formInput.addTag];
    setStudentMap({ ...studentMap, [id]: { ...studentMap[id], tags: updatedTags } });
    setFormInput({ ...formInput, addTag: '' });
  };

  const handleClick = (id) => {
    const updatedMap = { ...studentMap };
    updatedMap[id].expanded = !updatedMap[id].expanded;
    setStudentMap(updatedMap);
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
        {_students.map(({ firstName, lastName, email, company, skill, pic, id, grades }) => {
          if (!(firstName + lastName).toLowerCase().includes(formInput.filterName)) return null;
          const isExpanded = studentMap[id] && studentMap[id].expanded;
          return (
            <DataCard key={id}>
              <StudentImage>
                <img src={pic} alt="" />
              </StudentImage>
              <StudentText>
                <header>
                  <h1>{`${firstName} ${lastName}`}</h1>
                  <span onClick={() => handleClick(id)}>{isExpanded ? '-' : '+'}</span>
                </header>
                <StudentInfo>
                  <p>Email: {email}</p>
                  <p>Company: {company}</p>
                  <p>Skill: {skill} </p>
                  <p>Average: {grades.reduce((a, b) => a + parseInt(b), 0) / grades.length}%</p>
                  {isExpanded && (
                    <ExpandedSection>
                      <ExpandedGrades>
                        {grades.map((grade, i) => {
                          return (
                            <p>
                              Test {i}: <span>{grade}%</span>
                            </p>
                          );
                        })}
                      </ExpandedGrades>
                      <ExpandedTags>
                        <TagContainer>
                          {studentMap[id].tags.map((tag) => {
                            return <p>{tag}</p>;
                          })}
                        </TagContainer>
                        <form onSubmit={handleSubmit} name={id}>
                          <input
                            type="text"
                            id="add-tag-input"
                            name="addTag"
                            onChange={handleChange}
                            value={formInput.addTag}
                          />
                        </form>
                      </ExpandedTags>
                    </ExpandedSection>
                  )}
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
