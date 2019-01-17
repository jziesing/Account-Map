import React from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";


import { scaleLinear } from "d3-scale";
import { csv } from "d3-fetch";


let ajax = require('superagent');

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
};

const markers = [
    { markerOffset: -25, name: "Buenos Aires", coordinates: [-58.3816, -34.6037] },
    { markerOffset: -25, name: "La Paz", coordinates: [-68.1193, -16.4897] },
    { markerOffset: 35, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
    { markerOffset: 35, name: "Santiago", coordinates: [-70.6693, -33.4489] },
    { markerOffset: 35, name: "Bogota", coordinates: [-74.0721, 4.7110] },
    { markerOffset: 35, name: "Quito", coordinates: [-78.4678, -0.1807] },
    { markerOffset: -25, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
    { markerOffset: -25, name: "Asuncion", coordinates: [-57.5759, -25.2637] },
    { markerOffset: 35, name: "Paramaribo", coordinates: [-55.2038, 5.8520] },
    { markerOffset: 35, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
    { markerOffset: -25, name: "Caracas", coordinates: [-66.9036, 10.4806] },
];


class AccountMap extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            parentAccounts: [],
            searchParentAccounts: [],
            searchString: '',
            selectedParentAccount: '',
            selectedChildAccounts: []
        };
        // methods
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleAccountClick = this.handleAccountClick.bind(this);
	}

    componentWillMount() {
        let fetchAccountsURL = '/fetch/accounts/';
        ajax.get(fetchAccountsURL)
        	.end((error, response) => {
          		if (!error && response) {
                    console.log(JSON.parse(response.text));
	              	this.setState({
	                	parentAccounts: JSON.parse(response.text),
                        searchParentAccounts: JSON.parse(response.text)
	            	});
          		} else {
              		console.log(`Error fetching data`, error);
          		}
        	});
  	}

    handleSearchChange(e) {
        this.setState({ searchString: e.target.value });
    }

    handleAccountClick(e) {
        console.log(e.target.dataset.accid);

        let fetchChildAccountsURL = '/fetch/account/' + e.target.dataset.accid + '/';
        ajax.get(fetchChildAccountsURL)
        	.end((error, response) => {
          		if (!error && response) {
                    console.log(JSON.parse(response.text));
	              	// this.setState({
	                // 	parentAccounts: JSON.parse(response.text),
                    //     searchParentAccounts: JSON.parse(response.text)
	            	// });
          		} else {
              		console.log(`Error fetching data`, error);
          		}
        	});
    }

    renderParentAccounts() {
        return this.state.searchParentAccounts.map((acc, index) => {
            return (
                <a key={index} href="#" data-accid={acc.sfid} class="list-group-item" onClick={this.handleAccountClick} >{acc.name}</a>
            );
        });
    }

	render() {


        let accListMarkup;

        let searchString = this.state.searchString.trim().toLowerCase();

        if(searchString.length > 0){
            this.state.searchParentAccounts = this.state.parentAccounts.filter(function(l){
                return String(l.name).toLowerCase().match(searchString);
            });
        } else {
            this.state.searchParentAccounts = this.state.parentAccounts;
        }

        accListMarkup = this.renderParentAccounts();

		return (
			<div>
				<div class="row">
	                <div class="text-center">
	                    <h1>Parent Accounts</h1>
	                </div>
		    	</div>
                <div class="row">
                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1">Search</span>
                        <input type="text" class="form-control" value={this.state.searchString} onChange={this.handleSearchChange} placeholder="Parent Accounts" aria-describedby="basic-addon1" />
                    </div>
                </div>
                <div class="row">
                    <div class="list-group parAccsListGroup">
                        { accListMarkup }
                    </div>
                </div>
                <div class="row">
                    <div style={wrapperStyles}>
                        <ComposableMap
                          projection="albersUsa"
                          projectionConfig={{
                            scale: 1000,
                          }}
                          width={980}
                          height={551}
                          style={{
                            width: "100%",
                            height: "auto",
                          }}
                          >
                          <ZoomableGroup disablePanning>
                            <Geographies geography="/static/states.json" disableOptimization>
                              {(geographies, projection) =>
                                geographies.map((geography, i) => {
                                  return (
                                    <Geography
                                      key={`state-${geography.properties.ID_1}`}
                                      cacheId={`state-${geography.properties.ID_1}`}
                                      round
                                      geography={geography}
                                      projection={projection}
                                      style={{
                                          default: {
                                            fill: "#ECEFF1",
                                            stroke: "#607D8B",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                          },
                                          hover: {
                                            fill: "#607D8B",
                                            stroke: "#607D8B",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                          },
                                          pressed: {
                                            fill: "#FF5722",
                                            stroke: "#607D8B",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                          },
                                      }}
                                    />
                                  )
                                }
                              )}
                            </Geographies>
                            <Markers>
    <Marker
       marker={{coordinates: [-122.658722, 45.512230]}}
       style={{
         default: { fill: "#FF5722" },
         hover: { fill: "#FFFFFF" },
         pressed: { fill: "#FF5722" },
       }}
    >
       <circle
          cx={0}
          cy={0}
          r={5}
          style={{
            stroke: "#FF5722",
            strokeWidth: 3,
            opacity: 0.9,
          }}
       />
    </Marker>
</Markers>
                          </ZoomableGroup>
                        </ComposableMap>
                      </div>
                </div>
            </div>
		);
	}
}

export default AccountMap;
