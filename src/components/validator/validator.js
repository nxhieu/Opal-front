import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Form, Message, Button, Card, Grid, Image, CardContent } from "semantic-ui-react";

//this is an image validator. this component makes sure that an uploaded file is an actual image. It checks if the file matches image properties by accessing it and reading the HEX.
// It's using redux-form and sematinc-ui packages
// About HEX: https://kde.org/applications/utilities/org.kde.okteta
// Tutorial: https://blog.strands.com/how-to-validate-an-image-in-redux-form
// Tutorial 2: https://medium.com/strands-tech-corner/how-to-validate-an-image-in-redux-form-1cef01e4ff6c

class Validator extends Component{
static propTypes = {
    mimeType: PropTypes.string, //checks type
    maxWeight: PropTypes.number, //checks size
    handleSubmit: PropTypes.func.isRequired //handles submission
};

static defaultProps = {
    mimeType: "image/jpeg, image/png",
    maxWeight: 2, //200 MB Max
};

validateImageFormat = imageFile => {
  if (imageFile) {
    const { mimeType } = this.props;
    if (!mimeType.includes(imageFile.type)) {
      return `Image mime type must be ${mimeType}`;
    }
  }
};

validateImageWeight = imageFile => {
  if (imageFile && imageFile.size) {
    // Get image size in kilobytes
    const imageFileKb = imageFile.size / 1024;
    const { maxWeight } = this.props;

    if (imageFileKb > maxWeight) {
      return `Image size must be less or equal to ${maxWeight}kb`;
    }
  }
};

validateImageWidth = imageFile => {
  if (imageFile) {
    const { maxWidth } = this.props;

    if (imageFile.width > maxWidth) {
      return `Image width must be less or equal to ${maxWidth}px`;
    }
  }
};

validateImageHeight = imageFile => {
  if (imageFile) {
    const { maxHeight } = this.props;

    if (imageFile.height > maxHeight) {
      return `Image height must be less or equal to ${maxHeight}px`;
    }
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
        <Message negative header="Error:" content={meta.error} />
      {meta && meta.invalid && meta.error && (
          <Message negative header="Error:" content={meta.error} />
      )}
      </div>
  );
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
  return (
         
                <div className="validator"> 
                <ul>
                  <li>Image has to:</li>
                  <li>Be JPEG or PNG</li>
                  <li>Have Size ≤ 200 MB</li>
                </ul>

                <Field
                  name="image"
                  type="file"
                  validate={[
                    this.validateImageWeight,
                    this.validateImageWidth,
                    this.validateImageHeight,
                    this.validateImageFormat
                  ]}
                  component={this.renderFileInput}
                />
              
              <input type="submit" value="Submit"/>
    
            </div>
       
  );
}
}

  export default reduxForm({
    form: "simple",
  })(Validator);