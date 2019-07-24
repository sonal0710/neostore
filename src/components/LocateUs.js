import React, { Component } from 'react';

class LocateUs extends Component {
    render() {
        return(
            <div className="container">
                <div className="panel panel-default">
                <div className="panel-heading">Locate Us</div>
                <div className="panel-body">
                    <img className="img-responsive" width="930" src="https://maps.googleapis.com/maps/api/staticmap?center=It+Sigma+park&zoom=17&scale=1&size=900x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7CIt+Sigma+park" alt="Google Map of It Sigma park" />
                </div>
                </div>
            </div>
        );
    }
}
export default LocateUs;

