import gql from 'graphql-tag';

 const getArticle = gql`
    query getArticle {
        article @client {
            title
            content
            image
            category
        }
    }
`
const getCategory = gql`
    query getCategory {
        category @client 
    }
`
const getDog = gql`
    query getDog {
      dog @client {
        id
        name
        picture
        gender
        dateOfBirth
        breed
        activities
        excersises
      }
    }
`

const getArticlesFromServer = gql`
query AllArticle{
  allArticles{
    nodes{
      id
      title
      content
      category
      image
      personByPersonId{
        firstName
      }
    }
  }
}
`
const getAllDogs = gql`
{
    allDogs{
      nodes{
        id
        picture
        name
        gender
        breed
        dateOfBirth
        activitiesByDogId{
          nodes{
            name
            createdAt
          }
        }
        excersisesByDogId{
          nodes{
            name
            createdAt
          }
        }
      }
    }
  }
`

export {
    getArticle,
    getCategory,
    getArticlesFromServer,
    getAllDogs,
    getDog
}