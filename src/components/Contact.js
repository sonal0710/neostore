import React, { Component } from 'react';

class Contact extends Component {
    render() {
        return(
            <div className="container">
                <div className="jumbotron">
                <div className="container text-center">
                    <div className="col-md-6">
                    <form role="form">
                        <br/>
                        <h3 className="contact-heading">Contact Form</h3>
                        <div className="form-group">
                        <input type="text" className="form-control" id="name" name="name" placeholder="Name" required />
                        </div>
                        <div className="form-group">
                        <input type="text" className="form-control" id="email" name="email" placeholder="Email" required />
                        </div>
                        <div className="form-group">
                        <input type="text" className="form-control" id="mobile" name="mobile" placeholder="Mobile Number" required />
                        </div>
                        <div className="form-group">
                        <input type="text" className="form-control" id="subject" name="subject" placeholder="Subject" required />
                        </div>
                        <div className="form-group">
                        <textarea className="form-control" type="textarea" id="message" placeholder="Message" maxLength="140" rows="7"></textarea>
                        </div>

                        <button type="button" id="submit" name="submit" className="btn btn-primary pull-right">Submit Form</button>
                    </form>
                    </div>
                </div>
                </div>

            </div>
        );
    }
}
export default Contact;

