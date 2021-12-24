import React, { useContext, useEffect, useState } from 'react'
import { Context } from '.'
import { observer } from 'mobx-react-lite'
import LoginForm from './components/LoginForm'
import { IUser } from './models/IUser'
import UserService from './services/UserService'

const App: React.FC = () => {
    const { store } = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])
    console.log(users)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            console.log(response.data)
            setUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    if (!store.isAuth) {
        return (
            <>
                <LoginForm />
                <button onClick={getUsers}>Get users</button>
            </>
        )
    }

    if (store.isLoading) {
        return <div>LOADING...</div>
    }

    return (
        <div>
            <h1>
                {store.isAuth
                    ? `User Authorized ${store.user.email}`
                    : `LOG IN`}
            </h1>
            <h2>
                {store.user.isActivated ? 'Account confirmed by email' : 'Confirm your account'}
            </h2>
            <button onClick={() => store.logout()}>Exit</button>

            <button onClick={getUsers}>Get users</button>


            {users.map(user => {
                return <div key={user.email}>{user.email}</div>
            })}

        </div>
    )
}
export default observer(App)
