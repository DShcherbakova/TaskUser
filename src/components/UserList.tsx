import axios from "axios";
import { ChangeEvent, Component, ReactNode } from "react";
import User from "./User";

export interface IUser {
  id: number;
  name: string;
  company: { name: string };
  phone: string;
}

interface IState {
  users: IUser[];
  newUser: Omit<IUser, "id">;
  // newName: string,
  // newCompany: string,
  // newPhone: string
}

class UserList extends Component<Record<string, never>, IState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      users: [],
      newUser: {
        company: {
          name: "",
        },
        name: "",
        phone: "",
      },
      // newCompany: '',
      // newName: '',
      // newPhone: ''
    };
  }

  componentDidMount(): void {
    axios
      .get<IUser[]>("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        this.setState({ ...this.state, users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addUser = () => {
    // const { length } = this.state.users;
    // const { company: { name: companyName }, name, phone } = this.state.newUser;

    this.setState((prevState) => ({
      users: [
        {
          id: this.state.users.length + 1,
          company: { name: this.state.newUser.company.name },
          name: this.state.newUser.name,
          phone: this.state.newUser.phone,
        },
        ...prevState.users,
      ],
      newUser: {
        company: {
          name: "",
        },
        name: "",
        phone: "",
      },
    }));
  };

  deleteUser = (userId: number) => {
    this.setState((prevState) => ({
      users: prevState.users.filter((user) => user.id !== userId),
      newUser: { ...prevState.newUser },
    }));
  };

  editUser = (updatedUser: IUser) => {
    this.setState((prevState) => ({
      users: prevState.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
      newUser: { ...prevState.newUser },
    }));
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // TODO
    const { name, value } = e.target;
    
    if (name === 'company') {
      this.setState({ ...this.state, newUser: { ...this.state.newUser, company: { name: value } }})
      return;
    }

    this.setState({ ...this.state, newUser: { ...this.state.newUser, [name === 'name' ? 'name' : 'phone']: value }})
  }

  render(): ReactNode {
    return (
      <div className="container mt-4">
        <h1 className="mb-4 text-center">User List App</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            value={this.state.newUser.name}
            name="name"
            onChange={(e) => this.handleInputChange(e)}
            className="form-control"
            placeholder="New Name"
          />
          <input
            type="text"
            value={this.state.newUser.company.name}
            name="company"
            onChange={(e) => this.handleInputChange(e)}
            className="form-control"
            placeholder="New Company"
          />
          <input
            type="text"
            value={this.state.newUser.phone}
            name="phone"
            onChange={(e) => this.handleInputChange(e)}
            className="form-control"
            placeholder="New Phone"
          />
          <button onClick={this.addUser} className="btn btn-primary">
            Add User
          </button>
        </div>
        <div className="row">
          {this.state.users.map(user => (
            <div className="col-md-6 mb-4">
              <User
                key={user.id}
                user={user}
                deleteUser={() => this.deleteUser(user.id)}
                editUser={this.editUser}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default UserList;