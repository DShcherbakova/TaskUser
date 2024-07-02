import React, { useEffect, useState } from "react";
import axios from "axios";

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<IUser[]>("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
      } catch (error) {
        console.log(error)
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mt-4" style={{ textAlign: 'center' }}>
      <h1>User List</h1>
      <div>
        {users.map((user) => (
          <div key={user.id} className="card mb-3" style={{ margin: '20px' }}>
            <div style={{ margin: '10px' }}>
              <h5>{user.name}</h5>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
