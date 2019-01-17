import React from 'react';
import {Link} from 'react-router';
import Footer from './components/Footer.js';


class Layout extends React.Component {

	constructor(props) {
		super(props);
	}

	navMarkup() {

		let currLocc = this.props.location.pathname;
		console.log(currLocc);

		console.log(this.props.location);
		switch(currLocc) {
			case '':
			case '/':
				return (
					<ul class="nav navbar-nav navbar-right">
						<li class="active"><Link to='/'>Account Map</Link></li>
						<li><Link to='new'>New Account</Link></li>
					</ul>
				);
				break;
			case 'new':
			case '/new':
				return (
					<ul class="nav navbar-nav navbar-right">
						<li><Link to='/'>Account Map</Link></li>
						<li class="active"><Link to='new'>New Account</Link></li>
					</ul>
				);
				break;
		}
	}

	render() {

		let pageNavMarkup = this.navMarkup();

	    return (
			<html>
	          	<head>
			        <meta charSet="utf-8" />
					<link href="https://fonts.googleapis.com/css?family=Anaheim|Crushed" rel="stylesheet" />
					<link href="/css/font-awesome.min.css" rel="stylesheet" />
    				<link href="/css/bootstrap.min.css" rel="stylesheet" />
    				<link href="/css/index.css" rel="stylesheet" />
    				<link href="/css/bstrapoverrides.css" rel="stylesheet" />
	              	<title>Account Map</title>
	          	</head>
	          	<body>
				    <nav class="navbar navbar-default navbar-fixed-top">
						<div class="container">
							<div class="navbar-header">
								<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
									<span class="sr-only">Toggle navigation</span>
									<span class="icon-bar"></span>
									<span class="icon-bar"></span>
									<span class="icon-bar"></span>
								</button>
								<Link to='/' activeClassName="navbar-brand">Account Map</Link>
							</div>
							<div id="navbar" class="navbar-collapse collapse">
								{ pageNavMarkup }
							</div>
						</div>
				    </nav>
					<div class="container">
						{ this.props.children }
				    </div>
	                <Footer />
	              	<script src='/index.js' />
	          	</body>
	      </html>
	    );
  	}
}

export default Layout;
