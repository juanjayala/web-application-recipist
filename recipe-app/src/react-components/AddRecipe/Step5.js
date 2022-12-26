import React,{Component} from 'react';
import Button from "@material-ui/core/Button";

import { addImage } from '../../actions/images';

const printf = console.log
class Step5 extends Component {
  
    state = {
      image: null
    };

    onFileChange = event => {

      this.setState({ selectedFile: event.target.files[0] });
    
    };
    

    onFileUpload = () => {
    

      const formData = new FormData();
    
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      printf(this.state.selectedFile);
    };
    
    fileData = () => {
     
      if (this.state.selectedFile) {
         
        return (
          <div>
             <br></br>
            <h3>Upload successfully!</h3>
             
<p>File Name: {this.state.selectedFile.name}</p>
 
             
 
             
<p>
              Last Modified:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString()}
            </p>
 
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <h4>Upload Image!</h4>
          </div>
        );
      }
    };
    
    render() {
    
      return (
        <div>
            <h1>
              Step5
            </h1>

            
            <form className="image-form" onSubmit={(e) => {
                    e.preventDefault();
                    addImage(e.target, this.props.updateImageId);
                }}>
                    <div className="image-form__field">
                        <label>Image:</label>
                        <input name="image" type="file" />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Upload
                    </Button>
                </form>
          {this.fileData()}
        </div>
      );
    }
  }
 
  export default Step5;