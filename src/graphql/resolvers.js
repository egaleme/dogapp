import { getArticle, getCategory, getDog } from './query'

export default {
    Mutation: {
        addArticle: (_, {title, content, image, category}, {cache}) =>{
            const query = getArticle
            const previousState = cache.readQuery({query})
            const data = {
                ...previousState,
                article: {__typename: 'article',title,content,image,category}
            }

            cache.writeQuery({query, data})
            return null
        },
        dropArticle: (_, _args ,{cache}) => {
            const query = getArticle
            const previousState = cache.readQuery({query})

            const data = {
                ...previousState,
                article: {__typename:'article', title: '',content: '',image: '',category: ''}
            }
            cache.writeQuery({query, data})
            return null
        },
        updateCategory: (_, {category}, {cache}) => {
            const query = getCategory
            const previousState = cache.readQuery({query})

            const data = {
                ...previousState,
                category: category
            }

            cache.writeQuery({query, data})
            return null
        },
        addDog: (_, {id,name,picture,gender,dateOfBirth,breed,activities,excersises}, {cache}) => {
            const query = getDog
            const previousState = cache.readQuery({query})
            const data = {
                ...previousState,
                dog: {__typename:'dog',id,name,picture,gender,dateOfBirth,breed,activities,excersises}
            }

            cache.writeQuery({writeQuery, data})

            return null
        }
    }
}