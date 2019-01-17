import React from 'react';

let ajax = require('superagent');


class NewAccount extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            isLoading: false,
            name: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            errormsg: '',
            successmsg: ''
        };
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleFormChange(event) {
		console.log(this.state);
        switch(event.target.id) {
            case 'name':
                this.setState({name: event.target.value});
                break;
            case 'street':
				this.setState({street: event.target.value});
                break;
            case 'city':
				this.setState({city: event.target.value});
                break;
            case 'state':
				this.setState({state: event.target.value});
                break;
            case 'zip':
				this.setState({zip: event.target.value});
                break;
            case 'country':
				this.setState({country: event.target.value});
                break;
        }
	}
	validateForm() {
		// if(this.validateEmail() && this.state.subject.text.length > 4 && this.state.message.text.length > 12) {
		// 	return true;
		// } else {
		// 	return false;
		// }
        return true;
	}
	addErrors() {
		if(!this.validateEmail()) {
			this.setState({email: { hasError: true, text: this.state.email.text }});
		}
		if(this.state.subject.text.length <= 4) {
			this.setState({subject: { hasError: true, text: this.state.subject.text }});
		}
		if(this.state.message.text.length <= 12) {
			this.setState({message: { hasError: true, text: this.state.message.text }});
		}
	}
	handleFormSubmit(event) {
        event.preventDefault();
		this.setState({isLoading: true});
		if(this.validateForm()) {
			let contactEndUrl = '/new/account/';
			ajax.post(contactEndUrl)
				.set({ 'Content-Type': 'application/json' })
				.send(this.state)
				.end((error, response) => {
                    this.setState({isLoading: false});
                    if(!error && response.status == 200) {
                        console.log('success');
                        console.log(response);
						this.setState({
                            isLoading: false,
                            name: '',
                            street: '',
                            city: '',
                            state: '',
                            zip: '',
                            country: '',
                            errormsg: ''
						});
                    } else {
                        console.log('fail');
                        console.log(error);
                        this.setState({
                            isLoading: false,
                            name: '',
                            street: '',
                            city: '',
                            state: '',
                            zip: '',
                            country: '',
                            errormsg: 'something went wrong, please try again'
						})
                    }
                });
		} else {
			this.addErrors();
			this.setState({isLoading: false});
		}
	}
    msgMarkup() {
        if(this.state.errormsg != '') {
            return (
                <div class="alert alert-danger" role="alert">
                    { this.state.errormsg }
                </div>
            );
        } else if(this.state.successmsg != '') {
            return (
                <div class="alert alert-success" role="alert">
                    { this.state.errormsg }
                </div>
            );
        }
    }
	markup() {
		if(this.state.isLoading) {
			return (
				<form class="form-horizontal" action="">
					<div class="col-sm-offset-4 col-sm-4">
						<i class="fa fa-spinner fa-spin loadingCon" />
					</div>
					<div class="form-group">
						<div class="col-sm-offset-2 col-sm-10">
							<button type="submit" class="btn btn-cSend disabled">Send</button>
						</div>
					</div>
				</form>
			);
		} else {
			return (
				<form class="form-horizontal" action="" onSubmit={this.handleFormSubmit}>
                    <div class="form-group">
                        <label for="message" class="col-sm-2 control-label">Account Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="name" placeholder="account name" onChange={this.handleFormChange} value={this.state.name} />
                        </div>
                    </div>
                    <div class="form-group">
    					<label for="message" class="col-sm-2 control-label">Street</label>
    					<div class="col-sm-10">
    						<textarea class="form-control" rows="3" id="street" placeholder="street" onChange={this.handleFormChange} value={this.state.street} />
    					</div>
    				</div>
                    <div class="form-group">
    					<label for="message" class="col-sm-2 control-label">City</label>
    					<div class="col-sm-10">
                            <input type="text" class="form-control" id="city" placeholder="city" onChange={this.handleFormChange} value={this.state.city} />
    					</div>
    				</div>
                    <div class="form-group">
    					<label for="message" class="col-sm-2 control-label">State</label>
    					<div class="col-sm-10">
                            <input type="text" class="form-control" id="state" placeholder="state" onChange={this.handleFormChange} value={this.state.state} />
    					</div>
    				</div>
                    <div class="form-group">
    					<label for="message" class="col-sm-2 control-label">Zip</label>
    					<div class="col-sm-10">
                            <input type="number" class="form-control" id="zip" placeholder="zip" onChange={this.handleFormChange} value={this.state.zip} />
    					</div>
    				</div>
                    <div class="form-group">
    					<label for="message" class="col-sm-2 control-label">Country</label>
    					<div class="col-sm-10">
                            <input type="text" class="form-control" id="country" placeholder="country" onChange={this.handleFormChange} value={this.state.country} />
    					</div>
    				</div>
					<div class="form-group">
						<div class="col-sm-offset-2 col-sm-10">
							<button type="submit" class="btn btn-cSend">Send</button>
						</div>
					</div>
				</form>
			);
		}
	}

	render() {


		return (
			<div>
				<div class="row">
	                <div class="text-center">
	                    <h1>Add a new account</h1>
	                </div>
		    	</div>
                { this.msgMarkup() }
				{ this.markup() }
			</div>
		);
	}
}

export default NewAccount;
