import gql from 'graphql-tag';

const addArticle = gql`
    mutation addArticle($title: String!, $content: String!, $image: String, $category: String!){
        addArticle(title: $title, content: $content, image: $image, category: $category) @client
    }
`
const dropArticle = gql`
    mutation dropArticle{
        dropArticle @client
    }
`

const addArticleToServer = gql`
    mutation addArticleToServer($title: String!, $content: String!, $image: String, $category: Category!){
        addArticle(input: {title: $title, content: $content, image: $image, category: $category}){
            article{
                id
            }
        }
    }
`
const updateCategory = gql`
    mutation updateCategory($category: String!){
        updateCategory(category: $category) @client
    }
`
const addDog = gql`
    mutation addDog($id: Int!,$name: String!,$picture: String,$gender: String!,$dateOfBirth: String,$breed: String!,$activities: String,$excersises: String){
        addDog(id: $id,name: $name,picture: $picture,gender: $gender,dateOfBirth: $dateOfBirth,breed: $breed,activities: $activities,excersises: $excersises) @client
    }
`
const addDogToServer = gql`
    mutation addDogToServer($name: String!,$picture: String,$gender: String!,$dateOfBirth: String!,$breed: String!){
        addDog(input:{name: $name, picture: $picture, gender: $gender,dateOfBirth: $dateOfBirth,breed: $breed}){
            dog {
                id
            }
        }
    }
`
export {
    addDogToServer,
    addDog,
    addArticle,
    dropArticle,
    addArticleToServer,
    updateCategory
}
