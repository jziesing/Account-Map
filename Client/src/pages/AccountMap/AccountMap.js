import React from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps";


let ajax = require('superagent');

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
};


class AccountMap extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            parentAccounts: [],
            searchParentAccounts: [],
            searchString: '',
            selectedParentAccount: '',
            selectedChildAccounts: [],
            currentMarkers: []
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
                    let childAccResp = JSON.parse(response.text);
                    let markersToAdd = [];
                    childAccResp.map((dat, index) => {
                        console.log(dat.shippinglongitude);
                        markersToAdd.push({
                            name: dat.name,
                            coordinates: [dat.shippinglongitude, dat.shippinglatitude],
                            markerOffset: -10
                        });
                        return dat;
                    });
                    console.log(markersToAdd);
	              	this.setState({
	                	selectedChildAccounts: childAccResp,
                        currentMarkers: markersToAdd
	            	});
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
	                    <h1>Tap Room Finder</h1>
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
                                            fill: "#79589f",
                                            stroke: "#79589f",
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
                                {this.state.currentMarkers.map((marker, i) => (
                                    <Marker
                                      key={i}
                                      marker={marker}
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
                                      <text
                                        textAnchor="middle"
                                        y={marker.markerOffset}
                                        style={{
                                          fontFamily: "Roboto, sans-serif",
                                          fill: "#607D8B",
                                        }}
                                        >
                                        {marker.name}
                                      </text>
                                    </Marker>
                                  ))}
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
