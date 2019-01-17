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
const colorScale = scaleLinear()
  .domain([500000,40000000])
  .range(["#FBE9E7","#FF5722"]);
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
            data: null,
            population: []
        };
	}

    componentWillMount() {
        let fetchAccountsURL = '/fetch/accounts/';
        ajax.get(fetchAccountsURL)
        	.end((error, response) => {
          		if (!error && response) {
                    console.log(JSON.parse(response.text));
	              	this.setState({
	                	data: response
	            	});
          		} else {
              		console.log(`Error fetching data`, error);
          		}
        	});
  	}
    componentDidMount() {
        csv("/static/population.csv")
          .then(population => {
            this.setState({ population })
        });
    }

	render() {

        const { population } = this.state

		return (
			<div>
				<div class="row">
	                <div class="text-center">
	                    <h1>All Accounts</h1>
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
                                  const statePopulation = population.find(s =>
                                    s.name === geography.properties.NAME_1
                                  ) || {}
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
                          </ZoomableGroup>
                        </ComposableMap>
                      </div>
                </div>
            </div>
		);
	}
}

export default AccountMap;
