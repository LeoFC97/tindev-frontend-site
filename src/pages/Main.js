import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import './Main.css'
import logo from '../assets/logo.svg'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'
import api from '../services/api'
export default function Main({match}){
    const [users,setUsers] = useState([ ])
    useEffect( () => {
        async function loadUsers(){
            const response = await api.get('/devs',{
                headers:{
                    user:match.params.id,
                }
            })
            setUsers(response.data)
        }
        loadUsers();
    }, [match.params.id])
    async function handleLike(idToBeLiked){
        await api.post(`/devs/${idToBeLiked}/likes`,null,{
            headers:{
                user:match.params.id
            }
        })
        setUsers(users.filter(user => user._id!==idToBeLiked))
    }
    async function handleDislike(idToBeDisliked){
        await api.post(`/devs/${idToBeDisliked}/dislikes`,null,{
            headers:{
                user:match.params.id
            }
        })
        setUsers(users.filter(user => user._id!==idToBeDisliked))
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="tindev" ></img>
            </Link>
                {users.length >0 ? ( //if ternário para checar se esta vazio
/*nao esta vazio*/  <ul> 
                        {users.map(user =>(
                                <li key={user._id}>
                                <img src={user.avatar}alt="avatar do usuario"></img>
                                <footer>
                                    <strong>{user.name}</strong>
                                    <p>{user.bio}</p>
                                </footer>
                                <div className="buttons">
                                    <button onClick={() => handleLike(user._id)} type="button">
                                        <img src={like} alt="like "/>
                                    </button>
                                    <button onClick={() => handleDislike(user._id)} type="button">
                                        <img src={dislike} alt="dislike"/>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="empty-list">
                        Acabou :(
                    </div>
                ) }
        </div>
    )

}