import React, { Component } from "react";
import UploadFilesService from "../services/upload-files.service";

export default class UploadFiles extends Component {
    constructor(props) {
        super(props);

        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);
        
        this.state = {
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",

            fileInfos: [],
        };
    }

    selectFile(event) {
        this.setState({
            selectedFiles: event.target.files,
        });
    }

    delete(file) {
        UploadFilesService.delete(file).then((response) => {
            this.setState({
                message: response.data.message,
            })
            return UploadFilesService.getFiles();
        }).then((files) => {
            this.setState({
                fileInfos: files.data,
                progress: 0,
            });
        }).catch(() => {
            this.setState({
                progress: 0,
                message: "Could not delete file!",
            });
        });
    }

    upload() {
        let currentFile = this.state.selectedFiles[0];

        this.setState({
            progress: 0,
            currentFile: currentFile,
        });

        UploadFilesService.upload(currentFile, (event) => {
            this.setState({
                progress: Math.round((100 * event.loaded) / event.total),
            });
        }).then((response) => {
            this.setState({
                message: response.data.message,
            });
            return UploadFilesService.getFiles();
        }).then((files) => {
            this.setState({
                fileInfos: files.data,
                progress: 0,
            });
        }).catch(() => {
            this.setState({
                progress: 0,
                message: "Could not upload file!",
                currentFile: undefined,
            });
        });

        this.setState({
            selectedFiles: undefined,
        });
    }

    componentDidMount() {
        UploadFilesService.getFiles().then((response) => {
            this.setState({
                fileInfos: response.data,
            });
        });
    }

    render() {

        const {
            selectedFiles,
            currentFile,
            progress,
            message,
            fileInfos,
        } = this.state;

        return (
            <div>
                {currentFile && (
                    <div className="progress">
                        <div
                            className="progress-bar progress-bar-info progresss-bar-striped"
                            role="progressBar"
                            aria-valuenow={progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: progress + "%" }}
                        >
                            {progress}%
                        </div>
                    </div>
                )}
                <label className="btn btn-default">
                    <input type="file" onChange={this.selectFile} />
                </label>
                <button
                    className="btn btn-success"
                    disabled={!selectedFiles}
                    onClick={this.upload}
                >
                    Upload
                </button>
                <div className="alert alert-light" role="alert">
                    {message}
                </div>
                <div className="card">
                    <div className="card-header">Files</div>
                    <ul className="list-group list-group-flush">
                        {fileInfos && fileInfos.map((file, index) => (
                            <li className="d-flex justify-content-between list-group-item" key={index}>
                                <a href={file.url}>{file.name}</a>
                                <button className="btn btn-danger" onClick={() => this.delete(file)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}