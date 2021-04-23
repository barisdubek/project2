import React, { Component } from 'react'
import UserService from '../services/UserService';

class CreateUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            id_number:'',
            firstName: '',
            lastName: '',
            phone: '',
            city_code: '',
            montly_income_id: ''
        }

        this.changeIdNoHandler = this.changeIdNoHandler.bind(this);
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changeCityCodeHandler = this.changeCityCodeHandler.bind(this);
        this.changeMontlyIncomeHandler = this.changeMontlyIncomeHandler.bind(this);

        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
    }

    componentDidMount(){

        if(this.state.id === '_add'){
            return
        }else{
            UserService.getUserById(this.state.id).then( (res) =>{
                let user = res.data;

                this.setState({
                    id_number: user.id_number,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                    city_code: user.city_code,
                    montly_income_id: user.montly_income_id
                });
            });
        }        
    }
    saveOrUpdateUser = (e) => {
        e.preventDefault();
        let user = {
            id_number: this.state.id_number,
            firstName: this.state.firstName, 
            lastName: this.state.lastName, 
            phone: this.state.phone,
            city_code: this.state.city_code,
            montly_income_id: this.state.montly_income_id
        };

        if(this.state.id === '_add'){
            UserService.createUser(user).then(res =>{
                this.props.history.push('/users');
            });
        }else{
            UserService.updateUser(user, this.state.id).then( res => {
                this.props.history.push('/users');
            });
        }
    }

    changeIdNoHandler= (event) => {
        this.setState({id_number: event.target.value});
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changePhoneHandler= (event) => {
        this.setState({phone: event.target.value});
    }

    changeCityCodeHandler= (event) => {
        this.setState({city_code: event.target.value});
    }

    changeMontlyIncomeHandler= (event) => {
        this.setState({montly_income_id: event.target.value});
    }

    cancel(){
        this.props.history.push('/users');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add User</h3>
        }else{
            return <h3 className="text-center">Update User</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> ID No: </label>
                                            <input placeholder="ID No" name="id_number" className="form-control" 
                                                value={this.state.id_number} onChange={this.changeIdNoHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Phone No: </label>
                                            <input placeholder="Phone No" name="phone" className="form-control" 
                                                value={this.state.phone} onChange={this.changePhoneHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> City Code: </label>
                                            <input placeholder="City Code" name="city_code" className="form-control" 
                                                value={this.state.city_code} onChange={this.changeCityCodeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Montly Income Id: </label>
                                            <input placeholder="Montly Income Id" name="montly_income_id" className="form-control" 
                                                value={this.state.montly_income_id} onChange={this.changeMontlyIncomeHandler}/>
                                        </div>


                                        <button className="btn btn-success" onClick={this.saveOrUpdateUser}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateUserComponent