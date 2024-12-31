import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client'
const query = gql`
    query GetTodosWithUser {
        getTodos {
            id
            title
            completed
            user {
                id
                name
                email
            }
        }
    }
`

function App() {
  const { data, loading, error } = useQuery(query)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  console.log(data);
  return (
    <>
      {JSON.stringify(data)}
    </>
  );
}

export default App;
