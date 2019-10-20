import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Message } from "semantic-ui-react";
import "../../dist/css/postImage.css";

//this is an image validator. this component makes sure that an uploaded file is an actual image. It checks if the file matches image properties by accessing it and reading the HEX.
// It's using redux-form and sematinc-ui packages
// About HEX: https://kde.org/applications/utilities/org.kde.okteta
// Tutorial: https://blog.strands.com/how-to-validate-an-image-in-redux-form
// Tutorial 2: https://medium.com/strands-tech-corner/how-to-validate-an-image-in-redux-form-1cef01e4ff6c

class Validator extends Component {
  static propTypes = {
    mimeType: PropTypes.string, //checks the extension
    maxWeight: PropTypes.number, //checks the size
    handleSubmit: PropTypes.func.isRequired
  };

  static defaultProps = {
    mimeType: "image/jpeg, image/png",
    maxWeight: 200
  };

  validateImageWeight = imageFile => {
    if (imageFile && imageFile.size) {
      const imageFileMb = imageFile.size  / 1048576; //bytes to megabytes
      const { maxWeight } = this.props;
      console.log(imageFile.size);
      console.log(imageFileMb);
      if (imageFileMb > maxWeight) {
        return `Image size must be less or equal to ${maxWeight}MB`;
      }
    }
  };
  
  validateImageFormat = imageFile => {
    if (imageFile) {
      const { mimeType } = this.props;

      if (!mimeType.includes(imageFile.type)) {
        return `Image mime type must be ${mimeType}`;
      }
    }
  };
 
  handleChange = (event, input) => {
    event.preventDefault();
    let imageFile = event.target.files[0];
    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      const imageObject = new window.Image();

      imageObject.onload = () => {
        imageFile.width = imageObject.naturalWidth;
        imageFile.height = imageObject.naturalHeight;
        input.onChange(imageFile);
        URL.revokeObjectURL(imageFile);
      };
      imageObject.src = localImageUrl;
    }
  };

  renderFileInput = ({ input, type, meta }) => {
    const { mimeType } = this.props;
    return (
      <div>
        <input
          name={input.name}
          type={type}
          accept={mimeType}
          onChange={event => this.handleChange(event, input)}
        />
        {meta && meta.invalid && meta.error ? (
          <div className="validation-error"><Message negative header="Error:" content={meta.error} /></div>)
        : ( <input type="submit" value="Submit"/>)}
      </div>
    );
  };

  onSubmit = e => {
    e.preventDefault();
    console.log("Form Values: ", e);
    const file = this.state.file;
    this.props.postImage(file);
    this.setState({
      file: null,
      fileUrl: null
    });
  };
 

  render() {
    const {
      maxWeight
    } = this.props;
    return (
            <div className="validator">
             <div className="description">
                
                <ul>
                  <li>Image has to:</li>
                  <li>be JPEG or PNG</li>
                  <li>have Size ≤ {maxWeight}MB</li>
                </ul>
              </div>
              
                  <Field
                    name="image"
                    type="file"
                    validate={[
                      this.validateImageWeight,
                      this.validateImageFormat
                    ]}
                    component={this.renderFileInput}
                    
                  />
              </div>
         
    );
  }
}
  export default reduxForm({
    form: "imageValidation"
  })(Validator);